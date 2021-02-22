import React, {useState} from 'react';
import {QueryRenderer, graphql} from 'react-relay';
import {Environment, Network, RecordSource, Store} from 'relay-runtime';
import PeriqlesForm from 'periqles';
interface QueryResponse {
  demoUser?: Record<string, string | boolean | number>;
}

const UserProfile = (): JSX.Element => {
  const [updated, setUpdate] = useState(false);
  console.log('Rendering UserProfile');

  async function fetchQuery(operation, variables): Promise<{}> {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
    });

    return response.json();
  }

  const modernEnvironment: Environment = new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
  });

  const mutationGQL = graphql`
    mutation UserProfile_AddUserMutation($input: AddUserInput!) {
      addUser(input: $input) {
        userId
        username
        password
        email
        gender
        pizzaTopping
        age
      }
    }
  `;

  const specifications: PeriqlesSpecifications = {
    header: 'Sign Up',
    fields: {
      gender: {
        element: 'radio',
        label: 'Gender',
        options: [
          {label: <span style={{color:'green'}}>non-binary</span>, value: 'NON_BINARY'},
          {label: <span style={{color:'blue'}}>male</span>, value: 'MALE'},
          {label: <span style={{color:'red'}}>female</span>, value: 'FEMALE'},
        ],
      },
      pizzaTopping: {
        label: 'Favorite pizza topping:',
        element: 'select',
        options: [
          {label: 'buffalo chicken', value: 'BUFFALO_CHICKEN'},
          {label: 'pepperoni', value: 'PEPPERONI'},
          {label: "meat lovers'", value: 'MEATLOVERS'},
          {label: 'eggplant parmesan', value: 'EGGPLANT_PARM'},
          {label: 'olives', value: 'OLIVES'},
          {label: 'hawaiian', value: 'HAWAIIAN'},
        ],
      },
    },
  };

  const onSuccess = (response) => {
    setUpdate(!updated);
  };

  const onFailure = (error) => {
    alert(`Problem submitting form: ${error.toString()}`);
  };

  const args = {clientMutationId: '0000'};

  return (
    <section className="UserProfile">
        <PeriqlesForm
          environment={modernEnvironment}
          mutationName={'AddUser'}
          mutationGQL={mutationGQL}
          specifications={specifications}
          args={args}
          callbacks={{onSuccess, onFailure}}
        />
        <main className="UserProfile-main">
          <h2>Most Recently Added User</h2>
          <QueryRenderer
            environment={modernEnvironment}
            query={graphql`
              query UserProfileQuery {
                demoUser {
                  userId
                  username
                  password
                  email
                  gender
                  pizzaTopping
                  age
                }
              }
            `}
          render={({error, props}: {error: Error; props: QueryResponse}) => {
            if (props && !props.demoUser) {
              return <p>Sign up...</p>;
            }
            if (props && props.demoUser) {
              const {demoUser} = props;
              console.log('Rendering DemoUser query response...');
              return (
                <ul>
                  <li className="userDisplayItem">
                    Username: {demoUser.username}
                  </li>
                  <li className="userDisplayItem">Email: {demoUser.email}</li>
                  <li className="userDisplayItem">
                    Gender: {demoUser.gender}
                  </li>
                  <li className="userDisplayItem">
                    Favorite Pizza Topping: {demoUser.pizzaTopping}
                  </li>
                  <li className="userDisplayItem">Age: {demoUser.age}</li>
                </ul>
              );
            } else if (error) {
              console.error(error);
              return <p>Something went wrong...</p>;
            }

            return <p>Loading...</p>;
          }}
        />
      </main>
    </section>
  );
};

export default UserProfile;
