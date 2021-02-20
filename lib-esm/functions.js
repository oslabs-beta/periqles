import * as React from 'react';
export var introspect = function (mutationName, setFields, args) {
    var inputTypeName = mutationName + 'Input';
    fetch('/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: "query typeQuery($inputType: String!)\n        {\n      __type(name: $inputType) {\n          name\n          inputFields {\n              name\n              type {\n                  name\n                  kind\n                  ofType {\n                      name\n                      kind\n                      enumValues {\n                          name\n                          description\n                      }\n                  }\n                }\n            }\n        }\n      }",
            variables: {
                inputType: inputTypeName,
            },
        }),
    })
        .then(function (res) { return res.json(); })
        .then(function (_a) {
        var data = _a.data;
        if (!data) {
            return console.error('ERROR at periqles: Failed to introspect. No data received.');
        }
        if (!data.__type) {
            return console.error('ERROR at periqles: Failed to introspect. No __type property on received data.');
        }
        var typeSchema = data.__type;
        // intuit fields off the schema
        var fieldsArr = fieldsArrayGenerator(typeSchema, args);
        setFields(fieldsArr);
    })
        .catch(function (err) {
        console.error('ERROR at periqles: Failed to introspect.', err);
    });
};
export var fieldsArrayGenerator = function (inputType, args) {
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
/* eslint-disable flowtype/no-types-missing-file-annotation */
/**
 * Builds an HTML element to collect user input for a GraphQL mutation based on user-provided instructions.
 * @param {Object} field An object representing an input field for a GraphQL mutation. Example: {name: "name", type: "String"}
 * @param {Object} specs An object representing developer-specified information to use for an HTML element representing this field.
 * @param {Function} handleChange
 * @param {Object} formState
 * @param {Function} setFormState
 * @return  Returns the specified HTML input element with the specified label and specified sub-options, if any.
 */
export var generateSpecifiedElement = function (_a) {
    var field = _a.field, specs = _a.specs, formState = _a.formState, handleChange = _a.handleChange, setFormState = _a.setFormState;
    if (specs.render) {
        return specs.render(formState, setFormState, handleChange);
    }
    //If label isn't given, set it as field.name w/ spaces & 1st letter capitalized
    if (!specs.label) {
        specs.label = field.name.replace(/([a-z])([A-Z])/g, '$1 $2');
        specs.label = specs.label[0].toUpperCase() + specs.label.slice(1);
    }
    switch (specs.element) {
        case 'range':
            return (React.createElement("label", null,
                specs.label,
                React.createElement("input", { type: "range", className: field.name + '-range periqles-range', name: field.name, min: specs.min || 0, max: specs.max || Infinity, value: formState[field.name], onChange: handleChange })));
        case 'image':
            return (React.createElement("label", null,
                specs.label,
                React.createElement("input", { type: "image", className: field.name + '-image periqles-image', name: field.name, src: specs.src, alt: specs.label, value: formState[field.name], onChange: handleChange })));
            break;
        case 'radio':
            if (!field.options || !field.options.length)
                break;
            var radioOptions_1 = [];
            if (specs.options) {
                specs.options.forEach(function (spec) {
                    var _a;
                    (_a = field.options) === null || _a === void 0 ? void 0 : _a.forEach(function (option) {
                        if (option.value === spec.value) {
                            var newOption = {
                                name: option.name,
                                label: spec.label,
                                value: option.value,
                                type: option.type,
                            };
                            return radioOptions_1.push(newOption);
                        }
                    });
                });
            }
            else {
                radioOptions_1 = field.options;
            }
            return (React.createElement("div", { className: field.name + '-radio periqles-radio' },
                React.createElement("label", { className: "periqles-radio-div-label" }, specs.label),
                radioOptions_1.map(function (option, index) {
                    return (React.createElement("label", { key: field.name + "radio-label" + index, className: "periqles-radio-option-label" },
                        React.createElement("input", { key: field.name + "radio-btn" + index, type: "radio", name: field.name, className: field.name + '-radio-option periqles-radio-option', value: option.value, onChange: handleChange, 
                            // dynamically set initial "checked" attribute based on whether this option's value matches the div's value
                            defaultChecked: option.value === formState[field.name] }),
                        option.label));
                })));
        // TODO: handle non-null/non-null-default selects
        case 'select':
            if (!field.options || !field.options.length)
                break;
            var selectOptions_1 = [];
            // if specified options exist for this dropdown, replace default option labels with specified labels. Only include in the dropdown options present in both the specs and the enumerated values introspected from the schema.
            if (specs.options) {
                specs.options.forEach(function (spec) {
                    var _a;
                    (_a = field.options) === null || _a === void 0 ? void 0 : _a.forEach(function (option) {
                        if (option.value === spec.value) {
                            var newOption = {
                                name: option.name,
                                label: spec.label,
                                value: option.value,
                                type: option.type,
                            };
                            return selectOptions_1.push(newOption);
                        }
                    });
                });
            }
            else {
                selectOptions_1 = field.options;
            }
            return (React.createElement("label", null,
                specs.label,
                React.createElement("select", { className: field.name + '-select periqles-select', name: field.name, defaultValue: selectOptions_1[0].value, onChange: handleChange }, selectOptions_1.map(function (option) {
                    return (React.createElement("option", { key: field.name + "select" + option.name + "option", value: option.value, className: field.name + '-select-option periqles-select-option' }, option.label));
                }))));
        case 'textarea':
            return (React.createElement("label", null,
                specs.label,
                React.createElement("textarea", { className: field.name + '-textarea periqles-textarea', name: field.name, value: formState[field.name], onChange: handleChange })));
        default:
            // const elementType: string = specs.element || 'text';
            var elementType = 'text';
            return (React.createElement("label", null,
                specs.label,
                React.createElement("input", { type: elementType, className: field.name + "-" + elementType + " periqles-" + elementType, name: field.name, value: formState[field.name], onChange: handleChange })));
    }
};
/**
 * Builds an HTML element to collect user input for a GraphQL mutation based on default logic.
 * @param {Object} field An object representing an input field for a GraphQL mutation.
 * @param {Object} formState
 * @param {Function} handleChange
 * @return  Returns an HTML input element.
 */
export var generateDefaultElement = function (_a) {
    var field = _a.field, formState = _a.formState, handleChange = _a.handleChange;
    // assign a label that matches name but w/ spaces between words and first char uppercased
    field.label = field.name.replace(/([a-z])([A-Z])/g, '$1 $2');
    field.label = field.label[0].toUpperCase() + field.label.slice(1);
    switch (field.type) {
        case 'Int':
            return (React.createElement("label", null,
                field.label,
                React.createElement("input", { type: "number", className: field.name + '-number periqles-number', name: field.name, value: formState[field.name], onChange: handleChange })));
        // TODO: formState values restricted only to numbers or strings due to HTML input type defs
        case 'Boolean':
            return (React.createElement("label", null,
                field.label,
                React.createElement("input", { type: "checkbox", className: field.name + '-checkbox periqles-checkbox', name: field.name, value: formState[field.name], onChange: handleChange })));
        case 'Enum':
            if (!field.options || !field.options.length)
                break;
            var selectOptions = field.options;
            return (React.createElement("label", null,
                field.label,
                React.createElement("select", { className: field.name + '-select periqles-select', name: field.name, defaultValue: selectOptions[0].value, onChange: handleChange }, selectOptions.map(function (option) {
                    return (React.createElement("option", { key: field.name + "select" + option.name + "option", value: option.value, className: field.name + '-select-option periqles-select-option' }, option.label));
                }))));
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
            return (React.createElement("label", null,
                field.label,
                React.createElement("input", { type: elementType, className: field.name + "-" + elementType + " periqles-" + elementType, name: field.name, value: formState[field.name], onChange: handleChange })));
    }
};
//# sourceMappingURL=functions.js.map