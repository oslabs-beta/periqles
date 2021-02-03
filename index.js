/*!
 * periqles
 * Copyright(c) 2021 OS Labs
 * MIT Licensed
 */

'use strict'    // prevent use of undeclared variables

import { introspectionQuery } from 'graphql';
/**
 * Module dependencies. Marking as private means they can only be used here in the scope of this file, and won't appear in VSCode documentation.
 * @private
 */

// import PeriqlesForm from './PeriqlesForm.jsx';

/**
 * Gives PeriqlesForm components access to the project's GraphQL schema via an introspection query.
 * @param {Object} RelayEnvironment A RelayEnvironment instance containing a Network Layer and a Store. Used by PeriqlesForm components to commit Relay mutations.
 * @public
 */
const introspect = function(RelayEnvironment) {
  const introspectionQuery = `{
    __schema {
        types {
          name
          fields {
              name
              type {
                name
              }
          }
          kind
          ofType {
              name
              kind
          }
        }
      }
    }`;

  // Shape of response: { data: { __schema: { types: [{ name, fields, kind, ofType }] } }, __proto }
  // The types are stored in an array at data.__schema.types.
  fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: introspectionQuery,
    })
  })
  .then(res => res.json())
  .then(({data}) => console.log('Result of periqles introspection:', data.__schema.types))  
  .catch(err => console.error('ERROR at periqles introspection:', err));

  /** 
   * In-progress work below
   * @private 
   * */

  // We need to do an introspection query into /.todo/'s schema
  // We need to see the response to that query
  // We need to be able to look up a field that's listed in the schema and print its data type
  /*
  const IntroQuery = `{
    __schema {
      queryType {
        fields {
          name
          type{
            name
          }
        }
        kind
        ofType {
          name
          kind
        }
      }
    }
  }`;

  let IntroQueryRes;

  //fetch request w/ IntroQuery - getting all query data:
  fetch('/graphql/', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
  body: JSON.stringify(IntroQuery)
  }).then((res) => res.json())
    .then((data) => {
      IntroQueryRes = data;
      console.log('Introspection response for all queries: ', IntrosQueryRes);
  }).catch((error) => console.log('Error in Introspection Request for queries: ', error));

  const IntroMutation = `{
    __schema {
      mutationType {
        name
        fields {
          name
          args {
            name
            defaultValue
            type{
              kind
              name
            }
          }
          }
        }
      }
    }
  }`;

  // modules.export = IntroQueryRes;
  */
};

const periqles = { introspect };

// Store introspected schema in a variable
// Filter array of types received form introspection query for query/mutation name, fields, data types passed into component as props
// We can use Jest to test whether the data types we read off the schema are what we expect

/**
 * Module exports.
 * @public
 */

export default periqles;
// export PeriqlesForm;