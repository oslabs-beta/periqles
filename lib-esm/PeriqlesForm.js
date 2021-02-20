var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import PeriqlesField from './PeriqlesField';
import { introspect } from './functions';
// can we avoid having react-relay as a dependency?
import { commitMutation } from 'react-relay';
import '../periqles.css';
var useState = React.useState, useEffect = React.useEffect;
/**
 * Higher-order component that performs an introspection query then returns a form component that renders dynamically based on an introspected input type.
 * @param {Object} environment (REQUIRED) The RelayEnvironment instance shared by this application's components, containing the network layer and store.
 * @param {String} mutationName (REQUIRED) The name of a mutation exactly as written on the Relay schema.
 * @param {String|Object} mutationGQL (REQUIRED) A GraphQˀL mutation string or GraphQLTaggedNode request object.
 * @param {Object} specifications Optional parameters to specify the form's appearance and behavior, including a "fields" property that is an array of objects matching field names to specifed HTML input element types.
 * @param {[Object]} args Optional arguments to be passed to the mutation, represented as an array of objects with the shape {name, value}. Input fields represented here will be excluded from the form.
 * @return {Function} PeriqlesField, a React functional component
 *
 */
var PeriqlesForm = function (_a) {
    var environment = _a.environment, mutationName = _a.mutationName, mutationGQL = _a.mutationGQL, specifications = _a.specifications, _b = _a.args, args = _b === void 0 ? {} : _b, callbacks = _a.callbacks;
    var _c = useState({}), formState = _c[0], setFormState = _c[1];
    var _d = useState([]), fields = _d[0], setFields = _d[1];
    useEffect(function () {
        introspect(mutationName, setFields, args);
    }, [mutationName]);
    // HANDLERS
    var handleSubmit = function (e, fields) {
        if (e.key === 'Enter' || e.type === 'click') {
            e.preventDefault(); // prevent page refesh
        }
        // validate non-null text fields
        var fieldNames = Object.keys(formState);
        var _loop_1 = function (i) {
            var fieldObj = fields.filter(function (fieldObj) { return fieldObj.name === fieldNames[i]; })[0];
            if (fieldObj.required && formState[fieldNames[i]] === '') {
                window.alert("The following field is REQUIRED: " + fieldObj.label);
                return { value: void 0 };
            }
        };
        for (var i = 0; i < fieldNames.length; i += 1) {
            var state_1 = _loop_1(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        var input = __assign(__assign({}, formState), args);
        var variables = {
            input: input,
        };
        commitMutation(environment, {
            mutation: mutationGQL,
            variables: variables,
            onCompleted: function (response, errors) {
                if (callbacks === null || callbacks === void 0 ? void 0 : callbacks.onSuccess)
                    callbacks.onSuccess(response);
                setFormState({});
            },
            onError: function (err) {
                if (callbacks === null || callbacks === void 0 ? void 0 : callbacks.onFailure)
                    callbacks.onFailure(err);
            },
        });
    };
    var handleChange = function (e) {
        var _a;
        console.log('Handling change');
        var _b = e.target, name = _b.name, value = _b.value, type = _b.type;
        var useValue = value;
        // type-coerce values from number input elements before storing in state
        if (type === 'number') {
            useValue -= 0;
        }
        setFormState(__assign(__assign({}, formState), (_a = {}, _a[name] = useValue, _a)));
    };
    var renderFields = function (fields) {
        // add each field to formState
        // const startingValues = {};
        // fields.forEach((field: PeriqlesField) => {
        //   let initialValue;
        //   switch (field.type) {
        //     case 'String':
        //       initialValue = '';
        //       break;
        //     case 'Int':
        //       initialValue = 0;
        //       break;
        //     case 'Boolean':
        //       initialValue = false;
        //       break;
        //     case 'Enum':
        //       if (!field.options) {
        //         initialValue = '';
        //       } else initialValue = field.options[0].name;
        //       break;
        //     default:
        //       initialValue = '';
        //   }
        //   startingValues[field.name] = initialValue;
        // });
        // console.log('Setting initial form state');
        // setFormState(startingValues);    // infinite loop
        return fields.map(function (field, index) {
            var specs = specifications
                ? specifications.fields[field.name]
                : undefined;
            return (React.createElement(PeriqlesField, { key: "Periqles" + mutationName + "Field" + index, field: field, specs: specs, formState: formState, setFormState: setFormState, handleChange: handleChange }));
        });
    };
    var headerText = mutationName
        .replace('Mutation', '') //remove 'Mutation'
        .replace(/([a-z])([A-Z])/g, '$1 $2'); // add spaces before capital letters
    headerText = headerText[0].toUpperCase() + headerText.slice(1); // capitalize first letter
    return (React.createElement("form", { className: "PeriqlesForm", "aria-labelledby": "form", onSubmit: function (e) { return handleSubmit(e, fields); } },
        React.createElement("h2", null, headerText),
        fields.length ? renderFields(fields) : React.createElement("p", null, "Loading form..."),
        React.createElement("button", { className: "periqles-submit", onClick: function (e) { return handleSubmit(e, fields); } }, "Submit")));
};
export default PeriqlesForm;
//# sourceMappingURL=PeriqlesForm.js.map