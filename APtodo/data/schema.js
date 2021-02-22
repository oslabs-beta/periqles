import { gql } from 'apollo-server';



const typeDefs = gql`
  type Query {
    demoUser: DemoUser
  }

  type Mutation {
    addUser( 
     input: AddUserInput!): DemoUser
  }

  input AddUserInput {
    username: String!
    password: String!
    email: String!
    gender: GenderEnum!
    pizzaTopping: PizzaToppingEnum!
    age: Int!
  }

  type DemoUser {
    id: ID!
    userId: String!
    username: String!
    password: String!
    email: String!
    gender: GenderEnum!
    pizzaTopping: PizzaToppingEnum!
    age: Int!
  }

  enum GenderEnum {
    NON_BINARY
    FEMALE
    MALE
  }
  
  enum PizzaToppingEnum {
    BUFFALO_CHICKEN
    PEPPERONI
    MEATLOVERS
    EGGPLANT_PARM
    OLIVES
    HAWAIIAN
  }
`;

export default typeDefs;
