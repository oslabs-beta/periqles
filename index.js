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

import generatePeriqlesForm from './PeriqlesForm.jsx';

/**
 * Gives PeriqlesForm components access to the project's GraphQL schema via an introspection query.
 * @param {Object} RelayEnvironment A RelayEnvironment instance containing a Network Layer and a Store. Used by PeriqlesForm components to commit Relay mutations.
 * @public
 */

const introspect = function(RelayEnvironment) {
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
  .then(({data}) => {
    schema = data.__schema.types || [];

    if (!schema.length) {
      throw new Error('ERROR at periqles.introspect: Schema contains no types');
    }

    // return {schema, RelayEnvironment};
    // return schema;    

    // After introspection, make our PeriqlesForm available as a method on periqles.
    const PeriqlesForm = generatePeriqlesForm({schema, RelayEnvironment});
    periqles.PeriqlesForm = PeriqlesForm;
  })  
  .catch(err => console.error('ERROR at periqles introspection:', err));
};

// const PeriqlesForm = generatePeriqlesForm({schema, environment});
// const periqles = { introspect, PeriqlesForm };

/**
 * Default module export.
 * @public
 */

const periqles = {introspect};
export default periqles;

// Store introspected schema in a variable
// Filter array of types received form introspection query for query/mutation name, fields, data types passed into component as props
// We can use Jest to test whether the data types we read off the schema are what we expect