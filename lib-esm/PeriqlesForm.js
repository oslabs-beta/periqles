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
import { commitMutation } from 'react-relay';
import '../periqles.css';
var useState = React.useState, useEffect = React.useEffect;
/**
 * Functional component that performs an introspection query then renders PeriqlesField components based on the mutation's defined input type.
 * @param {Object} environment (REQUIRED) The RelayEnvironment instance shared by this application's components, containing the network layer and store.
 * @param {String} mutationName (REQUIRED) The name of a mutation exactly as written on the schema.
 * @param {String|Function} mutationGQL (REQUIRED) A GraphQL mutation string or (if using Relay) a tagged template literal using the graphql`` tag imported from react-relay.
 * @param {Object} specifications Optional parameters to specify the form's appearance and behavior.
 * @param {Object} args Optional arguments to be passed to the mutation as input variables, represented as key-value pairs. Fields represented here will be excluded from the form.
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
        console.log('fieldNames', fieldNames);
        var _loop_1 = function (i) {
            var fieldObj = fields.filter(function (fieldObj) { return fieldObj.name === fieldNames[i]; })[0];
            console.log('this fieldObj:', fieldObj);
            if (fieldObj.required && formState[fieldNames[i]] === '') {
                window.alert("The following field is required: " + fieldObj.label);
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
        return fields.map(function (field, index) {
            var specs = specifications
                ? specifications.fields[field.name]
                : undefined;
            return (React.createElement(PeriqlesField, { key: "Periqles" + mutationName + "Field" + index, field: field, specs: specs, formState: formState, setFormState: setFormState, handleChange: handleChange }));
        });
    };
    var headerText = mutationName
        .replace('Mutation', '')
        .replace(/([a-z])([A-Z])/g, '$1 $2'); // add spaces before capital letters
    headerText = headerText[0].toUpperCase() + headerText.slice(1);
    return (React.createElement("form", { className: "PeriqlesForm", "aria-labelledby": "form", onSubmit: function (e) { return handleSubmit(e, fields); } },
        React.createElement("h2", null, headerText),
        fields.length ? renderFields(fields) : React.createElement("p", null, "Loading form..."),
        React.createElement("button", { className: "periqles-submit", onClick: function (e) { return handleSubmit(e, fields); } }, "Submit")));
};
export default PeriqlesForm;
//# sourceMappingURL=PeriqlesForm.js.map