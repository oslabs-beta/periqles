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
import React, { useState } from 'react';
import { commitMutation } from 'react-relay';
var fieldsArrayGenerator = function (inputType, args) {
    if (args === void 0) { args = {}; }
    if (!inputType || !inputType.inputFields) {
        console.error('ERROR at PeriqlesForm: mutation input type is undefined.');
        return [];
    }
    var fieldsArray = [];
    inputType.inputFields.forEach(function (field) {
        var _a, _b, _c, _d;
        // exclude from the form any inputs accounted for by args
        if (args[field.name])
            return;
        var fieldObj = {
            name: field.name,
        };
        //check the field.type.kind to see if the field is NON_NULL (required)
        //if so, set fieldObj.required to true
        fieldObj.required = field.type.kind === 'NON_NULL';
        // the input field is a scalar, nullable type
        if (field.type.name && field.type.kind === 'SCALAR') {
            fieldObj.type = field.type.name;
        }
        // the input field is an enumerated type (whether or not wrapped in a NON_NULL type)
        else if (field.type.kind === 'ENUM' || ((_a = field.type.ofType) === null || _a === void 0 ? void 0 : _a.kind) === 'ENUM') {
            fieldObj.type = 'Enum';
            try {
                var optionsArr = field.type.enumValues || ((_b = field.type.ofType) === null || _b === void 0 ? void 0 : _b.enumValues) || [];
                // provide each option a type property
                fieldObj.options = optionsArr.map(function (option) {
                    var value, type;
                    switch (typeof option.name) {
                        case 'number':
                        case 'bigint':
                            value = option.name;
                            type = 'Int';
                            break;
                        case 'boolean':
                            // stringify booleans b/c HTML typing doesn't allow for boolean value attributes
                            value = "" + option.name;
                            type = 'Boolean';
                            break;
                        default:
                            value = option.name;
                            type = 'String';
                    }
                    var mappedOption = {
                        name: "" + option.name,
                        label: "" + option.name,
                        value: value,
                        type: type,
                    };
                    return mappedOption;
                });
            }
            catch (err) {
                console.error('ERROR at PeriqlesForm: Failure to assign enumerated field.', err);
            }
        }
        // the input field is a scalar wrapped in a NON_NULL type
        else if (((_c = field.type.ofType) === null || _c === void 0 ? void 0 : _c.name) && ((_d = field.type.ofType) === null || _d === void 0 ? void 0 : _d.kind) === 'SCALAR') {
            // TODO
            fieldObj.type = field.type.ofType.name;
        }
        // TODO: the input field is not a scalar or enum type
        else {
            console.warn("The '" + field.name + "' input field is of a complex type not currently supported by PeriqlesForm. It will default to a 'String'. Type:", field);
            fieldObj.type = 'String';
        }
        fieldsArray.push(fieldObj);
    });
    return fieldsArray;
};
/**
 * A functional component with input fields corresponding to the input fields of a Relay mutation.
 * @param {String} mutationName (REQUIRED) The name of a mutation exactly as written on the Relay schema.
 * @param {String} mutationGQL (REQUIRED) The GraphQL query string representing the mutation.
 * @param {Object} specifications Optional parameters to specify the form's elements.
 * @param {[Object]} args Optional input values for the mutation, represented as objects with the shape {[nameOfInputField]: value}. Input fields represented here will not be represented on the form.
 * @return HTML
 */
var PeriqlesFormContent = function (_a) {
    var environment = _a.environment, mutationName = _a.mutationName, mutationGQL = _a.mutationGQL, _b = _a.specifications, specifications = _b === void 0 ? { fields: {} } : _b, _c = _a.args, args = _c === void 0 ? {} : _c, inputType = _a.inputType, callbacks = _a.callbacks;
    if (!inputType || !inputType.inputFields) {
        console.error('ERROR at PeriqlesForm: mutation input type is undefined.');
        return React.createElement("p", null, "! ERROR !");
    }
    // STATE
    // intuit input fields from mutation's input type schema
    var fields = fieldsArrayGenerator(inputType, args);
    // assign an initial state for each field that reflects its data type
    var initialState = {};
    fields.forEach(function (field) {
        var initialValue;
        switch (field.type) {
            case 'String':
                initialValue = '';
                break;
            case 'Int':
                initialValue = 0;
                break;
            case 'Boolean':
                initialValue = false;
                break;
            case 'Enum':
                if (!field.options) {
                    initialValue = '';
                }
                else
                    initialValue = field.options[0].name;
                break;
            default:
                initialValue = '';
        }
        // add this initial value to initialState
        initialState[field.name] = initialValue;
    });
    var _d = useState(initialState), formState = _d[0], setFormState = _d[1]; // shape: { nameOfField: valueOfField }
    // HANDLERS
    /**
     * @param {object} Event
     */
    var handleSubmit = function (e) {
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
                setFormState(initialState);
            },
            onError: function (err) {
                if (callbacks === null || callbacks === void 0 ? void 0 : callbacks.onFailure)
                    callbacks.onFailure(err);
            },
        });
    };
    var handleChange = function (e) {
        var _a;
        var _b = e.target, name = _b.name, value = _b.value, type = _b.type;
        var useValue = value;
        // type-coerce values from number input elements before storing in state
        if (type === 'number') {
            useValue = useValue - 0;
        }
        setFormState(__assign(__assign({}, formState), (_a = {}, _a[name] = useValue, _a)));
    };
    // HELPER FUNCTIONS
    /**
     * Builds an HTML element to collect user input for a GraphQL mutation based on user-provided instructions.
     * @param {Object} field An object representing an input field for a GraphQL mutation. Example: {name: "name", type: "String"}
     * @param {Object} specs An object representing developer-specified information to use for an HTML element representing this field. Example: {label: "Name", element: "textarea", options: []}
     * @return  Returns the specified HTML input element with the specified label and specified sub-options, if any.
     */
    var generateSpecifiedElement = function (field, specs) {
        var _a, _b;
        var element;
        //If label isn't given, set it as field.name w/ spaces & 1st letter capitalized
        if (!specs.label) {
            specs.label = field.name.replace(/([a-z])([A-Z])/g, '$1 $2');
            specs.label = specs.label[0].toUpperCase() + specs.label.slice(1);
        }
        if (specs.render) {
            element = specs.render(formState, setFormState, handleChange);
            return element;
        }
        switch (specs.element) {
            case 'range':
                element = (React.createElement("label", null,
                    specs.label,
                    React.createElement("input", { type: "range", className: field.name + '-range periqles-range', name: field.name, min: specs.min || 0, max: specs.max || Infinity, value: formState[field.name], onChange: handleChange })));
                break;
            case 'image':
                element = (React.createElement("label", null,
                    specs.label,
                    React.createElement("input", { type: "image", className: field.name + '-image periqles-image', name: field.name, src: specs.src, alt: specs.label, value: formState[field.name], onChange: handleChange })));
                break;
            case 'radio':
                // TODO: same logic as select options
                //if options aren't given, use field.options
                var radioOptions_1 = [];
                if (specs.options) {
                    specs.options.forEach(function (spec) {
                        var _a;
                        var name, type;
                        (_a = field.options) === null || _a === void 0 ? void 0 : _a.forEach(function (option) {
                            if (option.label === spec.label) {
                                name = option.name;
                                type = option.type;
                            }
                        });
                        var newOption = {
                            name: name,
                            label: spec.label,
                            value: spec.value,
                            type: type,
                        };
                        radioOptions_1.push(newOption);
                    });
                }
                else
                    (_a = field.options) === null || _a === void 0 ? void 0 : _a.forEach(function (option) { return radioOptions_1.push(option); });
                element = (React.createElement("div", { className: field.name + '-radio periqles-radio', value: formState[field.name], onChange: handleChange },
                    React.createElement("label", { className: "periqles-radio-div-label" }, specs.label),
                    radioOptions_1.map(function (option, index) {
                        return (React.createElement("label", { className: "periqles-radio-option-label" },
                            React.createElement("input", { key: "" + mutationName + field.name + "radio" + index, type: "radio", name: field.name, className: field.name + '-radio-option periqles-radio-option', value: option.value, 
                                // dynamically set initial "checked" attribute based on whether this option's value matches the div's value
                                defaultChecked: option.value === formState[field.name] }),
                            option.label));
                    })));
                break;
            // TODO: handle non-null/non-null-default selects
            case 'select':
                var selectOptions_1 = [];
                if (specs.options) {
                    specs.options.forEach(function (spec) {
                        var _a;
                        var name, type;
                        (_a = field.options) === null || _a === void 0 ? void 0 : _a.forEach(function (option) {
                            if (option.label === spec.label) {
                                name = option.name;
                                type = option.type;
                            }
                        });
                        var newOption = {
                            name: name,
                            label: spec.label,
                            value: spec.value,
                            type: type,
                        };
                        selectOptions_1.push(newOption);
                    });
                }
                else
                    (_b = field.options) === null || _b === void 0 ? void 0 : _b.forEach(function (option) { return selectOptions_1.push(option); });
                element = (React.createElement("label", null,
                    specs.label,
                    React.createElement("select", { className: field.name + '-select periqles-select', name: field.name, defaultValue: formState[field.name], onChange: handleChange }, selectOptions_1.map(function (option, index) {
                        return (React.createElement("option", { key: "" + mutationName + field.name + "select" + index, value: option.value, className: field.name + '-select-option periqles-select-option' }, option.label));
                    }))));
                break;
            case 'textarea':
                element = (React.createElement("label", null,
                    specs.label,
                    React.createElement("textarea", { className: field.name + '-textarea periqles-textarea', name: field.name, value: formState[field.name], onChange: handleChange })));
                break;
            default:
                var elementType = specs.element || 'text';
                element = (React.createElement("label", null,
                    specs.label,
                    React.createElement("input", { type: elementType, className: field.name + "-" + elementType + " periqles-" + elementType, name: field.name, value: formState[field.name], onChange: handleChange })));
        }
        return element;
    };
    var generateDefaultElement = function (field) {
        var _a;
        // assign a label that matches name but w/ spaces between words and first char uppercased
        field.label = field.name.replace(/([a-z])([A-Z])/g, '$1 $2');
        field.label = field.label[0].toUpperCase() + field.label.slice(1);
        var element;
        switch (field.type) {
            case 'Int':
                element = (React.createElement("label", null,
                    field.label,
                    React.createElement("input", { type: "number", className: field.name + '-number periqles-number', name: field.name, value: formState[field.name], onChange: handleChange })));
                break;
            case 'Boolean':
                element = (React.createElement("label", null,
                    field.label,
                    React.createElement("input", { type: "checkbox", className: field.name + '-checkbox periqles-checkbox', name: field.name, value: formState[field.name], onChange: handleChange })));
                break;
            case 'Enum':
                // TODO: new select options logic
                var selectOptions_2 = [];
                (_a = field.options) === null || _a === void 0 ? void 0 : _a.forEach(function (option) { return selectOptions_2.push(option); });
                element = (React.createElement("label", null,
                    field.label,
                    React.createElement("select", { className: field.name + '-select periqles-select', name: field.name, defaultValue: formState[field.name], onChange: handleChange }, selectOptions_2.map(function (option, index) {
                        return (React.createElement("option", { key: "" + mutationName + field.name + "select" + index, value: option.name, className: field.name + '-select-option periqles-select-option' }, option.name));
                    }))));
                break;
            default:
                var elementLookup = {
                    pass: 'password',
                    password: 'password',
                    color: 'color',
                    colour: 'color',
                    url: 'url',
                    link: 'url',
                    date: 'date',
                    time: 'time',
                    file: 'file',
                    datetime: 'datetime',
                    timestamp: 'datetime',
                    telephone: 'tel',
                    phone: 'tel',
                    mobile: 'tel',
                    phonenumber: 'tel',
                    cell: 'tel',
                };
                var textFieldName = field.name.toLowerCase();
                var elementType = elementLookup[textFieldName] || 'text';
                element = (React.createElement("label", null,
                    field.label,
                    React.createElement("input", { type: elementType, className: field.name + "-" + elementType + " periqles-" + elementType, name: field.name, value: formState[field.name], onChange: handleChange })));
        }
        return element;
    };
    /**
     * By referencing the name of a mutation on a GraphQL schema, generates an HTML element for each field where user input is required. Assumes that if the mutation name takes the form of "<description>Mutation", its corresponding input type will be named "<description>Input".
     * @param {Array} fieldsArray An array of objects representing the names and data types of input fields, deduced from an input type on the GraphQL schema.
     * @param {string} mutationName The name of a GraphQL mutation exactly as it appears on the schema.
     * @param {object} specifications
     * @param {object} args An object whose keys represent the names of mutation input fields to exclude from the form, and whose values provide the value to be used for each variable when the mutation is committed.
     */
    var formBuilder = function (fields) {
        var formElementsArray = [];
        fields.forEach(function (field) {
            if (args[field.name])
                return; // early return
            var element;
            if (specifications.fields[field.name]) {
                element = generateSpecifiedElement(field, specifications.fields[field.name]);
            }
            else {
                element = generateDefaultElement(field);
            }
            formElementsArray.push(element);
        });
        return formElementsArray;
    };
    // ADDITIONAL ELEMENTS AND STYLES
    var headerText = mutationName
        .replace('Mutation', '')
        .replace(/([a-z])([A-Z])/g, '$1 $2'); // add spaces before capital letters
    headerText = headerText[0].toUpperCase() + headerText.slice(1); // capitalize first letter
    return (React.createElement("form", { className: "PeriqlesForm", "aria-labelledby": "form", onSubmit: handleSubmit },
        React.createElement("h2", null, headerText),
        formBuilder(fields),
        React.createElement("button", { className: "periqles-submit", onClick: handleSubmit }, "Submit")));
};
export default PeriqlesFormContent;
/*FORM VAILDATION NOTES:
      https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#what_is_form_validation
      -input type tags generally have built-in validation
      -required tag: eg. <input type="text" id="username" name="username" required></input>
      -input type tell can specify a pattern: <input type="tel" id="phone" name="phone" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required></input>
        */
