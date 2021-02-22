/* eslint-disable*/
import React, {useState} from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
// import {createFragmentContainer, QueryRenderer, graphql} from 'react-relay';
// import {
//   Environment,
//   Network,
//   RecordSource,
//   Store,
//   type RequestNode,
//   type Variables,
// } from 'relay-runtime';
// import AddUserMutation from '../mutations/AddUserMutation';
import PeriqlesForm from './ApPeriqlesForm.tsx';

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

const UserProfile = () => {
  const [updated, setUpdate] = useState(false);
  // addUser function is returned from useMutaion hook given ADD_USER mutation string
  const {
    data,
    loading,
    error,
    refetch
  } = useQuery(GET_USER);

  const [
    addUser,
    respObj // can pull data, loading & error from this obj
   ] = useMutation(
     ADD_USER,
     {
      onCompleted({ addUser }) { // callback on successful completion of mutation
        console.log('onCompleted executes');
        refetch(GET_USER);
      },
      onError(error) {
        console.log('useMutation onError:', error);
      }
    }
  );
  console.log('response Object: ', respObj);

  // test input
  // const input = {
  //   username: 'ian',
  //   password: 'ian',
  //   email: 'ian@ian.com',
  //   gender: 'NON_BINARY',
  //   pizzaTopping: 'BUFFALO_CHICKEN',
  //   age: 1000
  // };

  // actual invocation of addUser useMutation hook; if passing variables must be passed inside of variables object
  // addUser({ variables: input })
  // .then(resp => {
  //   console.log('promised result:', resp.data); // useMutation hook returns mutation response fields on the data property of the response object
  // }); 

  // useQuery hook to call GET_USER query, returns object containing { data, loading, error }

  // const onSuccess = (response) => {
    // console.log('callback called, updated status:', updated);
    // setUpdate(true);
    // console.log('callback called, updated status:', updated);
  // };
  
  const renderUser = (demoUser) => {
    console.log('renderUser called');
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
 
  // conditional statements depending on query response
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>ERROR</p>;
  // if (!data) {
  //  return <p>Not found</p>;
  // } else {
  //   const demoUser = data.demoUser;
    return (
      <section className="UserProfile">
        <h1>Periqles Demo</h1>
        <section className="UserProfile-flex">
          {/*removed environment & args props */}
          <PeriqlesForm
            mutationName={'AddUser'}
            useMutation={addUser}
          />
          <main className="UserProfile-main">
              <h2>Most Recently Added User</h2>
              {loading ? <p>Loading data...</p> : null}
              {error ? <p>ERROR: {error}</p> : null}
              {data && data.demoUser ? renderUser(data.demoUser): <p>Sign up...</p>}
              {/* <QueryRenderer
                environment={modernEnvironment}
                query={graphql`
                  query UserProfileQuery {
                    demoUser {
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
                */}
                {/* <Component render={(GET_USER) => {

                  setUpdate(false);
                  if (loading) return <p>Loading...</p>;
                  if (error) return <p>ERROR: {error}</p>;
                  if (!data) {
                    return <p>Sign up...</p>;
                  } else {
                    const demoUser = data.demoUser;
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
                }}/> */}
                  
                    {/* ); */}
                  {/* } else if (error) {
                    return <p>{error.message}</p>;
                  }
                 }}
              /> */}
          </main>
        </section>
      </section>
    );
  // if (props.UserData) {
  //   console.log('UserData is:', props.UserData);
  //   const demoUser = props.UserData.data;
  // }
  // async function fetchQuery(
  //   operation: RequestNode,
  //   variables: Variables,
  // ): Promise<{}> {
  //   const response = await fetch('/graphql', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       query: operation.text,
  //       variables,
  //     }),
  //   });

  //   return response.json();
  // }

  //   const modernEnvironment: Environment = new Environment({
  //   network: Network.create(fetchQuery),
  //   store: new Store(new RecordSource()),
  // });

  // const mutationGQL = graphql`
  //   mutation UserProfile_AddUserMutation($input: AddUserInput!) {
  //     addUser(input: $input) {
  //       userId
  //       username
  //       password
  //       email
  //       gender
  //       pizzaTopping
  //       age
  //     }
  //   }
  // `;

  // const specifications = {
  //   fields: {
  //     gender: {
  //       element: 'radio',
  //       label: 'Gender',
  //       options: [
  //         {label: 'nonbinary', value: 'NON_BINARY'},
  //         {label: 'male', value: 'MALE'},
  //         {label: 'female', value: 'FEMALE'},
  //       ],
  //       // render: (formState, setFormState, handleChange) => {
  //       //  return <label>Gender:<input onChange={handleChange} /></label>
  //       // }
  //     },
  //     pizzaTopping: {
  //       label: 'Favorite pizza topping:',
  //       element: 'select',
  //       options: [
  //         {label: 'buffalo chicken', value: 'BUFFALO_CHICKEN'},
  //         {label: 'pepperoni', value: 'PEPPERONI'},
  //         {label: "meat lovers'", value: 'MEATLOVERS'},
  //         {label: 'eggplant parmesan', value: 'EGGPLANT_PARM'},
  //         {label: 'olives', value: 'OLIVES'},
  //         {label: 'hawaiian', value: 'HAWAIIAN'},
  //       ],
  //       // render: (formState, setFormState, handleChange) => {
  //       //  return <input onChange= {handleChange} />
  //       // },
  //     },
  //   }
  // };

  // const onSuccess = (response) => {
  //   setUpdate(true);
  // };

  // const onFailure = (errorMsg) => {
  //   alert('Problem submitting form:', errorMsg);
  // };

  // const args = {clientMutationId: '0000'};


  
  
};

export default UserProfile;
