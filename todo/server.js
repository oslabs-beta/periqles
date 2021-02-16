import express from 'express';
import expressGraphql from 'express-graphql';
import path from 'path';
import cors from 'cors';
// import periqles from 'periqles';
import {schema} from './data/schema/index.js';
const {graphqlHTTP} = expressGraphql;
// must manually define __dirname b/c it is not included in ES6 modules, only in CommonJS.
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();
var corsOptions = {
  origin: 'http://localhost:8080', // TODO
};

app.use(cors(corsOptions));

// Serve static assets
// only needed when in production mode
if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.resolve(__dirname, 'public')));
  app.use('/dist/', express.static(path.join(__dirname, 'dist')));
}

// Set up GraphQL endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    pretty: true,
  }),
);

//ERROR HANDLING
app.use((err, req, res, next) => {
  const error = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: {
      err: 'A server error occured',
    },
  };
  error.message = err.message;
  if (err.status) error.status = err.status;

  console.log('SERVER ERROR: ', error.message);
  res.status(error.status).send(error.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server listening at http://localhost:${PORT}`);
});
