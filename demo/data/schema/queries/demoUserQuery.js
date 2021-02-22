// import {GraphQLString} from 'graphql';
const {demoGraphQLUser} = require('../nodes.js');
const {
  DemoUser,
  getLastDemoUserOrThrow,
  getAllUsers,
} = require('../../database.js');

const demoUserQuery = {
  type: demoGraphQLUser,
  // args: {
  //   demoUserId: {type: GraphQLString},
  // },
  resolve: (root) => {
    // console.log('this is the demoUserId from resolver ', demoUserId);
    getAllUsers();
    return getLastDemoUserOrThrow();
  },
};

module.exports = {demoUserQuery};
