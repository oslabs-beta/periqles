import {
    mutationWithClientMutationId,
    fromGlobalId
} from 'graphql-relay';

import {
    GraphQLID,
    GraphQLNonNull,
    GraphQLString
} from 'graphql';

import {
    GraphQLTodo
} from '../nodes';

import {
    getTodoById,
    renameTodo,
    Todo
} from '../../database';

const RenameTodoMutation = mutationWithClientMutationId({
    name: 'RenameTodo',
    inputFields: {
        id: {type: new GraphQLNonNull(GraphQLID)},
        text: {type: new GraphQLNonNull(GraphQLString)}
    },
    outputFields: {
        todo: {
            type:{type: new GraphQLNonNull(GraphQLTodo)},
            resolve: (localTodoId) => getTodoById(localTodoId)
        }
    },
    mutateAndGetPayload: (id, text) => {
        const localTodoId = fromGlobalId(id).id;
        renameTodo(localTodoId, text);

        return {localTodoId}
    }
});

export {RenameTodoMutation};