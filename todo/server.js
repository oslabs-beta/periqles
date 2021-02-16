import express from 'express';
import expressGraphql from 'express-graphql';
import path from 'path';
// import periqles from 'periqles';
import {schema} from './data/schema/index.js';
const {graphqlHTTP} = expressGraphql;
// must manually define __dirname b/c it is not included in ES6 modules, only in CommonJS.
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const APP_PORT = 3000;

const app = express();

// Serve static assets
// only needed when in production mode
if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.resolve(__dirname, 'public')));
}

// Set up GraphQL endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    pretty: true,
  }),
);

app.listen(APP_PORT, () => {
  console.log(`Backend server listening at http://localhost:${APP_PORT}`);
});
