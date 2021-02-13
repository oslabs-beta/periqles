import React, {useState} from 'react';
import {createFragmentContainer, QueryRenderer, graphql} from 'react-relay';
import {
  Environment,
  Network,
  RecordSource,
  Store,
  type RequestNode,
  type Variables,
} from 'relay-runtime';
import AddUserMutation from '../mutations/AddUserMutation';
import PeriqlesForm from './PeriqlesForm.jsx';
import type {RelayProp} from 'react-relay';
import type {TodoApp_user} from 'relay/TodoApp_user.graphql';
import type {UserProfileQueryResponse} from 'relay/UserProfileQuery.graphql';

type Props = {|
  +relay: RelayProp,
  +user: TodoApp_user,
|};

// const UserProfile = ({relay, demoUser = null}: Props) => {
const UserProfile = () => {
  async function fetchQuery(
    operation: RequestNode,
    variables: Variables,
  ): Promise<{}> {
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

  const [updated, setUpdate] = useState(false);
  
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

  // seed QueryRenderer with a DemoUser to start with
  // AddUserMutation.commit(
  //   // relay.environment,
  //   modernEnvironment,
  //   'UN1',
  //   'PW1',
  //   'E1',
  //   'NON_BINARY',
  //   'HAWAIIAN',
  //   1,
  // );

  const specifications = {
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
    }
  };

  const onSuccess = (response) => {
    setUpdate(true);
  };

  const onFailure = (errorMsg) => {
    console.error('Problem submitting form:', errorMsg);
  };

  // onSuccess & onFailure callbacks are passed mutation response & error message as arguments
  // currently callbacks must be passed in as prop object properties
  // callbacks must be named onSuccess & onFailure

  const args = {clientMutationId: '0000'};

  return (
    <section className="UserProfile">
      <h1>Periqles Demo</h1>
      <section className="UserProfile-flex">
        <PeriqlesForm
          setUpdate={setUpdate}
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
              render={({error, props}: {error: ?Error, props: ?UserProfileQueryResponse}) => {
                setUpdate(false);
                if (props && !props.demoUser) {
                  <p>Sign up...</p>
                }
                if (props && props.demoUser) {
                  const {demoUser} = props;
                  return (
                    <ul>
                      <li className="userDisplayItem">Username: {demoUser.username}</li>
                      <li className="userDisplayItem">Email: {demoUser.email}</li>
                      <li className="userDisplayItem">Gender: {demoUser.gender}</li>
                      <li className="userDisplayItem">Favorite Pizza Topping: {demoUser.pizzaTopping}</li>
                      <li className="userDisplayItem">Age: {demoUser.age}</li>
                    </ul>
                  );
                } else if (error) {
                  return <p>{error.message}</p>;
                }

                <p>Loading...</p>
              }}
          />
        </main>
      </section>
    </section>
  );
};

export default UserProfile;

// export default createFragmentContainer(UserProfile, {
//   demoUser: graphql``,
// });
// export default createFragmentContainer(UserProfile, {
//   demoUser: '',
// });
