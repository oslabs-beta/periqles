import {
  mutationWithClientMutationId,
  fromGlobalId,
} from 'graphql-relay';

import {
  GraphQLID, 
  GraphQLNonNull,
} from 'graphql';

import {
  commitMutation,
  graphql,
} from 'react-relay';

import {ConnectionHandler} from 'relay-runtime';
import {GraphQLUser} from '../nodes.js';
import {
  getUser,
  removeTodo,
} from '../../database.js';

const RemoveTodoMutation = mutationWithClientMutationId({
  name: 'RemoveTodo',
  inputFields: {
    id: {type: new GraphQLNonNull(GraphQLID)},
    userId: {type: new GraphQLNonNull(GraphQLID)}
  },
  outputFields: {
    deletedTodoId: {
      type: {type: new GraphQLNonNull(GraphQLID)},
      resolve: (id) => id,
    },
    user: {
      type: new GraphQLNonNull(GraphQLUser),
      resolve: ({userId}) => getUser(userId),
    }
  },
  mutateAndGetPayload: ({id, userId}) => {
    const localTodoId = fromGlobalId(id).id;
    removeTodo(localTodoId);

    return {id, userId};
  },
});

// export {RemoveTodoMutation};

const mutation = graphql`
  mutation RemoveTodoMutation($input: RemoveTodoInput!) {
    removeTodo(input: $input) {
      deletedTodoId
      user {
        completedCount
        totalCount
      }
    }
  }
`;

function sharedUpdater(store, user, deletedID) {
  const userProxy = store.get(user.id);
  const conn = ConnectionHandler.getConnection(userProxy, 'TodoList_todos');
  ConnectionHandler.deleteNode(conn, deletedID);
}

function commit(environment, todo, user) {
  const input = {
    id: todo.id,
    userId: user.userId,
  };

  return commitMutation(environment, {
    mutation,
    variables: {
      input,
    },
    updater: (store) => {
      const payload = store.getRootField('removeTodo');
      const deletedTodoId = payload.getValue('deletedTodoId');

      if (typeof deletedTodoId !== 'string') {
        throw new Error(
          `Expected removeTodo.deletedTodoId to be string, but got: ${typeof deletedTodoId}`,
        );
      }

      sharedUpdater(store, user, deletedTodoId);
    },
    optimisticUpdater: (store) => {
      sharedUpdater(store, user, todo.id);
    },
  });
}

export {commit, RemoveTodoMutation};