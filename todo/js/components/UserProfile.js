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
  // console.log('environment in UserProfile component:', relay.environment);

  //iterate over the properties of the user & create a list item for each
  const userDisplayItems = [];
  for (const info in demoUser) {
    let listItem = (
      <li className="userDisplayItem">{`${info}: ${demoUser[info]}`}</li>
    );
    userDisplayItems.push(listItem);
  }


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
      email: {
        element: 'textarea',
        label: 'Email',
      },
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
