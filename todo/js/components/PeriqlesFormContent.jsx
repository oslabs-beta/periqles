import React, {useState} from 'react';
import {commitMutation} from 'react-relay';

const fieldsArrayGenerator = (inputType, args = []) => {
  if (!inputType || !inputType.inputFields) {
    console.error('ERROR at PeriqlesForm: mutation input type is undefined.');
    return [];
  }
  const fieldsArray = [];
  // exclude from the form any inputs accounted for by args
  const exclude = args.map((arg) => arg.name);
  inputType.inputFields.forEach((field) => {
    if (exclude.includes(field.name)) return;

    const fieldObj = {
      name: field.name,
    };

    // the input field is a scalar, nullable type
    if (field.type.name && field.type.kind === 'SCALAR') {
      fieldObj.type = field.type.name;
    }
    // the input field is an enumerated type (whether or not wrapped in a NON_NULL type)
    else if (field.type.kind === 'ENUM' || field.type.ofType.kind === 'ENUM') {
      fieldObj.type = 'Enum';
      try {
        fieldObj.options =
          field.type.enumValues || field.type.ofType.enumValues || [];
        // provide each option a type property
        fieldObj.options.map((option) => {
          let type;
          switch (typeof option.name) {
            case 'number':
            case 'float':
              type = 'Int';
              break;
            case 'boolean':
              type = 'Boolean';
              break;
            default:
              type = 'String';
          }
          option.type = type;
          return option;
        });
      } catch (err) {
        console.error(
          'ERROR at PeriqlesForm: Failure to assign enumerated field.',
          err,
        );
      }
    }
    // the input field is a scalar wrapped in a NON_NULL type
    else if (field.type.ofType.name && field.type.ofType.kind === 'SCALAR') {
      fieldObj.type = field.type.ofType.name;
    }
    // TODO: the input field is not a scalar or enum type
    else {
      console.warn(
        `The '${field.name}' input field is of a complex type not currently supported by PeriqlesForm. It will default to a 'String'. Type:`,
        field,
      );
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

const PeriqlesFormContent = ({
  setUpdate,
  environment,
  mutationName,
  mutationGQL,
  specifications = {fields: []},
  args = [],
  inputType,
}) => {
  if (!inputType || !inputType.inputFields) {
    console.error('ERROR at PeriqlesForm: mutation input type is undefined.');
    return <p>! ERROR !</p>;
  }
  // STATE
  const formState = {}; //--> { fieldName: { value: valueOfState, set: fnToSetState }};

  // intuit input fields from mutation's input type schema
  const fields = fieldsArrayGenerator(inputType, args);
  // assign an initial state for each field that reflects its data type (called 'element')
  fields.forEach((field) => {
    // console.log('field object', field);
    let initialValue;
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
      default:
        initialValue = '';
    }
    // Declare a piece of state and a setter function for each field
    const [value, set] = useState(initialValue);
    formState[field.name] = {
      value,
      set,
    };
  });

  // HANDLERS
  /**
   * @param {object} Event
   */
  const handleSubmit = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault(); // prevent page refesh
    }

    const input = {
      // clientMutationId,      // TODO: Can we arbitrarily assign this like they do in js/mutations/AddTodoMutation.js?
    };
    Object.keys(formState).forEach((key) => {
      input[key] = formState[key].value;
    });
    if (args) {
      args.forEach(({name, value}) => {
        input[name] = value;
      });
    }

    // console.log(mutationGQL);

    // Documentation re: shape of commitMutation's second parameter: https://relay.dev/docs/en/mutations#arguments
    // Referencing use of commitMutation in js/mutations/AddTodoMutation
    const variables = {
      input,
    };
    commitMutation(environment, {
      mutation: mutationGQL,
      variables,
      onCompleted: (response, errors) => {
        setUpdate(true);
        console.log('Server response to mutation:', response, errors);
      },
      onError: (err) => console.error('Problem committing mutation:', err),
    });
  };

  /**
   * @param {object} Event
   */
  const handleChange = (e) => {
    const {name, value, type} = e.target;
    let useValue = value;
    // type-coerce values from number input elements before storing in state
    // this step necessary to commit mutations involving integer fields
    if (type === 'number') {
      // console.log(`Type-coercing ${name} field`);
      useValue = useValue - 0;
    }
    console.log(`${name} field changed its value to: ${useValue}`);
    formState[name].set(useValue);
  };

  // HELPER FUNCTIONS
  /**
   * Builds an HTML element to collect user input for a GraphQL mutation based on user-provided instructions.
   * @param {Object} field An object representing an input field for a GraphQL mutation. Example: {name: "name", type: "String"}
   * @param {Object} specs An object representing developer-specified information to use for an HTML element representing this field. Example: {label: "Name", element: "textarea", options: []}
   * @return  Returns the specified HTML input element with the specified label and specified sub-options, if any.
   */
  const generateSpecifiedElement = (field, specs) => {
    let element;

    //If label isn't given, set it as field.name w/ spaces & 1st letter capitalized
    if(!specs.label) {
      specs.label = field.name.replace(/([a-z])([A-Z])/g, '$1 $2');
      specs.label = specs.label[0].toUpperCase() + specs.label.slice(1);
    }
    
    switch (specs.element) {
      case 'range':
        element = (
          <label>
            {specs.label}
            <input
              type="range"
              className={field.name + '-range periqles-range'}
              name={field.name}
              min={specs.min || 0}
              max={specs.max || Infinity}
              value={formState[field.name].value}
              onChange={handleChange}
            />
          </label>
        );
        break;
        
      case 'image':
        element = (
          <label>
            {specs.label}
            <input
              type="image"
              className={field.name + '-image periqles-image'}
              name={field.name}
              src={specs.src}
              alt={specs.label}
              value={formState[field.name].value}
              onChange={handleChange}
            />
          </label>
        );
        break;
        
      case 'radio':
        //if options aren't given, use field.options
        const radioOptions = specs.options || field.options;
        element = (
          <div
            className={field.name + '-radio periqles-radio'}
            value={formState[field.name].value}
            onChange={handleChange}>
            <label className="periqles-radio-div-label">{specs.label}</label>
            {radioOptions.map((option) => {
              return (
                <label className="periqles-radio-option-label">
                  <input
                    type="radio"
                    name={field.name}
                    className={field.name + '-radio-option periqles-radio-option'}
                    value={option.value}
                  />
                  {option.label}
                </label>
              );
              })
            }
          </div>
        );
        break;
        
      // TODO: handle non-null/non-null-default selects
      case 'select':
        //if options aren't given, use field.options
        const selectOptions = specs.options || field.options;
        element = (
          <label>
            {specs.label}
            <select
              className={field.name + '-select periqles-select'}
              name={field.name}
              defaultValue={selectOptions[0].value}
              onChange={handleChange}>
              {selectOptions.map((option) => {
                return (<option
                  value={option.value}
                  className={field.name + '-select-option periqles-select-option'}>
                  {option.label}
                </option>)
              })}
            </select>
          </label>
        );
        break;

      case 'textarea':
        element = (
          <label>
            {specs.label}
            <textarea
              className={field.name + '-textarea periqles-textarea'}
              name={field.name}
              value={formState[field.name].value}
              onChange={handleChange}
            />
          </label>
        );
        break;

      default:
        const elementType = specs.element || 'text';

        element = (
          <label>
            {specs.label}
            <input
              type={elementType}
              className={`${field.name}-${elementType} periqles-${elementType}`}
              name={field.name}
              value={formState[field.name].value}
              onChange={handleChange}></input>
          </label>
        ); 
    }

    return element;
  };

  const generateDefaultElement = (field) => {
    // assign a label that matches name but w/ spaces between words and first char uppercased
    field.label = field.name.replace(/([a-z])([A-Z])/g, '$1 $2');
    field.label = field.label[0].toUpperCase() + field.label.slice(1);

    let element;

    switch (field.type) {
      case 'Int':
        element = (
          <label>
            {field.label}
            <input
              type="number"
              className={field.name + '-number periqles-number'}
              name={field.name}
              value={formState[field.name].value}
              onChange={handleChange}></input>
          </label>
        );
        break;

      case 'Boolean':
        element = (
          <label>
            {field.label}
            <input
              type="checkbox"
              className={field.name + '-checkbox periqles-checkbox'}
              name={field.name}
              value={formState[field.name].value}
              onChange={handleChange}></input>
          </label>
        );
        break;

      case 'Enum':
        const selectOptions = field.options;
        element = (
          <label>
            {field.label}
            <select
              className={field.name + '-select periqles-select'}
              name={field.name}
              defaultValue={selectOptions[0].name}
              onChange={handleChange}>
              {selectOptions.map((option) => {
                return (
                  <option
                    value={option.name}
                    className={field.name + '-select-option periqles-select-option'}>
                    {option.name}
                  </option>
                );
              })}
            </select>
          </label>
        );
        break;

      default:
        const elementLookup = {
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
        }
        const textFieldName = field.name.toLowerCase();
        const elementType = elementLookup[textFieldName] || 'text';
        
        element = (
          <label>
            {field.label}
            <input
              type={elementType}
              className={`${field.name}-${elementType} periqles-${elementType}`}
              name={field.name}
              value={formState[field.name].value}
              onChange={handleChange}></input>
          </label>
        ); 
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

  const formBuilder = (fields) => {
    const formElementsArray = [];
    fields.forEach((field) => {
      if (args[field.name]) return; // early return

      let element;
      if (specifications.fields[field.name]) {
        element = generateSpecifiedElement(
          field,
          specifications.fields[field.name],
        );
      } else {
        element = generateDefaultElement(field);
      }
      formElementsArray.push(element);
    });
    return formElementsArray;
  };

  // ADDITIONAL ELEMENTS AND STYLES
  let headerText = mutationName
    .replace('Mutation', '')
    .replace(/([a-z])([A-Z])/g, '$1 $2'); // add spaces before capital letters
  headerText = headerText[0].toUpperCase() + headerText.slice(1); // capitalize first letter

  return (
    <div>
      {/* TODO: Add a handler to div to permit submitting with an "enter" keydown event anywhere inside the div */}
      <div className="PeriqlesForm" aria-labelledby="form">
        <h2>{headerText}</h2>
        {formBuilder(fields)}
        <button className="periqles-submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default PeriqlesFormContent;

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

const args = [
  {name: 'clientMutationId', value: '0000'},
  {name: 'userId', value: 'me'},
];
*/

/*FORM VAILDATION NOTES:
      https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#what_is_form_validation
      -input type tags generally have built-in validation
      -required tag: eg. <input type="text" id="username" name="username" required></input>
      -input type tell can specify a pattern: <input type="tel" id="phone" name="phone" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required></input>
        */


        // case 'time':
      //   element = (
      //     <label>
      //       {specs.label}
      //       <input
      //         type="time"
      //         className={field.name + '-time periqles-time'}
      //         name={field.name}
      //         value={formState[field.name].value}
      //         onChange={handleChange}
      //       />
      //     </label>
      //   );
      //   break;

      // case 'color':
      //   element = (
      //     <label>
      //       {specs.label}
      //       <input
      //         type="color"
      //         className={field.name + '-color periqles-color'}
      //         name={field.name}
      //         value={formState[field.name].value}
      //         onChange={handleChange}
      //       />
      //     </label>
      //   );
      //   break;

      // case 'url':
      //   element = (
      //     <label>
      //       {specs.label}
      //       <input
      //         type="url"
      //         className={field.name + '-url periqles-url'}
      //         name={field.name}
      //         value={formState[field.name].value}
      //         onChange={handleChange}
      //       />
      //     </label>
      //   );
      //   break;

      // case 'tel':
      //   element = (
      //     <label>
      //       {specs.label}
      //       <input
      //         type="tel"
      //         className={field.name + '-tel periqles-tel'}
      //         name={field.name}
      //         value={formState[field.name].value}
      //         onChange={handleChange}
      //       />
      //     </label>
      //   );
      //   break;

      // case 'email':
      //   element = (
      //     <label>
      //       {specs.label}
      //       <input
      //         type="email"
      //         className={field.name + '-email periqles-email'}
      //         name={field.name}
      //         value={formState[field.name].value}
      //         onChange={handleChange}
      //       />
      //     </label>
      //   );
      //   break;

      // case 'password':
      //   element = (
      //     <label>
      //       {specs.label}
      //       <input
      //         type="password"
      //         className={field.name + '-password periqles-password'}
      //         name={field.name}
      //         value={formState[field.name].value}
      //         onChange={handleChange}
      //       />
      //     </label>
      //   );
      //   break;