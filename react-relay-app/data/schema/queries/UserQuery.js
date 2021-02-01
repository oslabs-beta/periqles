// import { graphql } from 'react-relay';
import {GraphQLString} from 'graphql';
import {GraphQLUser} from '../nodes';
import {getUser} from '../../database';

// export const UserQuery = graphql`
// query UserQuery($userID: ID!) {
//   node(id: $userID) {
//     id
//   }
// }`

const UserQuery = {
  name: 'UserQuery',
  type: GraphQLUser, 
  args: {
    id: {type: GraphQLString},
  },
  resolve: (root, id) => getUser(id),
};

export {UserQuery};