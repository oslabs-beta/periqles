import {
  cursorForObjectInConnection,
  mutationWithClientMutationId,
} from 'graphql-relay';

import {GraphQLID, GraphQLNonNull, GraphQLString, GraphQLInt} from 'graphql';
import {GenderEnum, PizzaToppingEnum} from '../nodes'; // TODO: should I be using this some way?

import {addUser, getDemoUserOrThrow} from '../../database';

// // TODO: replace with Typescript
// /*
// type Input = {|
//   +text: string,
//   +userId: string,
// |};

// type Payload = {|
//   +todoId: string,
//   +userId: string,
// |};
// */

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
