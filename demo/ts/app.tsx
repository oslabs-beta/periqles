import * as React from 'react';
import ReactDOM from 'react-dom';
import UserProfile from './components/UserProfile';
import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider
} from '@apollo/client';
import { cache } from './apolloCache';
import ApolloUserProfile from './components/ApolloUserProfile';

const rootElement = document.getElementById('root');
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: 'http://localhost:3000/graphql/apollo'
});

if (rootElement) {
  ReactDOM.render(
    <React.StrictMode>
      <UserProfile />
      <ApolloProvider client={client}>
        <ApolloUserProfile />
      </ApolloProvider>
    </React.StrictMode>,
    rootElement,
  );
}
