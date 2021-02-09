import React, {useState, useEffect} from 'react';
// import {QueryRenderer, graphql} from 'react-relay';
import PeriqlesFormContent from './PeriqlesFormContent.jsx';

/**
 * Higher-order component that performs an introspection query then returns a form component that renders dynamically based on an introspected input type.
 * @param {Object} environment (REQUIRED) The RelayEnvironment instance shared by this application's components, containing the network layer and store.
 * * @param {String} mutationName (REQUIRED) The name of a mutation exactly as written on the Relay schema.
 * @param {String|Object} mutationGQL (REQUIRED) A GraphQL mutation string or GraphQLTaggedNode request object.
 * @param {Object} specifications Optional parameters to specify the form's appearance and behavior, including a "fields" property that is an array of objects matching field names to specifed HTML input element types.
 * @param {[Object]} args Optional arguments to be passed to the mutation, represented as an array of objects with the shape {name, value}. Input fields represented here will be excluded from the form.
 * @return {Function} PeriqlesFormContent, a React functional component
 *
 */

const PeriqlesForm = ({
  environment,
  mutationName,
  mutationGQL,
  specifications,
  args,
}) => {
  const [typeSchema, setTypeSchema] = useState(undefined);

  const introspect = () => {
    const inputTypeName = mutationName + 'Input';

    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `query typeQuery($inputType: String!)
        {
            __type(name: $inputType) {
                name
                inputFields {
                    name
                    type {
                        name
                        kind
                        ofType {
                            name
                            kind
                            enumValues {
                                name
                            }
                        }
                    }
                }
            }
        }`,
        variables: {
          inputType: inputTypeName,
        },
      }),
    })
      .then((res) => res.json())
      .then(({data}) => {
        // console.log('Input type fetched by PF:', data.__type);
        setTypeSchema(data.__type);
      });
  };

  useEffect(() => {
    introspect();
  }, []);

  return (
    <div className="PF">
      {typeSchema ? (
        <PeriqlesFormContent
          environment={environment}
          inputType={typeSchema}
          mutationName={mutationName}
          mutation={mutationGQL}
          specifications={specifications}
          args={args}
        />
      ) : (
        <p>Loading form...</p>
      )}
    </div>
  );
};

export default PeriqlesForm;