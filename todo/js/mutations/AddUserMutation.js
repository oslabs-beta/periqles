import {
  commitMutation,
  graphql,
  type Disposable,
  type Environment,
  type RecordProxy,
  type RecordSourceSelectorProxy,
} from 'react-relay';

import {ConnectionHandler} from 'relay-runtime';
// import type {TodoApp_user} from 'relay/TodoApp_user.graphql';
import type {AddUserInput} from 'relay/AddTodoMutation.graphql';  // TODO

// TODO: consult with Ian and Joe about fields and types to return from AddUser mutation
const mutation = graphql`
  mutation AddUserMutation($input: AddUserInput!) {
    addUser(input: $input) {
      user {
        id
        # TODO
      }
    }
  }
`;

// Everything below is non-essential; at minimum only need to export this mutation query

// TODO: What to replace this updater fn with?
function sharedUpdater(
  store: RecordSourceSelectorProxy,
  user
) {
  const userProxy = store.get(user.id);  
  // const conn = ConnectionHandler.getConnection(userProxy, 'TodoList_todos');
  // ConnectionHandler.insertEdgeAfter(conn, newEdge);
}

let tempID = 0;

// can leave this out
function commit(
  environment: Environment,
  // TODO: list input values from schema here
  name,
  age,
): Disposable {

  const input: AddUserInput = {
    // add input values listed above to an input object
    name,
    age,
    clientMutationId: `${tempID++}`,    // why is this unique?
  };

  return commitMutation(environment, {
    mutation,
    variables: {
      input,
    },
    updater: (store: RecordSourceSelectorProxy) => {      // TODO: needed? is there a default to fall back to if I leave it off?
      const payload = store.getRootField('addUser');      // TODO
      // const newEdge = payload.getLinkedRecord('todoEdge');   // TODO: what should this be?
      sharedUpdater(store, user);
    },
    optimisticUpdater: (store: RecordSourceSelectorProxy) => {    // TODO: needed?
      // const id = 'client:newTodo:' + tempID++;     // TODO: make a new, unique user id
      const user = store.create(id, 'User');    // create(idForNewData, typeNameFromSchema) --> RecordProxy
      user.setValue(name, 'name');              // setValue(value, fieldName)
      user.setValue(age, 'age');
      sharedUpdater(store, user);
    },
  });
}

export default {commit};
