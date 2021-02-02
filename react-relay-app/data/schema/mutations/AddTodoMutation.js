import {
  cursorForObjectInConnection,
  mutationWithClientMutationId,
} from 'graphql-relay';

import {
  GraphQLID, 
  GraphQLNonNull, 
  GraphQLString
} from 'graphql';

import {
  commitMutation,
  graphql,
} from 'react-relay';

import {ConnectionHandler} from 'relay-runtime';

import {
  GraphQLTodoEdge, 
  GraphQLUser
} from '../nodes';

import {
  addTodo,
  getTodoById,
  getTodos,
  getUser,
} from '../../database';

const AddTodoMutation = mutationWithClientMutationId({
  name: 'AddTodo',
  inputFields: {
    text: {type: new GraphQLNonNull(GraphQLString)},
    userId: {type: new GraphQLNonNull(GraphQLID)},
    // GraphQLNonNull is an object type that works as a wrapper around another (object or scalar) type. It enforces a non-null constraint on that field.
  },
  outputFields: {
    todoEdge: {
      type: new GraphQLNonNull(GraphQLTodoEdge),
      resolve: (todoId) => {
        const todo = getTodoById(todoId);

        return {
          cursor: cursorForObjectInConnection([...getTodos()], todo),
          node: todo,
        };
      },
    },
    user: {
      type: new GraphQLNonNull(GraphQLUser),
      resolve: (userId) => getUser(userId),
    },
  },
  mutateAndGetPayload: ({text, userId}) => {
    const todoId = addTodo(text, false);

    return {todoId, userId};
  },
});

export {AddTodoMutation};


const mutation = graphql`
  mutation AddTodoMutation($input: AddTodoInput!) {
    addTodo(input: $input) {
      todoEdge {
        __typename
        cursor
        node {
          complete
          id
          text
        }
      }
      user {
        id
        totalCount
      }
    }
  }
`;

function sharedUpdater(store, user, newEdge) {
  const userProxy = store.get(user.id);
  const conn = ConnectionHandler.getConnection(userProxy, 'TodoList_todos');
  ConnectionHandler.insertEdgeAfter(conn, newEdge);
}

let tempID = 0;

function commit(environment, text, user) {
  const input = {
    text,
    userId: user.userId,
    clientMutationId: `${tempID++}`,
  };

  return commitMutation(environment, {
    mutation,
    variables: {
      input,
    },
    updater: (store) => {
      const payload = store.getRootField('addTodo');
      const newEdge = payload.getLinkedRecord('todoEdge');
      sharedUpdater(store, user, newEdge);
    },
    optimisticUpdater: (store) => {
      const id = 'client:newTodo:' + tempID++;
      const node = store.create(id, 'Todo');
      node.setValue(text, 'text');
      node.setValue(id, 'id');

      const newEdge = store.create('client:newEdge:' + tempID++, 'TodoEdge');
      newEdge.setLinkedRecord(node, 'node');
      sharedUpdater(store, user, newEdge);

      // Get the UserProxy, and update the totalCount
      const userProxy = store.get(user.id);

      if (!userProxy) {
        throw new Error('Failed to retrieve userProxy from store');
      }

      const totalCount = userProxy.getValue('totalCount');

      if (typeof totalCount !== 'number') {
        throw new Error(
          `Expected userProxy.totalCount to be number, but got: ${typeof totalCount}`,
        );
      }

      userProxy.setValue(totalCount + 1, 'totalCount');
    },
  });
}

export {commit};