// We need to be able to query any project's server at its endpoint '/graphql'

// We need to do an introspection query into /.todo/'s schema
// We need to see the response to that query
// We need to be able to look up a field that's listed in the schema and print its data type
  //const IntrospectionQuery = graphql`{
  //   __schema {
  //     types {
  //       name
        // fields
        // kind
        // ofType {
        //     name
        //     kind
  //     }
  //   }
  // }`;
  
// We need to do this in a way where other projects' schemas can be swapped in easily 
  // Read the relay.config.js file for the 'schema' property?
  // Based off the Star Wars example, would be 'schema' exported from data/schema/index.js in this case - how will our library read this automatically?
// Store introspected schema in a variable
// Parse introspection response body for query/mutation name, fields, data types passed into component as props
// We can use Jest to test whether the data types we read off the schema are what we expect