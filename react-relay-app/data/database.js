// this file will be imported by nodes.js
// export the mock data, their class definitions, and the functions for getting/setting/mutating data

export const USER_ID = 'me';

export class Todo {
  constructor(id, text, complete) {
    this.id = id;
    this.text = text;
    this.complete = complete;
  }
};

const todoIdsByUser = {};
todoIdsByUser[USER_ID] = [];

export const addTodo =(text, complete = false) =>{
  const id = 'todo' + todos.length;
  const newTodo = new Todo(id, text, complete);
  todos.push(newTodo);
  todoIdsByUser[USER_ID].push(newTodo.id);

  return id;
}

const todos = [];   //array of all todos in db
todos.push(addTodo('Walk the dog'));
todos.push(addTodo('Clean the kitchen'));

// get all the todos of a given status. If no complete parameter passed, get all todos.
export const getTodos = (complete) => {
  if (complete === undefined) return todos;
  
  return todos.filter(todo => todo.complete === complete);
};

// get a particular todo by its id, or throw error if not found
const getTodoById = (id) => {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) return todos[i];
  }
  
  throw new Error(`Todo of id ${id} not found`);
};

// returns array of todo ids
const getTodoIdsForUser = (userId) => {
  return todoIdsByUser[userId];
}

// return an array of just the ids (for frontend to use to selectively re-render)
export const markAllTodos =  (complete) => {
  // get all todos whose status is the opposite of the boolean arg passed in
  const todosToChange = getTodos(!complete);

  todosToChange.forEach(todo => {
    // changeTodoStatus(todo.id, complete);
    todo.complete = complete;
  });
  
  return todosToChange.map((todo => todo.id)); 
}


// get a todo by id then invert its completed status
export const changeTodoStatus = (id, boolean) => {
  const todo = getTodoById(id);
  todo.complete = boolean;
}

// remove one todo 
export const removeTodo = (id) => {
  //deleting todo from list of Todos
  //getting the index of element  
  let indexToRemove; 
  for (let i = 0; i < todos.length; i++){
    if (todos[i].id === id) indexToRemove = i;
  }
  //splice out the removed todo object from the todos array
  todos.splice(indexToRemove, 1)

  //removing todo item from user list

  // assuming one todo can be shared by multiple users
  // for (let user in todoIdsByUser){
  //   // filter out the deleted todo id from the array of todos
  //   todoIdsByUser[user] = todoIdsByUser[user].filter(todo => todo.id !== id)
  // }

  // assuming todo items are not shared by multiple users, and that we have the id of this user
  todoIdsByUser[USER_ID].splice(todoIdsByUser[USER_ID].indexOf(id), 1);

  return id;
}

export const removeCompletedTodos = () =>{
  let todoIdsForUser = getTodoIdsForUser(USER_ID);
  let allTodos = getTodos();
  let removedTodos = [];

  allTodos.forEach((todo, index) => {
   if (todoIdsForUser.includes(todo.id) && todo.complete === true){
     //remove id from user's list array
     let userTodoIndex = todoIdsForUser.indexOf(todo);
     todoIdsByUser[USER_ID].splice(userTodoIndex, 1);
     //emove todo from todos array & add it to removedTodos
     removedTodos.push(todo.splice(index, 1));
   } 
  })
  return removedTodos;
}

export const renameTodo =(id, text)=>{
  const toRename = getTodoById(id);
  toRename.text = text;
}


export class User {
  constructor(id) {
    this.id = id;
  }
};

const users = [];
users.push(new User(USER_ID));

// get a particular user by their id
export const getUser = (id) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) return users[i];
  }
  
  // if that user is not found, throw an error
  throw new Error(`User of id ${id} not found`);
};