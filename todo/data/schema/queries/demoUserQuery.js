// import {GraphQLString} from 'graphql';
import {demoGraphQLUser} from '../nodes.js';
import {DemoUser, getLastDemoUserOrThrow, getAllUsers} from '../../database.js';

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

export {demoUserQuery};
