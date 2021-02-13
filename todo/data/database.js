import {number, string} from 'prop-types';

//DEMO USER CLASSES, FUNCTIONS AND INFO

// DemoUser class:
export class DemoUser {
  +userId: string;
  +username: string;
  +password: string;
  +email: string;
  +gender: string;
  +pizzaTopping: string;
  +age: number;

  constructor(
    userId: string,
    username: string,
    password: string,
    email: string,
    gender: string,
    pizzaTopping: string,
    age: number,
  ) {
    this.userId = userId;
    this.username = username;
    this.password = password;
    this.email = email;
    this.gender = gender;
    this.pizzaTopping = pizzaTopping;
    this.age = age;
  }
}

//If we wanted to add an initial user, we can update the values for this object and pass it into the Mock DB on line 59
// export const DEMO_USER_INFO = {
//   userId: string,
//   username: string,
//   password: string,
//   email: string,
//   gender: string,
//   pizzaTopping: string,
//   age: number,
// };

// Mock Databse
const demoUsersById: Map<string, DemoUser> = new Map();

// Seed initial user
let nextUserId: number = 0;

//getDemoUser and getDemoUserOrThrow functions
function getDemoUser(userId: string): ?DemoUser {
  return demoUsersById.get(userId);
}
export function getDemoUserOrThrow(userId: string): DemoUser {
  // console.log('hello from getDemoUserOrThrow');
  const demoUser = getDemoUser(userId);

  if (!demoUser) {
    throw new Error(`Invariant exception, DemoUser ${userId} not found`);
  }
  console.log('returning from getDemoUserOrThrow:', demoUser);
  return demoUser;
}

export function getLastDemoUserOrThrow(): DemoUser {
  // console.log('hello from getDemoUserOrThrow');
  let lastDemoUser;
  const demoUsersIterator = demoUsersById[Symbol.iterator]();

  for (const userItem of demoUsersIterator) {
    lastDemoUser = userItem[1];
  }

  console.log('lastDemoUser', lastDemoUser);
  return lastDemoUser;
}

export function getAllUsers(): DemoUser {
  // console.log('hello from getDemoUserOrThrow');
  let demoUserList = [];
  const demoUsersIterator = demoUsersById[Symbol.iterator]();

  for (const userItem of demoUsersIterator) {
    demoUserList.push(userItem[1]);
  }

  console.log('demoUserList', demoUserList);
  return demoUserList;
}

// addUser function
export function addUser({
  userId,
  username,
  password,
  email,
  gender,
  pizzaTopping,
  age,
}) {
  const newUser = new DemoUser(
    `${nextUserId++}`,
    username,
    password,
    email,
    gender,
    pizzaTopping,
    age,
  );
  demoUsersById.set(newUser.userId, newUser);
  console.log('newUser is', newUser);
  return newUser.userId;
}
