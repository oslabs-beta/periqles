/*!
 * periqles
 * Copyright(c) 2021 OS Labs
 * MIT Licensed
 */

'use strict'    // prevent use of undeclared variables

// /**
//  * Module dependencies. Marking as private means they can only be used here in the scope of this file, and won't appear in VSCode documentation.
//  * @private
//  */

import periqlesFormWrapper from './PeriqlesForm.jsx';

/**
 * Gives PeriqlesForm components access to the project's GraphQL schema via an introspection query.
 * @param {Object} RelayEnvironment A RelayEnvironment instance containing a Network Layer and a Store. Used by PeriqlesForm components to commit Relay mutations.
 * @public
 */

// PeriqlesForm is a placeholder method until the introspection query provides PeriqlesForm with a schema and environment.
// let PeriqlesForm = () => console.error('ERROR: Can\'t instantiate PeriqlesForm before introspection query has finished.')

const introspect = (RelayEnvironment) => {
  let schema;   // array of type objects found in introspection

  const introspectionQuery = `{
    __schema {
        types {
          name
          fields {
              name
              type {
                name
                kind
                ofType {
                    name
                    kind
                }
              }
          }
          kind
          inputFields{
            name
          }
          ofType {
              name
              kind
          }
        }
      }
    }`;

  // Shape of response: { data: { __schema: { types: [{ name, fields, kind, ofType }] } }, __proto }
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
  .then(({data}) => {
    schema = data.__schema.types || [];

    if (!schema.length) {
      throw new Error('ERROR at periqles.introspect: Schema contains no types');
    }

    // Make our PeriqlesForm component available as a method on periqles with access to schema and environment.
    periqles.PeriqlesForm = periqlesFormWrapper(schema, RelayEnvironment);
    // console.log(periqlesFormWrapper(schema, RelayEnvironment));
    // console.log('after reassigning:', PeriqlesForm);
    // export const PeriqlesForm  = periqlesFormWrapper(schema, RelayEnvironment);
    // exports.PeriqlesForm = periqlesFormWrapper(schema, RelayEnvironment);
  })  
  .catch(err => console.error('ERROR at periqles.introspect:', err));
};

/**
 * Default module export.
 * @public
 */

// TODO: export in such a way that destructuring PeriqlesForm off of periqles works.
const periqles = {
  introspect,
  PeriqlesForm: () => console.error('ERROR: Can\'t instantiate PeriqlesForm before introspection query has finished.'),
}
export default periqles;



// module.exports = require('./');
// exports.introspect = introspect;

// Store introspected schema in a variable
// Filter array of types received form introspection query for query/mutation name, fields, data types passed into component as props
// We can use Jest to test whether the data types we read off the schema are what we expect