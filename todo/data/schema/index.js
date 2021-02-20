const {GraphQLObjectType, GraphQLSchema} = require('graphql');
const {nodeField} = require('./nodes.js');
const {demoUserQuery} = require('./queries/demoUserQuery.js');
const {AddUserMutation} = require('./mutations/AddUserMutation.js');

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    demoUser: demoUserQuery,
    node: nodeField,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: AddUserMutation,
  },
});

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

module.exports = {schema};
