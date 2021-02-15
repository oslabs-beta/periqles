import express from 'express';
import {graphqlHTTP} from 'express-graphql';
import path from 'path';
// import periqles from 'periqles';
import {schema} from './data/schema/index.js';

const APP_PORT = 3000;

const app = express();

// Serve static resources
app.use('/', express.static(path.resolve(__dirname, 'public')));

// Setup GraphQL endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    pretty: true,
  }),
);

app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});
