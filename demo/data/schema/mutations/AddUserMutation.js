const graphqlRelay = require('graphql-relay');
const graphql = require('graphql');
const {GenderEnum, PizzaToppingEnum} = require('../nodes.js');
const {addUser, getDemoUserOrThrow} = require('../../database.js');

const {mutationWithClientMutationId} = graphqlRelay;
const {GraphQLNonNull, GraphQLString, GraphQLInt} = graphql;

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
    const newUser = addUser(input);
    return newUser;
  },
});

module.exports = {AddUserMutation};
