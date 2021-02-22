import React, { useState, useEffect } from 'react';
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
// TODO: parameter types
var PeriqlesForm = function (_a) {
    var environment = _a.environment, mutationName = _a.mutationName, mutationGQL = _a.mutationGQL, specifications = _a.specifications, args = _a.args, callbacks = _a.callbacks;
    var _b = useState({ name: '', inputFields: [] }), typeSchema = _b[0], setTypeSchema = _b[1];
    var introspect = function () {
        var inputTypeName = mutationName + 'Input';
        fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: "query typeQuery($inputType: String!)\n          {\n        __type(name: $inputType) {\n            name\n            inputFields {\n                name\n                enumValues {\n                  name\n                }\n                type {\n                    name\n                    kind\n                    ofType {\n                        name\n                        kind\n                        enumValues {\n                            name\n                            description\n                        }\n                    }\n                  }\n              }\n          }\n        }",
                variables: {
                    inputType: inputTypeName,
                },
            }),
        })
            .then(function (res) { return res.json(); })
            .then(function (_a) {
            var data = _a.data;
            // console.log('Input type fetched by PF:', data.__type);
            setTypeSchema(data.__type);
        });
    };
    useEffect(function () {
        introspect();
    }, []);
    return (React.createElement("div", { className: "PF" }, typeSchema ? (React.createElement(PeriqlesFormContent, { environment: environment, inputType: typeSchema, mutationName: mutationName, mutationGQL: mutationGQL, specifications: specifications, args: args, callbacks: callbacks })) : (React.createElement("p", null, "Loading form..."))));
};
export default PeriqlesForm;
