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
   // Todo
} from '../../database';

import {
    commitMutation,
    graphql
} from 'react-relay';

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

// export {RenameTodoMutation};

const mutation = graphql`
    mutation RenameTodoMutation($input: RenameTodoInput!){
        renameTodo(input: $input){
            todo{
                id
                text
            }
        }
    }`;

function getOptimisticResponse(text,todo){
    return {
        renameTodo: {
            todo: {
                id: todo.id,
                text: text
            }
        }
    }
};

function commit(environment, text, todo){
    const input = {
        text,
        id: todo.id
    }
    return commitMutation(environment, {
        mutation,
        variables: {
            input
        },
        optimisticResponse: getOptimisticResponse(text, todo)
    });
}

export {commit, RenameTodoMutation};


