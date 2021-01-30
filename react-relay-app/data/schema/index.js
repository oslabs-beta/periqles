/*
Import all defined queries and mutations here. Combine them into one GraphQLSchema with:
1. a query property that is an object holding all the possible queries for this API
2. a mutation property that is an object holding all the possible mutations for this API
*/

import {GraphQLObjectType, GraphQLSchema} from 'graphql';
import UserQuery from './queries/UserQuery';
import {nodeField} from './nodes.js';

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: UserQuery,
    node: nodeField, // from nodes.js
  },
});