// note: import statements must be single-line. Multiline import statements not yet supported by experimental ES6 module loader.
import graphql from 'graphql';
import graphqlRelay from 'graphql-relay';
import {DemoUser, getDemoUserOrThrow} from '../database.js';

const {GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLEnumType, GraphQLInt} = graphql;
const {fromGlobalId, globalIdField, nodeDefinitions} = graphqlRelay;

const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    const {type, id} = fromGlobalId(globalId);
    if (type === 'DemoUser') {
      return getDemoUserOrThrow(id);
    }
    return null;
  },
  (obj) => {
    if (obj instanceof DemoUser) {
      return demoGraphQLUser;
    }

    return null;
  },
);

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
      resolve: (demoUser) => demoUser.userId,
    },
    username: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (demoUser) => demoUser.username,
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (demoUser) => demoUser.password,
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (demoUser) => demoUser.email,
    },
    gender: {
      type: new GraphQLNonNull(GenderEnum),
      resolve: (demoUser) => demoUser.gender,
    },
    pizzaTopping: {
      type: new GraphQLNonNull(PizzaToppingEnum),
      resolve: (demoUser) => demoUser.pizzaTopping,
    },
    age: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (demoUser) => demoUser.age,
    },
  },
  interfaces: [nodeInterface],
});

export {nodeField, demoGraphQLUser, GenderEnum, PizzaToppingEnum};
