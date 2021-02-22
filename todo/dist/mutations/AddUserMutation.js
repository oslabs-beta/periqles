var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { commitMutation, graphql } from 'react-relay';
// import type {Disposable, Environment} from 'react-relay';
// import type {TodoApp_user} from 'relay/TodoApp_user.graphql';
// import type {AddUserInput} from 'relay/AddUserMutation.graphql';
var mutation = graphql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation AddUserMutation($input: AddUserInput!) {\n    addUser(input: $input) {\n      userId\n      username\n      password\n      email\n      gender\n      pizzaTopping\n      age\n    }\n  }\n"], ["\n  mutation AddUserMutation($input: AddUserInput!) {\n    addUser(input: $input) {\n      userId\n      username\n      password\n      email\n      gender\n      pizzaTopping\n      age\n    }\n  }\n"])));
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
var tempID = 0;
// can leave this out
function commit(environment, username, password, email, gender, pizzaTopping, age) {
    // console.log('commit called');
    var input = {
        // add input values listed above to an input object
        username: username,
        password: password,
        email: email,
        gender: gender,
        pizzaTopping: pizzaTopping,
        age: age,
        clientMutationId: "" + tempID++,
    };
    return commitMutation(environment, {
        mutation: mutation,
        variables: {
            input: input,
        },
        updater: function (store) {
            // get addUser payload
            var payload = store.getRootField('addUser'); // TODO
            // get userId from addUser payload
            console.log('payload:', payload);
            var newUserId = payload.getValue('userId');
            var newUsername = payload.getValue('username');
            var newPassword = payload.getValue('password');
            var newEmail = payload.getValue('email');
            var newGender = payload.getValue('gender');
            var newPizzaTopping = payload.getValue('pizzaTopping');
            var newAge = payload.getValue('age');
            // console.log('newUserId', newUserId);
            // return newUserId;
            // sharedUpdater(store, demoUser);
        },
    });
}
export default { commit: commit };
var templateObject_1;
