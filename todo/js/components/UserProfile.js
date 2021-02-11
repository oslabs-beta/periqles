import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';
import AddUserMutation from '../mutations/AddUserMutation';
import PeriqlesForm from './PeriqlesForm.jsx';
import type {RelayProp} from 'react-relay';
import type {TodoApp_user} from 'relay/TodoApp_user.graphql';

type Props = {|
  +relay: RelayProp,
  +user: TodoApp_user,
|};

const UserProfile = ({relay, demoUser}: Props) => {
  // console.log('demoUser in UserProfile component:', demoUser);

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

  const specifications = {
    fields: {
      gender: {
        element: 'radio',
        label: 'Gender',
        options: [
          {label: 'male', value: 'MALE'},
          {label: 'female', value: 'FEMALE'},
          {label: 'nonbinary', value: 'NON_BINARY'},
        ],
      },
      pizzaTopping: {
        label: 'Favorite pizza topping:',
        element: 'select',
        options: [
          {label: 'Buffalo chicken', value: 'BUFFALO_CHICKEN'},
          {label: 'pepperoni', value: 'PEPPERONI'},
          {label: "meat lovers'", value: 'MEATLOVERS'},
          {label: 'eggplant parmesan', value: 'EGGPLANT_PARM'},
          {label: 'olives', value: 'OLIVES'},
          {label: 'hawaiian', value: 'HAWAIIAN'},
        ],
      },
    },
  };

  const args = [{name: 'clientMutationId', value: '0000'}];

  return (
    <section className="UserProfile">
      <h1>Periqles Demo</h1>
      <section className="UserProfile-flex">
        <PeriqlesForm
          environment={relay.environment}
          mutationName={'AddUser'}
          mutationGQL={mutationGQL}
          specifications={specifications}
          args={args}
        />
        <main className="UserProfile-main">
            <h2>Most Recently Added User</h2>
            <QueryRenderer
              environment={relay.environment}
              query={graphql`
                query appQuery {
                  demoUser {
                    ...UserProfile_demoUser
                  }
                }
              `}
              render={({error, props}: {error: ?Error, props: ?appQueryResponse}) => {
                // console.log('these are the props from App', props);
                if (props && props.demoUser) {
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

export default createFragmentContainer(UserProfile, {
  demoUser: graphql`
    fragment UserProfile_demoUser on DemoUser {
      userId
      username
      password
      email
      gender
      pizzaTopping
      age
    }
  `,
});
