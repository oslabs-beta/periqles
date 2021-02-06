import {
  cursorForObjectInConnection,
  mutationWithClientMutationId,
} from 'graphql-relay';

import {GraphQLID, GraphQLNonNull, GraphQLString, GraphQLInt} from 'graphql';
import {GraphQLUser} from '../nodes';   // TODO: should I be using this some way?

import {
  addUser
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
    name: {type: new GraphQLNonNull(GraphQLString)},
    age: {type: new GraphQLNonNull(GraphQLInt)},
  },
  outputFields: {
   // TODO
  },
  mutateAndGetPayload: (input) => {
    const userId = addUser(input);
    return userId;
  },
});

export {AddUserMutation};
