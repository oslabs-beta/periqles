import {mutationWithClientMutationId, toGlobalId} from 'graphql-relay';
import {GraphQLID, GraphQLList, GraphQLNonNull, GraphQLString} from 'graphql';
import {
  commitMutation,
  graphql,
} from 'react-relay';
import {ConnectionHandler} from 'relay-runtime';
import {GraphQLUser} from '../nodes';
import {getUser, removeCompletedTodos} from '../../database';

const RemoveCompletedTodosMutation = mutationWithClientMutationId({
  name: 'RemoveCompletedTodos',
  inputFields: {
    userId: {type: new GraphQLNonNull(GraphQLID)},
  },
  outputFields: {
    deletedTodoIds: {
      type: new GraphQLList(new GraphQLNonNull(GraphQLString)),
      resolve: ({deletedTodoIds}) =>
        deletedTodoIds,
    },
    user: {
      type: new GraphQLNonNull(GraphQLUser),
      resolve: ({userId}) => getUser(userId),
    },
  },
  mutateAndGetPayload: ({userId}) => {
    const deletedTodoLocalIds = removeCompletedTodos();

    const deletedTodoIds = deletedTodoLocalIds.map(
      toGlobalId.bind(null, 'Todo'),
    );

    return {deletedTodoIds, userId};
  },
});

// export {RemoveCompletedTodosMutation};


const mutation = graphql`
  mutation RemoveCompletedTodosMutation($input: RemoveCompletedTodosInput!) {
    removeCompletedTodos(input: $input) {
      deletedTodoIds
      user {
        completedCount
        totalCount
      }
    }
  }
`;

function sharedUpdater(store, user, deletedIDs) {
  const userProxy = store.get(user.id);
  const conn = ConnectionHandler.getConnection(userProxy, 'TodoList_todos');

  deletedIDs.forEach((deletedID)=>
    ConnectionHandler.deleteNode(conn, deletedID),
  );
}

function commit(environment, todos, user) {
  const input = { userId: user.userId };

  return commitMutation(environment, {
    mutation,
    variables: {
      input,
    },
    updater: (store) => {
      const payload = store.getRootField('removeCompletedTodos');
      const deletedIds = payload.getValue('deletedTodoIds');

      sharedUpdater(store, user, deletedIds);
    },
    optimisticUpdater: (store) => {
      const completedNodeIds = todos.edges
        ? todos.edges
            .map((edge) => edge.node)
            .filter(Boolean)
            .filter((node) => node.complete)
            .map((node) => node.id)
        : [];

      sharedUpdater(store, user, completedNodeIds);
    },
  });
}

export default {commit, RemoveCompletedTodosMutation};