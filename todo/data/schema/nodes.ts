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

import {DemoUser, getDemoUserOrThrow} from '../database';

// $FlowFixMe graphql-relay types not available in flow-typed, strengthen this typing
const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId: string): {} => {
    const {type, id}: {id: string; type: string} = fromGlobalId(globalId);
    if (type === 'DemoUser') {
      return getDemoUserOrThrow(id);
    }
    return null;
  },
  (obj: {}): GraphQLObjectType => {
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
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (demoUser): number => demoUser.age, // where does this value come from? mutation? methods come from database so maybe adding Demo methods there,
    },
  },
  interfaces: [nodeInterface],
});

export {nodeField, demoGraphQLUser, GenderEnum, PizzaToppingEnum};
