import { graphql } from 'react-relay';

export const UserQuery = graphql`
query UserQuery($userID: ID!) {
  node(id: $userID) {
    id
  }
}`