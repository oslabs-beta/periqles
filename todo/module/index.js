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

import periqlesFormWrapper from './PeriqlesForm.jsx';

/**
 * Gives PeriqlesForm components access to the project's GraphQL schema via an introspection query.
 * @param {Object} RelayEnvironment A RelayEnvironment instance containing a Network Layer and a Store. Used by PeriqlesForm components to commit Relay mutations.
 * @public
 */


const introspect = (RelayEnvironment) => {
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
            type {
              name
              kind
              ofType {
                name
                kind
              }
            }
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
      const typesArray = data.__schema.types || [];
      if (!typesArray.length) {
        throw new Error('ERROR at periqles.introspect: Schema contains no types');
      }

      // convert schema from array to object for faster lookup times within PeriqlesForm
      const schema = {};
      typesArray.forEach(type => {
        schema[type.name] = type;
      });

      // Make our PeriqlesForm component available as a method on periqles with access to schema and environment.
      PeriqlesForm = periqlesFormWrapper(schema, RelayEnvironment);
    })  
    .catch(err => console.error('ERROR at periqles.introspect:', err));
};

/**
 * Default module export.
 * @public
 */

export function PeriqlesForm() { 
  console.error('ERROR: Can\'t instantiate PeriqlesForm before introspection query has finished.'); 
};
const periqles = {introspect};
export default periqles;
