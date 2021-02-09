// TODO: Babel compiler isn't finding the graphql tag here. Need to check its config.

import React, {useState} from 'react';
// import {QueryRenderer, graphql} from 'react-relay';
import PeriqlesFormContent from './PeriqlesFormContent.jsx';

/**
 * Wrapper component that performs an introspection query then renders a PeriqlesFormContent component with access to the Relay project's schema and RelayEnvironment.
 * @param {Object} schema (REQUIRED) The GraphQL schema used in this application, provided implicitly by periqles.introspect().
 * @param {Object} environment (REQUIRED) The environment variable for this application, containing the network layer and store. Provided implicitly by periqles.introspect().
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
  // const [introspectionFinished, setIntrospectionFinished] = useState(false);
  const [typeSchema, setTypeSchema] = useState(undefined);
  // let display = <p>Loading form...</p>;

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
        console.log('Input type fetched by PF:', data.__type);
        setTypeSchema(data.__type);
        // setIntrospectionFinished(true);
      });
  };

  introspect();

  // useEffect(() => {
  //   if (typeSchema) {
  //     display = (
  //       <PeriqlesFormContent
  //         environment={environment}
  //         inputType={typeSchema}
  //         mutationName={mutationName}
  //         mutation={mutationGQL}
  //         specifications={specifications}
  //         args={args}
  //       />
  //     );
  //   }
  // });

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
    </div>);

  /*  
  return (
    <QueryRenderer
      environment={environment}
      // add demoUser to query and share with AddUser_demoUser?
      query={graphql`
        query PeriqlesForm_typeQuery($inputType: String!) {
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
                }
              }
            }
          }
        }
      `}
      variables={{
        inputType: inputTypeName,
      }}
      render={({error, props}) => {
        if (props) {
          console.log('Props returned from PF QueryRenderer:', props);
          // if (props && props.type) {
          return (
            <div>
              <PeriqlesFormContent
                environment={environment}
                inputType={props.__type}
                mutationName={mutationName}
                mutation={mutationGQL}
                specifications={specifications}
                args={args}
              />
            </div>
          );
        } else if (error) {
          return <div>{error.message}</div>;
        }

        return <div>Loading</div>;
      }}
    />
  ); */
};

export default PeriqlesForm;

/*
// mock props
  const schema = {name: {name: 'name', type: 'String'}};
const environment = {'networkLayer': 'fake network layer', 'store': 'fake Relay store'};
const mutation = 'AddTodoMutation';
const mutationGQL = `mutation AddTodoMutation($input: AddTodoInput) { }`
const specifications = {
    fields: {
        name: {
            label: "Name",
            element: "text",
        },
        gender: {
            label: "Gender",
            element: "radio",
            options: [
              {label: "male", value: "m"},
              {label:"female", value: "f"},
              {label: "non-binary", value: "x"},
            ],
        }
    },
};
*/

/*FORM VAILDATION NOTES:
      https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#what_is_form_validation
      -input type tags generally have built-in validation
      -required tag: eg. <input type="text" id="username" name="username" required></input>
      -input type tell can specify a pattern: <input type="tel" id="phone" name="phone" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required></input>
        */
