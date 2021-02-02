import {mutationWithClientMutationId} from 'graphql-relay';
import {GraphQLBoolean, GraphQLID, GraphQLList, GraphQLNonNull} from 'graphql';
import {GraphQLTodo, GraphQLUser} from '../nodes';

import {
  getTodoById,
  getUser,
  markAllTodos,
} from '../../database';

import {
  commitMutation,
  graphql,
} from 'react-relay';


const MarkAllTodosMutation = mutationWithClientMutationId({
  name: 'MarkAllTodos',
  inputFields: {
    complete: {type: new GraphQLNonNull(GraphQLBoolean)},
    userId: {type: new GraphQLNonNull(GraphQLID)},
  },
  outputFields: {
    changedTodos: {
      type: new GraphQLList(new GraphQLNonNull(GraphQLTodo)),
      resolve: ({changedTodoIds}) =>
        changedTodoIds.map((todoId) => getTodoById(todoId)),
    },
    user: {
      type: new GraphQLNonNull(GraphQLUser),
      resolve: ({userId}) => getUser(userId),
    },
  },
  mutateAndGetPayload: ({complete, userId}) => {
    const changedTodoIds = markAllTodos(complete);

    return {changedTodoIds, userId};
  },
});

const mutation = graphql`
  mutation MarkAllTodosMutation($input: MarkAllTodosInput!) {
    markAllTodos(input: $input) {
      changedTodos {
        id
        complete
      }
      user {
        id
        completedCount
      }
    }
  }
`;

function getOptimisticResponse(
  complete,
  todos,
  user,
) {
  // Relay returns Maybe types a lot of times in a connection that we need to cater for
  const validNodes = todos.edges
    ? todos.edges
        .map((edge) => edge.node)
    : [];

  const changedTodos = validNodes
    .filter((node) => node.complete !== complete)
    .map((node) => { return { complete: complete, id: node.id } });

  return {
    markAllTodos: {
      changedTodos,
      user: {
        id: user.id,
        completedCount: complete ? user.totalCount : 0,
      },
    }
  }  
}

function commit(
  environment,
  complete,
  todos,
  user,
) {
  const input = {
    complete,
    userId: user.userId,
  };

  return commitMutation(environment, {
    mutation,
    variables: {
      input,
    },
    optimisticResponse: getOptimisticResponse(complete, todos, user),
  });
}

export {commit};
export {MarkAllTodosMutation};