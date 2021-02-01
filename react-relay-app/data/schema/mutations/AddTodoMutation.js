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