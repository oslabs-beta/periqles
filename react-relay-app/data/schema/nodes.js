// import dependencies
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  nodeDefinitions,
  fromGlobalId,
  globalIdField,
  connectionFromArray,
} from 'graphql-relay';

// import mock data and CRUD functions here (correct?)
import { 
  Todo,
  User,
  USER_ID,
  getTodos,
  getUser
} from '../database.js';

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);

    if (type === 'Todo') {
      return getTodo(id);
    }
    else if (type === 'User') {
      return getUser(id);
    }

    return null;
  },
  (obj) => {
    if (obj instanceof Todo) {
      return GraphQLTodo;
    }
    else if (obj instanceof User) {
      return GraphQLUser;
    }

    return null;
  }
);


// define object types, their fields, and their resolvers
const GraphQLTodo = new GraphQLObjectType({
  name: 'Todo',
  fields: {
    id: globalIdField('Todo'),
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
    id: globalIdField('User'),
    userID: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: () => USER_ID,
    },
    // GraphQL represents the list of todo objects as a "connection" object that can be queried and rendered in slices (pagination) instead of all at once
    todos: {
      type: TodosConnection, 
      args: {
        // including status as an arg of the connection object allows the frontend to filter for and view a list of only " completed" todos, or only "not completed" todos
        status: {
          type: GraphQLString, 
          defaultValue: 'any',
        },
        ...connectionArgs,
      },
      // pass in root (?) and the args defined above for the todos connection object
      resolve: (root, args) => 
        connectionFromArray([...getTodos(args.status)], {     
          after: args.after,
          before: args.before, 
          first: args.first, 
          last: args.last,
        }),
        // connectionFromArray(array: [Objects], connectionArguments: {after, before, first, last})
        // best guess: connectionArguments is an object of variables to use for pagination. "First" is the # of nodes to include in the first slice. "After" takes a cursor type arg (a serialized string) to give you a position to start paginating at (by finding the node in the list with a matching cursor string?). "Before" and "last" let you scroll backwards in the list.
    },
    totalCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: () => getTodos.length,
    },
    completedCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: number => getTodos('completed').length
    }
  },
  interfaces: [nodeInterface],
});