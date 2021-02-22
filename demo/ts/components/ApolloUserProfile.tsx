/* eslint-disable*/
import React, {useState} from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import PeriqlesForm from 'periqles';

// fragment variable name will be referenced in query
// syntax: fragment [FRAGMENT_NAME] on [SCHEMA_TYPE_NAME]
// [FRAGMENT_NAME] will replace fields in query below
export const USER_DATA = gql`
  fragment UserData on DemoUser {
    username
    password
    email
    gender
    pizzaTopping
    age
  }
`;
// query variable name will be passed into useQuery hook
// spread fragment name where fields would go
// reference fragment variable name after query definition
export const GET_USER = gql`
  query DemoUser {
    demoUser {
      ...UserData
    }
  }
  ${USER_DATA}
`;

// define AddUser mutation, return fields from successful mutation: username, email, gender, pizzaTopping, age
export const ADD_USER = gql`
mutation AddUser($input: AddUserInput!){
  addUser(input: $input){
      username
      email
      gender
      pizzaTopping
      age
    }
}
`

const ApolloUserProfile = () => {
  const [updated, setUpdate] = useState(false);
  // useQuery hook to call GET_USER query, returns object containing { data, loading, error }
  const {
    data,
    loading,
    error,
    refetch
  } = useQuery(GET_USER);
  // addUser function is returned from useMutation hook given ADD_USER mutation string
  const [
    addUser,
    respObj // can pull data, loading & error from this obj
   ] = useMutation(
     ADD_USER,
    //  {
    //   onCompleted({ addUser }) { // callback on successful completion of mutation
    //     console.log('onCompleted executes');
    //     refetch(GET_USER);
    //   },
    //   onError(error) {
    //     console.log('useMutation onError:', error);
    //   }
    // }
  );

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

  const args = {clientMutationId: '0000'};

  const onSuccess = (response) => {
    refetch(GET_USER);
  };

  const onFailure = (error) => {
    alert(`Problem submitting form: ${error.toString()}`);
  };
  
  const renderUser = (demoUser) => {
    return (
      <ul>
        <li className="userDisplayItem">Username: {demoUser.username}</li>
        <li className="userDisplayItem">Email: {demoUser.email}</li>
        <li className="userDisplayItem">Gender: {demoUser.gender}</li>
        <li className="userDisplayItem">Favorite Pizza Topping: {demoUser.pizzaTopping}</li>
        <li className="userDisplayItem">Age: {demoUser.age}</li>
      </ul>
    )
  }
 
    return (
      <section className="UserProfile">
          {/*removed environment & args props */}
          <PeriqlesForm
            mutationName={'AddUser'}
            callbacks={{onSuccess, onFailure}}
            specifications={specifications}
            args={args}
            useMutation={addUser}
          />
          <main className="UserProfile-main">
              <h2>Most Recently Added User</h2>
              {loading ? <p>Loading data...</p> : null}
              {error ? <p>ERROR: {JSON.stringify(error)}</p> : null}
              {data && data.demoUser ? renderUser(data.demoUser): <p>Sign up...</p>}
          </main>
        </section>
    );
};

export default ApolloUserProfile;
