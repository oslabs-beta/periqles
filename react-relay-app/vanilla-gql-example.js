const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const ggl = require("graphql-tag");
const { buildASTSchema } = require("graphql");
const app = express();
const uuid = require("uuid/v4");

app.use(cors());



const schema = buildASTSchema(ggl`
  type Query {
    hello: String
    posts: [Post]
    post(id: ID): Post
    authors: [Person]
    author(id: ID): Person
  }

  type Post {
    id: ID
    author: Person
    body: String
  }

  type Person {
    id: ID
    posts: [Post]
    firstName: String
    lastName: String
  }

  type Mutation {
    submitPost(input: PostInput!): Post
    deletePost(id: ID!): Boolean
  }

  input PostInput {
    id: ID
    body: String!
  }
`);

const PEOPLE = new Map();
const POSTS = new Map();

class Post {
  constructor(data) {
    Object.assign(this, data);
  }
  get author() {
    return PEOPLE.get(this.authorId);
  }
}

class Person {
  constructor(data) {
    Object.assign(this, data);
  }
  get posts() {
    return [...POSTS.values()].filter((post) => post.authorId === this.id);
  }
}

// utility functions to use for  mutations above (mocked)
const userIds = {};

const getUserId = (headers) => {
  return PEOPLE.get(headers).id;
};

const saveUser = (firstName, lastName) => {
  let id = Math.random() * 100;

  while (userIds[id]) {
    id = Math.random() * 100;
  }

  userIds[id] = true;
  const user = new Person({ id, firstName, lastName });
  PEOPLE.set(id, user);
  return user;
};

// resolver functions
const rootValue = {
  hello: () => "Hello world",
  posts: () => POSTS.values(),
  post: ({ id }) => POSTS.get(id),
  authors: () => PEOPLE.values(),
  author: ({ id }) => PEOPLE.get(id),
  submitPost: async ({ input }, { headers }) => {
    const authorId = await getUserId(headers);
    if (!authorId) return null;

    const { id = uuid(), body } = input;

    if (POSTS.has(id) && POSTS.get(id).authorId !== authorId) return null;
    await saveUser(authorId);

    POSTS.set(id, new Post({ id, authorId, body }));

    return POSTS.get(id);
  },
  deletePost: async ({ id }, { headers }) => {
    if (!POSTS.has(id)) return false;

    const userId = await getUserId(headers);
    if (POSTS.get(id).authorId !== userId) return false;

    POSTS.delete(id);

    if (PEOPLE.get(userId).posts.length === 0) {
      PEOPLE.delete(userId);
    }

    return true;
  },
};

const initializeData = () => {
  const fakePeople = [
    { id: "1", firstName: "John", lastName: "Doe" },
    { id: "2", firstName: "Jane", lastName: "Doe" },
  ];

  fakePeople.forEach((person) => PEOPLE.set(person.id, new Person(person)));

  const fakePosts = [
    { id: "1", authorId: "1", body: "Hello world" },
    { id: "2", authorId: "2", body: "Hi, planet!" },
  ];

  fakePosts.forEach((post) => POSTS.set(post.id, new Post(post)));
};

initializeData();

app.use("/graphql", graphqlHTTP({ schema, rootValue }));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("GraphQL server at localhost:/${port}/graphql");
});
