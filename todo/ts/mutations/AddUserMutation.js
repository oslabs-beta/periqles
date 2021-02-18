import {commitMutation, graphql} from 'react-relay';
// import type {Disposable, Environment} from 'react-relay';
// import type {AddUserInput} from 'relay/AddUserMutation.graphql';

const mutation = graphql`
  mutation AddUserMutation($input: AddUserInput!) {
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

// export default {mutation: mutationQL};
// Everything below is non-essential; at minimum only need to export the mutation query

// TODO: What to replace this updater fn with?
// function sharedUpdater(
//   store: RecordSourceSelectorProxy,
//   demoUser
// ) {
//   const userProxy = store.get(demoUser.userId);
//   // const conn = ConnectionHandler.getConnection(userProxy, 'TodoList_todos');
//   // ConnectionHandler.insertEdgeAfter(conn, newEdge);
// }

let tempID = 0;

// can leave this out
function commit(
  environment,
  username,
  password,
  email,
  gender,
  pizzaTopping,
  age,
) {
  // console.log('commit called');
  const input = {
    // add input values listed above to an input object
    username,
    password,
    email,
    gender,
    pizzaTopping,
    age,
    clientMutationId: `${tempID++}`, // why is this unique?
  };

  return commitMutation(environment, {
    mutation,
    variables: {
      input,
    },
    updater: (store) => {
      // get addUser payload
      const payload = store.getRootField('addUser'); // TODO
      // get userId from addUser payload
      console.log('payload:', payload);
      const newUserId = payload.getValue('userId');
      const newUsername = payload.getValue('username');
      const newPassword = payload.getValue('password');
      const newEmail = payload.getValue('email');
      const newGender = payload.getValue('gender');
      const newPizzaTopping = payload.getValue('pizzaTopping');
      const newAge = payload.getValue('age');
      // console.log('newUserId', newUserId);
      // return newUserId;
      // sharedUpdater(store, demoUser);
    },
    // optimisticUpdater: (store: RecordSourceSelectorProxy) => {    // TODO: needed?
    //   const id = 'client:newUser:' + tempID++;     // TODO: make a new, unique mutation id
    //   const user = store.create(id, 'User');    // create(idForNewData, typeNameFromSchema) --> RecordProxy
    //   user.setValue(username, 'username');      // setValue(value, fieldName)
    //   user.setValue(password, 'password');
    //   user.setValue(email, 'email');
    //   user.setValue(gender, 'gender');
    //   user.setValue(pizzaTopping, 'pizzaTopping');
    //   user.setValue(age, 'age');
    //   sharedUpdater(store, user);
    // },
  });
}

export default {commit};
