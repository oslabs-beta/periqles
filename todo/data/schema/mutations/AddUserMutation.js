import {mutationWithClientMutationId} from 'graphql-relay';
import {GraphQLNonNull, GraphQLString, GraphQLInt} from 'graphql';
import {GenderEnum, PizzaToppingEnum} from '../nodes.js';
import {addUser, getDemoUserOrThrow} from '../../database.js';

const AddUserMutation = mutationWithClientMutationId({
  name: 'AddUser',
  inputFields: {
    username: {type: new GraphQLNonNull(GraphQLString)},
    password: {type: new GraphQLNonNull(GraphQLString)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    gender: {type: new GraphQLNonNull(GenderEnum)},
    pizzaTopping: {type: new GraphQLNonNull(PizzaToppingEnum)},
    age: {type: new GraphQLNonNull(GraphQLInt)},
  },
  outputFields: {
    userId: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({userId}) => userId,
    },
    username: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({username}) => username,
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({password}) => password,
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({email}) => email,
    },
    gender: {
      type: new GraphQLNonNull(GenderEnum),
      resolve: ({gender}) => gender,
    },
    pizzaTopping: {
      type: new GraphQLNonNull(PizzaToppingEnum),
      resolve: ({pizzaTopping}) => pizzaTopping,
    },
    age: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: ({age}) => age,
    },
  },
  mutateAndGetPayload: (input) => {
    const userId = addUser(input);
    return getDemoUserOrThrow(userId);
  },
});

export {AddUserMutation};
