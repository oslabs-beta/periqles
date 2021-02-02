/*
Import all defined queries and mutations here. Combine them into one GraphQLSchema with:

1. a query property that is an object holding all the possible queries for this API
2. a mutation property that is an object holding all the possible mutations for this API
3. a subscription property, if applicable

This will be the schema imported and used by your GraphQL server file.
*/

// from FB's example repo on Github https://github.com/relayjs/relay-examples/blob/master/todo/data/schema/index.js

import {GraphQLObjectType, GraphQLSchema} from 'graphql';
import { UserQuery } from './queries/UserQuery';
import { nodeField } from './nodes.js';
import { AddTodoMutation } from './mutations/AddTodoMutation';
import { ChangeTodoStatusMutation } from './mutations/ChangeTodoStatusMutation';
import { MarkAllTodosMutation } from './mutations/MarkAllTodosMutation';
import { RemoveCompletedTodosMutation } from './mutations/RemoveCompletedTodosMutation';
import { RemoveTodoMutation } from './mutations/RemoveTodoMutation';
import { RenameTodoMutation } from './mutations/RenameTodoMutation';

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: UserQuery,
    node: nodeField, // from nodes.js
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTodo: AddTodoMutation,
    changeTodoStatus: ChangeTodoStatusMutation,
    markAllTodos: MarkAllTodosMutation,
    removeCompletedTodos: RemoveCompletedTodosMutation,
    removeTodo: RemoveTodoMutation,
    renameTodo: RenameTodoMutation,
  },
});

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

module.exports = schema;