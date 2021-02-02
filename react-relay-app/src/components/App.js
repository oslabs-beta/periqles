// import 'todomvc-common';

import '../styles/App.css';
import { graphql, QueryRenderer } from 'react-relay';
import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';
import TodoApp from './TodoApp';

function fetchQuery(operation, variables) {
  return fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(res => res.json())
  .catch(err => console.error('ERROR at fetchQuery. Operation:', operation, 'Error:', err));
}

export const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource())
})


const query = graphql`
query appQuery($userID: String) {
  user(id: $userID) {
    ...TodoApp_user
  }
}`;

const userID = 'me';   // mock authenticated user


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React-Relay Toy App</h1>
        <QueryRenderer
          environment={environment}
          query={query}
          variables={userID}
          render={({error, props}) => {
            if (error) {
              return <div>{error.message}</div>;
            }
            else if (props && props.user) {
              return <TodoApp user={props.user} />;
            }

            return <div>Loading...</div>;
          }}
        />
      </header>
    </div>
  );
}

export default App;
