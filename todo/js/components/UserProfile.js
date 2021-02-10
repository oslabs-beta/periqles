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

  //Create an array for all the user profile info list items
  const userDisplayItems = [];
  userDisplayItems.push(<li className="userDisplayItem">Username: {demoUser.username}</li>);
  userDisplayItems.push(<li className="userDisplayItem">Email: {demoUser.email}</li>);
  userDisplayItems.push(<li className="userDisplayItem">Gender: {demoUser.gender}</li>);
  userDisplayItems.push(<li className="userDisplayItem">Favorite Pizza Topping: {demoUser.pizzaTopping}</li>);
  userDisplayItems.push(<li className="userDisplayItem">Age: {demoUser.age}</li>);


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
          <ul>{userDisplayItems}</ul>
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
