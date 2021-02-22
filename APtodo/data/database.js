class DemoUser {
  constructor(
    userId,
    username,
    password,
    email,
    gender,
    pizzaTopping,
    age,
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

// If we wanted to add an initial user, we can update the values for this object and pass it into the Mock DB on line 59
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
const demoUsersById = new Map();

// Seed initial user
let nextUserId = 0;

// getDemoUser and getDemoUserOrThrow functions
function getDemoUser(userId) {
  return demoUsersById.get(userId);
}

function getDemoUserOrThrow(userId) {
  // console.log('hello from getDemoUserOrThrow');
  const demoUser = getDemoUser(userId);

  if (!demoUser) {
    throw new Error(`Invariant exception, DemoUser ${userId} not found`);
  }
  console.log('returning from getDemoUserOrThrow:', demoUser);
  return demoUser;
}

export function getLastDemoUserOrThrow() {
  console.log('hello from getLastDemoUserOrThrow');
  let lastDemoUser;
  const demoUsersIterator = demoUsersById[Symbol.iterator]();

  for (const userItem of demoUsersIterator) {
    lastDemoUser = userItem[1];
  }

  console.log('lastDemoUser', lastDemoUser);
  return lastDemoUser;
}

function getAllUsers() {
  // console.log('hello from getDemoUserOrThrow');
  let demoUserList = [];
  const demoUsersIterator = demoUsersById[Symbol.iterator]();

  for (const userItem of demoUsersIterator) {
    demoUserList.push(userItem[1]);
  }

  console.log('demoUserList', demoUserList);
  return demoUserList;
}

export function addUser({
  userId,
  username,
  password,
  email,
  gender,
  pizzaTopping,
  age,
}) {
  console.log('username in database', username);
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
  return newUser;
}
