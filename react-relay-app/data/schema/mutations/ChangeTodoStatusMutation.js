import {fromGlobalId, mutationWithClientMutationId} from 'graphql-relay';
import {GraphQLBoolean, GraphQLID, GraphQLNonNull} from 'graphql';
import {GraphQLTodo, GraphQLUser} from '../nodes';
import {
  changeTodoStatus, 
  getUser, 
  getTodoById,
  Todo, 
  User,
} from '../../database';

// type Input = {|
//   +complete: boolean,
//   +id: string,
//   +userId: string,
// |};

// type Payload = {|
//   +todoId: string,
//   +userId: string,
// |};


const changeTodoStatusMutation = mutationWithClientMutationId({
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

export {changeTodoStatusMutation};