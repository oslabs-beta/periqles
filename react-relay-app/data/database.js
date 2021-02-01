// this data will be imported into nodes.js
// export the Maps where mock data is stored and the functions for getting/setting it
// Flow syntax commented out

export class Todo {
  constructor(id, text, complete) {
    this.id = id;
    this.text = text;
    this.complete = complete;
  }
};

const todos = [];   //array of all todos in db
todos.push(addTodo('Walk the dog'));
todos.push(addTodo('Clean the kitchen'));

const todoIdsByUser = {};
todoIdsByUser[USER_ID] = ['todo0', 'todo1'];

export const addTodo =(text, complete = false) =>{
  const id = 'todo' + todos.length;
  const newTodo = new Todo(id, text, complete);
  todos.push(newTodo);
  todoIdsByUser[USER_ID].push(newTodo.id);

  return id;
}

// get all the todos of a given status
export const getTodos = (status) => {
  return todos.filter(todo => todo.complete === status);
};

// get a particular todo by its id, or throw error if not found
// O(n) lookup time, which is fine for this purpose. For a larger dataset you'd use a Map to facilitate O(1) lookup time.
const getTodo = (id) => {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) return todos[i];
  }
  
  throw new Error(`Todo of id ${id} not found`);
};

// returns array of todo ids
const getTodoIdsForUser = (userId) => {
  return todoIdsByUser[userId];
}

// changing statuses for all todo items
const markAllTodos =  (complete) => {
  const todosToChange = getTodos().filter(todoItem => {
    todoDoItem.complete !== complete }
  );
    todosToChange.forEach(todo => {
      changeTodoStatus(todoItem.id, complete);
    })
     
  return todosToChange.map((todo => todo.id)); 
}


// get a todo by id then invert its completed status
export const changeTodoStatus = (id, boolean) => {
  const todo = getTodo(id);
  todo.complete = boolean;
}

// remove completed todo 
const removeTodo = (id) => {
  const todoIdsForUser = getTodoIdsForUser(USER_ID);
  //removing todo item from user list
  for (let key in todoIdsByUser){
    if (key === USER_ID){
      todoIdsForUser.filter(todoId => todoId !== id)
    }
  }
  //deleting todo from list of Todos
  for (let key in todoIds){
    if (key === id){
      delete todoIds[key]
    }
  }}

  export const renameTodo =(id, text)=>{
    const toRename = 
  }


export class User {
  constructor(id) {
    this.id = id;
  }
};

const users = [];
users.push(new User('me'));
users.push(new User('you'));
users.push(new User('and everyone we know'));

// get a particular user by their id
// O(n) lookup time
export const getUser = (id) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) return users[i];
  }
  
  // if that user is not found, throw an error
  throw new Error(`User of id ${id} not found`);
};

export const USER_ID = 'me';