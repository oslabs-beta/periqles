// import {GraphQLString} from 'graphql';
import {demoGraphQLUser} from '../nodes';
import {DemoUser, getLastDemoUserOrThrow, getAllUsers} from '../../database';

// TODO: replace with TypeScript
// type Input = {
//   +id: string,
// };

const demoUserQuery = {
  type: demoGraphQLUser,
  // args: {
  //   demoUserId: {type: GraphQLString},
  // },
  resolve: (root: {}): DemoUser => {
    // console.log('this is the demoUserId from resolver ', demoUserId);
    getAllUsers();
    return getLastDemoUserOrThrow();
  },
};

export {demoUserQuery};
