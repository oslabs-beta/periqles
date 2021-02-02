// import { graphql } from 'react-relay';
const {GraphQLString} = require ('graphql');
const {GraphQLUser} = require('../nodes');
const {getUser} = require('../../database');

const UserQuery = {
  name: 'UserQuery',
  type: GraphQLUser, 
  args: {
    id: {type: GraphQLString},
  },
  resolve: (root, id) => getUser(id),
};

module.exports = {UserQuery};