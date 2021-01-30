// import dependencies
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  nodeDefinitions,
  fromGlobalId,
  connectionFromArray,
} from 'graphql-relay';

// import mock data and CRUD functions here (correct?)
import { 
  Todo,
  User,
  USER_ID
} from '../database.js';

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalID(globalId);

    if (type === 'Todo') {
      return getTodo(id);
    }
    else if (type === 'User') {
      return getUser(id);
    }

    return null;
  },
  (obj) => {
    if (obj instanceOf Todo) {
      return GraphQLTodo;
    }
    else if (obj instanceOf User) {
      return GraphQLUser;
    }

    return null;
  }
);

const getTodo = (id) => {
  // TODO
};

const getUser = (id) => {
  // TODO
};

// define object types, their fields, and their resolvers
const GraphQLTodo = new GraphQLObjectType({
  name: 'Todo',
  fields: {
    id: globalField('Todo'),
    text:{
      type: new GraphQLNonNull(GraphQLString),
      resolve: (todo) => todo.complete
    },
  },
  interfaces: [nodeInterface],
});

const {
  connectionType: TodosConnection,
  edgeType: GraphQLTodoEdge,
} = connectionDefinitions({ 
  name: 'Todo',
  nodeType: GraphQLTodo,
});

const GraphQLUser = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: globalIDField('User'),
    userID: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: () => USER_ID,
    },
    todos: {
      type: TodosConnection, 
      args: {
        status: {
          type: GraphQLString, 
          defaultValue: 'any',
        },
        ...connectionArgs,
      },
      resolve: (root, {status, after, before, first, last}) => 
        connectionFromArray([...getTodos(status)], {
          after,
          before, 
          first, 
          last,
        }),
    },
    totalCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: () => getTodos.length,
    },
  },
  interfaces: [nodeInterface],
});