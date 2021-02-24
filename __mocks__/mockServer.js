const express = require('express');
const expressGraphql = require('express-graphql');
const path = require('path');
const cors = require('cors');
const {schema} = require('../__tests__/testSchema.js');
const {graphqlHTTP} = expressGraphql;
// console.log(schema);
const app = express();

app.use(express.json());
app.use(express.urlencoded());


// var corsOptions = {
//   origin: 'http://localhost:8080', // TODO
// };

// app.use(cors(corsOptions));
app.use(cors());

// console.log('checking environment variables', process.env.NODE_ENV);
app.use('*', (req, res, next) => {
  console.log('Incoming request body:', req.body);
  return next();
});


// console.log('assets path', __dirname + path.resolve('/', 'public', '/', 'assets'));
// Serve static assets
app.use(express.static(path.resolve(__dirname, '/', 'public')));

// only needed when in production mode
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === undefined) {
  app.use('/', express.static(path.join(__dirname, 'public/*')));
  app.use('/dist/', express.static(path.join(__dirname, 'dist')));
}

//MOCK INTROSPECTION RESPONSE
const mockResponse = {
  data: {
  __type: {
    name: 'AddUserInput',
    inputFields: [
      {
        name: 'pizzaTopping',
        type: {
          name: null,
          kind: 'NON_NULL',
          ofType: {
            name: 'PizzaToppingEnum',
            kind: 'ENUM',
            enumValues: [
              {
                name: 'BUFFALO_CHICKEN',
              },
              {
                name: 'PEPPERONI',
              },
              {
                name: 'MEATLOVERS',
              },
              {
                name: 'EGGPLANT_PARM',
              },
              {
                name: 'OLIVES',
              },
              {
                name: 'HAWAIIAN',
              },
            ],
          },
        },
      },
      {
        name: 'clientMutationId',
        type: {
          name: 'String',
          kind: 'SCALAR',
          ofType: null,
        },
      },
    ],
  }
}
};





// Set up GraphQL endpoint for POSTs
// app.post(
//   '/graphql',
//   graphqlHTTP({
//     schema: schema,
//     pretty: true,
//   }),
// );

//Mocking the server response 
app.use(
  '/graphql', (req, res) => {
    res.status(200).send(mockResponse)
  }
);

// Send a GET to /graphql to use GraphiQL
// app.get(
//   '/graphql',
//   graphqlHTTP({
//     schema: schema,
//     pretty: true,
//     graphiql: true,
//   }),
// );

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

const PORT = 3005;
app.listen(PORT, () => {
  console.log(`Backend mock server listening on port: ${PORT}`);
});
module.exports = app;