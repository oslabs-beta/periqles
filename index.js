/*!
 * periqles
 * Copyright(c) 2021 OS Labs
 * MIT Licensed
 */

'use strict'    // prevent use of undeclared variables

/**
 * Module dependencies. Marking as private means they can only be used here in the scope of this file, and won't appear in VSCode documentation.
 * @private
 */

 import PeriqlesForm from './PeriqlesForm.jsx';

 /**
 * Module exports. Everything below this tag will be available when the module is imported.
 * @public
 */

 module.exports = periqles;
 module.exports = PeriqlesForm;

/**
 * Middleware that allows periqles to access this project's GraphQL schema by sending an introspection query to the /graphql endpoint.
 * @parem {Object} RelayEnvironment
 * @public
 */
const periqles = function(RelayEnvironment) {
  // find out server address
  // use to send introspection query and receive back schema
  // make schema available to PeriqlesForm.jsx (export)
};


// example from cookie-parser of how to provide documentation for each thing we export (e.g., if dev hovers over an imported function name, it will show tips about the parameters and return value). We'd put one of these info blocks ahead of each thing we're exporting (at the point where it's defined)
/**
 * Parse a signed cookie string, return the decoded value.
 *
 * @param {String} str signed cookie string
 * @param {string|array} secret
 * @return {String} decoded value
 * @public
 */
function signedCookie (str, secret) { //etc }



// We need to be able to query any project's server at its endpoint '/graphql'

// We need to do an introspection query into /.todo/'s schema
// We need to see the response to that query
// We need to be able to look up a field that's listed in the schema and print its data type
  
// const IntrospectionQuery = graphql`{
// __schema {
//   types {
//      name
//      fields {
//          name
//          type{
//            name
//          }
//      }
//      kind
//      ofType {
//          name
//          kind
//      }
//    }
//  }
// }`;

//let IntrospectionRes;

//fetch request w/ IntrospectionQuery:
// fetch('/graphql/', {
//   method: 'POST'
//   headers: {
//    'Content-Type': 'application/json'
//   },
//  body: JSON.stringify(IntrospectionQuery)
// }).then((res) => res.json())
//   .then((data) => {
//     IntrospectionRes = data;
//     console.log('Introspection response: ', IntrospectionRes);
// }).catch((error) => console.log('Error in Introspection Request: ', error));
// }

//modules.export = IntrospectionRes;

//query for queries & mutations separately
//need to get mutation input field types

  
// We need to do this in a way where other projects' schemas can be swapped in easily 
  // Read the relay.config.js file for the 'schema' property?
  // Based off the Star Wars example, would be 'schema' exported from data/schema/index.js in this case - how will our library read this automatically?
// Store introspected schema in a variable
// Parse introspection response body for query/mutation name, fields, data types passed into component as props
// We can use Jest to test whether the data types we read off the schema are what we expect


