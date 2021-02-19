import graphql from 'graphql';
import {nodeField} from './nodes.js';
import {demoUserQuery} from './queries/demoUserQuery.js';
import {AddUserMutation} from './mutations/AddUserMutation.js';

const {GraphQLObjectType, GraphQLSchema} = graphql;

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
