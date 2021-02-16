import React, {useState} from 'react';
import {QueryRenderer, graphql} from 'react-relay';
import {Environment, Network, RecordSource, Store} from 'relay-runtime';
import PeriqlesForm from './PeriqlesForm';
// import type {RequestNode, Variables} from 'relay-runtime';
// based off todo app example, need to locate generated/relay folder after successful npm run build
// import type {UserProfileQueryResponse} from 'relay/UserProfileQuery.graphql';
interface QueryResponse {
  demoUser?: Record<string, string | boolean | number>;
}

const UserProfile = () => {
  const [updated, setUpdate] = useState(false);
  console.log('Hi from UserProfile');

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
    fields: {
      gender: {
        element: 'radio',
        label: 'Gender',
        options: [
          {label: 'nonbinary', value: 'NON_BINARY'},
          {label: 'male', value: 'MALE'},
          {label: 'female', value: 'FEMALE'},
        ],
        // render: (formState, setFormState, handleChange) => {
        //  return <label>Gender:<input onChange={handleChange} /></label>
        // }
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
        // render: (formState, setFormState, handleChange) => {
        //  return <input onChange= {handleChange} />
        // },
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
      <h1>Periqles Demo</h1>
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
            <p>Sign up...</p>;
          }
          if (props && props.demoUser) {
            const {demoUser} = props;
            console.log('mutationgql as props for PF:', mutationGQL);
            return (
              <section className="UserProfile-flex">
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
                </main>
              </section>
            );
          } else if (error) {
            return <p>{error.message}</p>;
          }
        }}
      />
    </section>
  );
};

export default UserProfile;
