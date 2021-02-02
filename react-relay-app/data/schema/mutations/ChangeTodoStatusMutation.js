import {fromGlobalId, mutationWithClientMutationId} from 'graphql-relay';
import {GraphQLBoolean, GraphQLID, GraphQLNonNull} from 'graphql';
import {GraphQLTodo, GraphQLUser} from '../nodes';
import {
  changeTodoStatus, 
  getUser, 
  getTodoById,
} from '../../database';
import { commitMutation, graphql} from 'react-relay';


//Mutation Info for Client Side 
const mutation = graphql`
  mutation ChangeTodoStatusMutation($input: ChangeTodoStatusInput!) {
    changeTodoStatus(input: $input) {
      todo {
        id
        complete
      }
      user {
        id
        completedCount
      }
    }
  }`;

  const getOptimisticResponse = (complete, todo, user) => {
    return {
      changeTodoStatus: {
        todo: {
          complete: complete, 
          id: todo.id,
        },
        user: {
          id: user.id, 
          completedCount: complete
          ? user.completedCount + 1
          : user.completedCount - 1,
        },
      },
    };
  }

  const commit = (environment,complete, todo, user) => {
    const input = {
      complete, userId: user.userId, id: todo.id,
    };

    return commitMutation(environment, {
      mutation, variables: {
        input,
      },
      optimisticResponse: getOptimisticResponse(complete, todo, user),
    });
  }


export {commit};





//Mutation Info for Schema 


const ChangeTodoStatusMutation = mutationWithClientMutationId({
  name: 'ChangeTodoStatus',
  inputFields: {
    complete: {type: new GraphQLNonNull(GraphQLBoolean)},
    id: {type: new GraphQLNonNull(GraphQLID)},
    userId: {type: new GraphQLNonNull(GraphQLID)},
  },
  outputFields: {
    todo: {
      type: new GraphQLNonNull(GraphQLTodo),
      resolve: ({todoId}) => getTodoById(todoId),
    },
    user: {
      type: new GraphQLNonNull(GraphQLUser),
      resolve: ({userId}) => getUser(userId),
    },
  },
  mutateAndGetPayload: ({id, complete, userId}) => {
    const todoId = fromGlobalId(id).id;
    changeTodoStatus(todoId, complete);
    
    return {todoId, userId};
  },
});

export { ChangeTodoStatusMutation };