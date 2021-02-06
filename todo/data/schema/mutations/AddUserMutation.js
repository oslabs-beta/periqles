import {
  cursorForObjectInConnection,
  mutationWithClientMutationId,
} from 'graphql-relay';

import {GraphQLID, GraphQLNonNull, GraphQLString, GraphQLInt} from 'graphql';
import {GraphQLUser} from '../nodes';   // TODO: should I be using this some way?

import {
  addUser,
  getDemoUserOrThrow
} from '../../database';

// TODO: replace with Typescript
/*
type Input = {|
  +text: string,
  +userId: string,
|};

type Payload = {|
  +todoId: string,
  +userId: string,
|};
*/

const AddUserMutation = mutationWithClientMutationId({
  name: 'AddUser',
  inputFields: {   // TODO
    username: {type: new GraphQLNonNull(GraphQLString)},
    password: {type: new GraphQLNonNull(GraphQLString)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    gender: {type: new GraphQLNonNull(GraphQLString)},    // TODO: enum
    pizzaTopping: {type: new GraphQLNonNull(GraphQLString)},    // TODO: enum
    age: {type: new GraphQLNonNull(GraphQLInt)},
  },
  outputFields: {
    userId: {type: new GraphQLNonNull(GraphQLString)},
    username: {type: new GraphQLNonNull(GraphQLString)},
    password: {type: new GraphQLNonNull(GraphQLString)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    gender: {type: new GraphQLNonNull(GraphQLString)},    // TODO: enum
    pizzaTopping: {type: new GraphQLNonNull(GraphQLString)},    // TODO: enum
    age: {type: new GraphQLNonNull(GraphQLInt)},
  },
  mutateAndGetPayload: (input) => {
    const userId = addUser(input);
    return getDemoUserOrThrow(userId);
  },
});

export {AddUserMutation};
