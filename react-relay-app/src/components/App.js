import '../styles/App.css';
import { graphql, QueryRenderer } from 'react-relay';
import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

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
query UserQuery($userID: ID!) {
  node(id: $userID) {
    id
  }
}`

const userID = 1;   // hard-coded for now


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
              return <div>Error!</div>;
            }
            if (!props) {
              return <div>Loading...</div>;
            }
            return <div>User ID: {props.node.id}</div>
          }}
        ></QueryRenderer>
      </header>
    </div>
  );
}

export default App;
