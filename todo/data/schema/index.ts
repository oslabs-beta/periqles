import {GraphQLObjectType, GraphQLSchema} from 'graphql';
import {nodeField} from './nodes.js';
import {demoUserQuery} from './queries/demoUserQuery';
import {AddUserMutation} from './mutations/AddUserMutation';

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

export const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
