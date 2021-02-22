import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider
} from '@apollo/client';
import { cache } from './cache';
import React from 'react';
import ReactDOM from 'react-dom';
import UserProfile from './components/UserProfile';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: 'http://localhost:3000/graphql/apollo'
});

// ...ApolloClient instantiated here...

// client
// .query({
//   query: gql`
//     query DemoUser {
//       demoUser {
//         username
//         password
//         email
//         gender
//         pizzaTopping
//         age
//       }
//     }
//   `
// })
// .then(result => console.log(result))
// .catch(err => console.log(err));

ReactDOM.render(
  <ApolloProvider client={client}>
    <UserProfile />
  </ApolloProvider>,
  document.getElementById('root')
);