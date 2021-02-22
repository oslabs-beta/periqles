// require('dotenv').config();
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { getLastDemoUserOrThrow, addUser } from './data/database.js';
import typeDefs from './data/schema.js';
import resolvers from './resolvers.js';

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   database: () => ({
//     getUser: getLastDemoUserOrThrow,
//     addUser: addUser,
//   }),
// });

// server.listen().then(() => {
//   console.log(`
//     Server is running!
//     Listening on port 4000
//     Explore at https://studio.apollographql.com/dev
//   `);
// });

const PORT = 3000;

const app = express();

const apolloEndpoint = '/graphql/apollo';

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, apolloEndpoint });

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`)
)
