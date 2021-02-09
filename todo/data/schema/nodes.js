// @flow
/* eslint flowtype/require-return-type: 'off' */
/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only.  Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLEnumType,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
} from 'graphql-relay';

import {
  Todo,
  User,
  DemoUser,
  USER_ID,
  getTodoOrThrow,
  getTodos,
  getUserOrThrow,
  getDemoUserOrThrow,
} from '../database';

// $FlowFixMe graphql-relay types not available in flow-typed, strengthen this typing
const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId: string): ?{} => {
    const {type, id}: {id: string, type: string} = fromGlobalId(globalId);
    if (type === 'Todo') {
      return getTodoOrThrow(id);
    } else if (type === 'User') {
      return getUserOrThrow(id);
    } else if (type === 'DemoUser') {
      return getDemoUserOrThrow(id);
    }
    return null;
  },
  (obj: {}): ?GraphQLObjectType => {
    if (obj instanceof Todo) {
      return GraphQLTodo;
    } else if (obj instanceof User) {
      return GraphQLUser;
    }
    return null;
  },
);

const GraphQLTodo = new GraphQLObjectType({
  name: 'Todo',
  fields: {
    id: globalIdField('Todo'),
    text: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (todo: Todo): string => todo.text,
    },
    complete: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: (todo: Todo): boolean => todo.complete,
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
    userId: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (): string => USER_ID,
    },
    todos: {
      type: TodosConnection,
      args: {
        status: {
          type: GraphQLString,
          defaultValue: 'any',
        },
        // $FlowFixMe
        ...connectionArgs,
      },
      // eslint-disable-next-line flowtype/require-parameter-type
      resolve: (root: {}, {status, after, before, first, last}) =>
        connectionFromArray([...getTodos(status)], {
          after,
          before,
          first,
          last,
        }),
    },
    totalCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (): number => getTodos().length,
    },
    completedCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (): number => getTodos('completed').length,
    },
  },
  interfaces: [nodeInterface],
});

const GenderEnum = new GraphQLEnumType({
  name: 'GenderEnum',
  values: {
    NON_BINARY: {
      value: 'NON_BINARY',
    },
    FEMALE: {
      value: 'FEMALE',
    },
    MALE: {
      value: 'MALE',
    },
  },
});

const PizzaToppingEnum = new GraphQLEnumType({
  name: 'PizzaToppingEnum',
  values: {
    BUFFALO_CHICKEN: {
      value: 'BUFFALO_CHICKEN',
    },
    PEPPERONI: {
      value: 'PEPPERONI',
    },
    MEATLOVERS: {
      value: 'MEATLOVERS',
    },
    EGGPLANT_PARM: {
      value: 'EGGPLANT_PARM',
    },
    OLIVES: {
      value: 'OLIVES',
    },
    HAWAIIAN: {
      value: 'HAWAIIAN',
    },
  },
});

const demoGraphQLUser = new GraphQLObjectType({
  name: 'DemoUser',
  fields: {
    id: globalIdField('DemoUser'),
    userId: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (demoUser): string => demoUser.userId, // where does this value come from? mutation? methods come from database so maybe adding Demo methods there,
    },
    username: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (demoUser): string => demoUser.username, // where does this value come from? mutation? methods come from database so maybe adding Demo methods there,
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (demoUser): string => demoUser.password, // where does this value come from? mutation? methods come from database so maybe adding Demo methods there,
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (demoUser): string => demoUser.email, // where does this value come from? mutation? methods come from database so maybe adding Demo methods there,
    },
    gender: {
      type: new GraphQLNonNull(GenderEnum),
      resolve: (demoUser): string => demoUser.gender, // where does this value come from? mutation? methods come from database so maybe adding Demo methods there,
    },
    pizzaTopping: {
      type: new GraphQLNonNull(PizzaToppingEnum),
      resolve: (demoUser): string => demoUser.pizzaTopping, // where does this value come from? mutation? methods come from database so maybe adding Demo methods there,
    },
    age: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (demoUser): number => demoUser.age, // where does this value come from? mutation? methods come from database so maybe adding Demo methods there,
    },
  },
  interfaces: [nodeInterface],
});

export {nodeField, GraphQLTodo, GraphQLTodoEdge, GraphQLUser, demoGraphQLUser};
