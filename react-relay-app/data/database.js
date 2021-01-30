// this data will be imported into nodes.js
// export the Maps where mock data is stored and the functions for mutating it
// Flow syntax commented out

export class Todo {
  // +id: string;
  // +text: string;
  // +complete: boolean;

  // constructor(id: string, text: string, complete: boolean) {
  constructor(id, text, complete) {
    this.id = id;
    this.text = text;
    this.complete = complete;
  }
}

export class User {
  // +id: string;

  // constructor(id: string) {
  constructor(id) {
    this.id = id;
  }
}

export const USER_ID = 'me';