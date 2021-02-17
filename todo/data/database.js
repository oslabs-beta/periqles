//DEMO USER CLASSES, FUNCTIONS AND INFO

// DemoUser class:
export class DemoUser {
  constructor(userId, username, password, email, gender, pizzaTopping, age) {
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
const DEMO_USER_INFO = {
  userId: '0',
  username: 'bob',
  password: 'anna',
  email: 'bob@bob.io',
  gender: 'male',
  pizzaTopping: 'hawaiian',
  age: 10,
};

// Mock Databse
const demoUsersById = new Map([
  [0, new DemoUser('0', 'bob', 'anna', 'bob@bob.io', 'male', 'hawaiian', 10)],
]);

// Seed initial user
let nextUserId = 1;

//getDemoUser and getDemoUserOrThrow functions
function getDemoUser(userId) {
  return demoUsersById.get(userId);
}
export function getDemoUserOrThrow(userId) {
  // console.log('hello from getDemoUserOrThrow');
  const demoUser = getDemoUser(userId);

  if (!demoUser) {
    throw new Error(`Invariant exception, DemoUser ${userId} not found`);
  }
  console.log('returning from getDemoUserOrThrow:', demoUser);
  return demoUser;
}

export function getLastDemoUserOrThrow() {
  // console.log('hello from getDemoUserOrThrow');
  let lastDemoUser;
  const demoUsersIterator = demoUsersById[Symbol.iterator]();

  for (const userItem of demoUsersIterator) {
    lastDemoUser = userItem[1];
  }

  console.log('lastDemoUser', lastDemoUser);
  return lastDemoUser;
}

export function getAllUsers() {
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
