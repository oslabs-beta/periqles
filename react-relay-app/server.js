const path = require('path');
const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const ggl = require("graphql-tag");
const { buildASTSchema } = require("graphql");
const app = express();
const uuid = require("uuid/v4");
const { schema } = require('./data/schema/index.js');


app.use(cors());

app.use('/', express.static(path.resolve(__dirname, 'public')));

app.use("/graphql", graphqlHTTP({ 
  schema, 
  pretty: true,      // pretty-print JSON responses   
}));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`GraphQL server at localhost:/${port}/graphql`);
});
