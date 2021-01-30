const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const ggl = require("graphql-tag");
const { buildASTSchema } = require("graphql");
const app = express();
const uuid = require("uuid/v4");

app.use(cors());



app.use("/graphql", graphqlHTTP({ schema, rootValue }));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("GraphQL server at localhost:/${port}/graphql");
});
