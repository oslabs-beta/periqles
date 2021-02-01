import {mutationWithClientMutationId} from 'graphql-relay';
import {GraphQLBoolean, GraphQLID, GraphQLList, GraphQLNonNull} from 'graphql';
import {GraphQLTodo, GraphQLUser} from '../nodes';

import {
  getTodoById,
  getUser,
  markAllTodos,
} from '../../database';

// type Input = {|
//   +complete: boolean,
//   +userId: string,
// |};

// type Payload = {|
//   +changedTodoIds: $ReadOnlyArray<string>,
//   +userId: string,
// |};

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

export {MarkAllTodosMutation};