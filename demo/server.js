const express = require('express');
const expressGraphql = require('express-graphql');
const path = require('path');
const cors = require('cors');
// const periqles = require('periqles');
const {schema} = require('./data/schema/index.js');
const {graphqlHTTP} = expressGraphql;

const app = express();
// var corsOptions = {
//   origin: 'http://localhost:8080', // TODO
// };

// app.use(cors(corsOptions));
app.use(cors());

// console.log('checking environment variables', process.env.NODE_ENV);
app.use('*', (req, res, next) => {
  console.log('Incoming request:', req.method);
  return next();
});

// Serve static assets
app.use(express.static(path.join(__dirname, 'public')));

// only needed when in production mode
<<<<<<< HEAD:todo/server.js
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === undefined) {
  app.use('/', express.static(path.join(__dirname, 'public')));
=======
if (
  process.env.NODE_ENV === 'production' ||
  process.env.NODE_ENV === undefined
) {
  app.use('/', express.static(path.resolve(__dirname, 'public')));
>>>>>>> 30aa1a4f5279732b06dcdcbee34dd983dff29f3e:demo/server.js
  app.use('/dist/', express.static(path.join(__dirname, 'dist')));
}

// Set up GraphQL endpoint for POSTs
app.post(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    pretty: true,
  }),
);

// Send a GET to /graphql to use GraphiQL
app.get(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    pretty: true,
    graphiql: true,
  }),
);

app.use(express.json());

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
  console.log(`Backend server listening on port: ${PORT}`);
});
