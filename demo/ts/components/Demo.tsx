import React, {useState} from 'react';
import UserProfile from './relay/UserProfile';
import ApolloUserProfile from './ApolloUserProfile';
import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider
} from '@apollo/client';
import { cache } from '../apolloCache';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: 'http://localhost:3000/graphql'
});

const Demo = (): JSX.Element => {
  const [relay, setRelay] = useState(true);

  return (
    <main className="Demo">
      {relay 
        ? <h1>Relay Demo</h1> 
        : <h1>Apollo Demo</h1>
      }
      <div id="client-switch">
        Apollo
        <label className="switch">
          <input type="checkbox" 
          checked={relay}
          onChange={(e) => setRelay(e.target.checked)}/>
          <span className="slider round"></span>
        </label>
        Relay
      </div>
      {relay
        ? <UserProfile />
        : (<ApolloProvider client={client}>
              <ApolloUserProfile />
            </ApolloProvider>)
      }
    </main>
  )
}

export default Demo;