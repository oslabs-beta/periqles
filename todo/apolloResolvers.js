import { getLastDemoUserOrThrow, addUser } from './data/database.js';

export default {
  Query: {
   // demoUser: (_, __, { database }) => database.getLastDemoUserOrThrow(),
   demoUser: (_, __, ___) => getLastDemoUserOrThrow(),
  },
  Mutation: {
    // addUser: (_, {
    //   username,
    //   password,
    //   email,
    //   gender,
    //   pizzaTopping,
    //   age,
    // }, { database }) => database.addUser(username, password, email, gender, pizzaTopping, age),
    addUser: (_, { input }, ___) => {
      console.log('addUser input in resolver:', input);
      return addUser(input);
    },
  },
};

// mutation AddUser {
//   addUser(username: "asdf", password: "asdf", email: "asdf@asdf", gender: "NON_BINARY", pizzaTopping: "HAWAIIAN", age: 1) {
//       username
//   }
// }
// query DemoUser {
//   demoUser {
//     username
//     password
//     email
//     gender
//     pizzaTopping
//     age
//   }
// }
// "eslintConfig": {
//   "extends": "react-app"
// },
