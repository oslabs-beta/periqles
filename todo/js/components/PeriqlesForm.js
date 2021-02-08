import React, {useState} from 'react';
import commitMutation from 'react-relay';
// importing the mutation commit fn provided by Relay instead of expecting mutation prop to have a commit() method with params of a certain shape

/**
 * Wraps the PeriqlesForm component in a closure containing the Relay project's schema and RelayEnvironment.
 * @param {Object} schema (REQUIRED) The GraphQL schema used in this application, provided implicitly by periqles.introspect().  
 * @param {Object} environment (REQUIRED) The environment variable for this application, containing the network layer and store. Provided implicitly by periqles.introspect(). 
 * @return {Function} PeriqlesForm, a React functional component
 * 
 */
 export default function periqlesFormWrapper (schema, environment){

    // HELPER FUNCTIONS
    /**
     * Builds an HTML element to collect user input for a GraphQL mutation based on user-provided instructions.
     * @param {Object} input An object representing an input field for a GraphQL mutation. Example: {name: "name", element: "text"}
     * @param {Object} specs An object representing developer-specified information to use for an HTML element representing this field. Example: {label: "Name", element: "textarea", options: []}
     * @return  Returns the specified HTML input element with the specified label and specified sub-options, if any.
     * 
     */
    const generateSpecifiedElement = (input, specs) => {     
        let element;
        switch (specs.element) {
            case 'range':
                element = 
                    <label>
                    {specs.label}
                    <input type="range"
                        className={input.name + '-range periqles-range'} 
                        name={input.name} 
                        min={specs.min || 0} max={specs.max || Infinity}   
                        value={formState[input.name].value} 
                        onChange={handleChange}
                    />
                    </label>
                    // note: dev may or may not include min and max values in specs; need fallback values to prevent throwing an error
                break;
            case 'image':
                element = 
                    <label>
                    {specs.label}
                        <input type="image"
                            className ={input.name + '-image periqles-image'}
                            name={input.name} 
                            src={specs.src} alt={specs.label} 
                            value={formState[input.name].value} 
                            onChange={handleChange}
                        />
                    </label>
                break;
            // TODO: how to handle state and value of radio buttons?
            case 'radio':
                const radioOptions = [];
                specs.options.forEach((radio) => {
                    const radioInput = 
                        <label>
                            <input 
                                type="radio" 
                                className={input.name + '-radio-option periqles-radio-option'} 
                                name={input.name} 
                                />
                            {specs.label}   
                        </label>;
                    radioOptions.push(radioInput);
                })
                element = 
                    <div className={input.name + '-radio periqles-radio'}
                        value={formState[input.name].value}
                        onChange={handleChange}>
                    {radioOptions}
                    </div>
                break;
            // TODO: handle non-null/non-null-default dropdowns
            case 'dropdown':
                const selectOptions = [];
                selectOptions.push(
                    <option 
                        value={null} 
                        className={input.name + '-select-option periqles-select-option'} 
                        selected
                    >
                    {specs.label}
                    </option>);
                specs.options.forEach((option) => {
                    selectOptions.push(
                    <option 
                        value={option.value} 
                        className={input.name + '-select-option periqles-select-option'}
                        >
                        {option.label}
                    </option>)
                })
                element = 
                    <select 
                        className={input.name + '-select periqles-select'} 
                        name={input.name}
                        defaultValue={null} 
                        onChange={handleChange}
                    >
                    {selectOptions}
                    </select>;
                break;
            case 'textarea':
                element = 
                    <label>{specs.label}
                        <textarea 
                            className={input.name + '-textarea periqles-textarea'} 
                            name={input.name}
                            value={formState[input.name].value} 
                            onChange={handleChange}
                        />
                    </label>; 
                break;
            default:
                element = 
                    <label>{specs.label}
                        <input 
                            type="text"
                            className={input.name + '-input periqles-text'} 
                            name={input.name} 
                            value={formState[input.name].value} 
                            onChange={handleChange}>
                        </input>
                    </label>
        }
    
        return element;
    }

// TODO: use the options property added to enumerated fields
const fieldsArrayGenerator = (mutationName, schema) => {
  const fieldsArray = [];
  const inputName = mutationName + 'Input';
  console.log('Generating field object for this input field:', inputName);
  let inputObj = schema[inputName];

  inputObj.inputFields.forEach((inputField) => {
    if(inputField.type.name === null) {
        // if field type name is null, this field may be a sub-field of another type. Iterate over the types in the schema to find it.
        for (const key in schema) {
            // At each type, check if its fields array includes this field's name.
            if (!schema[key].fields) return; 
            if (!schema[key].fields.includes(inputField.name)) return;

            schema[key].fields.forEach((field) => { 
                if (field.name !== inputField.name) return;
   
                if (field.type.ofType.kind === 'SCALAR'){
                    console.log('This field is a scalar field:', field.name);

                    let fieldObj = {};
                    fieldObj.name = field.name;
                    fieldObj.element = field.type.ofType.name;
                    fieldsArray.push(fieldObj);
                    
                    // inputField.type.name = field.type.ofType.name

                } else if(field.type.kind === 'ENUM') {
                    console.log('This field is an enumerated field:', field.name);
                    let fieldObj = {
                        name: field.name,
                        element: 'Enum',
                        options: {}
                    };

                    // TODO: Populate fieldObj.options. Check out inputFields and other properties of __EnumValue type on schema.
                    /*
                    allTypes.forEach((type)=>{
                        if (field.type.name === type.name) {
                            fieldObj.options = type.enumValues.name; //expecting this to be an object
                        }
                    });
                    */

                    fieldsArray.push(fieldObj);
                } else {
                    console.warn('inputField', inputField.name, 'matches a subfield of the', key, 'schema type, but it is not a scalar or enum type. This field\'s type is:', field.type);  
                }
            });
        } 
    }      
    /*
    } else if (inputField.type.kind == 'OBJECT' || inputField.type.name.type !== null) {
        // TODO: What if input field is not scalar or enum but an object type? E.g., the "todos" field on User is of type TodoConnection. May require a recursive solution because types could be composed of arbitrarily nested objects.
        console.warn('inputField', inputField.name, 'is an object type:', field.type.name, '. Assigning it a placeholder type for now.');     
    } 
    */
    // input field type is not null, ie, scalar
    else {
        console.log('This field\'s type is not null:', inputField.type)
        let fieldObj = {};
        fieldObj.name = inputField.name;
        fieldObj.element = inputField.type.name; 
        fieldsArray.push(fieldObj); 
    }
  });
  
  return fieldsArray;
}


const generateDefaultElement = (fieldObj) => {
    // assign a label that matches name but w/ spaces between words and first char uppercased
    fieldObj.label = fieldObj.name.replace(/([a-z])([A-Z])/g, '$1 $2') 
    fieldObj.label = fieldObj.label[0].toUpperCase() + fieldObj.label.slice(1);
    
    let element;

    switch (fieldObj.element){
      case 'Int':
        element =
          <label>{fieldObj.label}
            <input 
              type='number'
              className={fieldObj.name + '-number periqles-number'} 
              name={fieldObj.name} 
              value={formState[fieldObj.name].value}
              onChange={handleChange}>
            </input>
          </label>;
          break;
        
      case 'Boolean':
        element =
          <label>{fieldObj.label}
            <input 
              type="checkbox"
              className={fieldObj.name + '-checkbox periqles-checkbox'}
              name={fieldObj.name}
              value={formState[fieldObj.name].value}
              onChange={handleChange}>
            </input>
          </label>;
          break;

      case 'Enum':
        const optionsObj = fieldObj.options;
        const selectOptions = [];

        //iterate through the options for the field & make a tag for each option
        for (const option in optionsObj){
          selectOptions.push(
            <option 
              value={option} 
              className={option + '-select-option'} 
            >
              {option}
            </option>
          );
        }
        
        element = 
          <label>{fieldObj.label}
            <select 
              className={fieldObj.name+ '-select'} 
              name={fieldObj.name}
              defaultValue={null} 
              onChange={handleChange}
              >
                {selectOptions}
            </select>
          </label>;
        break;
       default:
          element = 
            <label>{fieldObj.label}
              <input 
                type='text'
                className={fieldObj.name + '-input periqles-text'}
                name={fieldObj.name} 
                value={formState[fieldObj.name].value}
                onChange={handleChange}>
              </input>
            </label>;
            break; 

    } 
  return(element);
}


    /**
     * By referencing the name of a mutation on a GraphQL schema, generates an HTML element for each field where user input is required. Assumes that if the mutation name takes the form of "<description>Mutation", its corresponding input type will be named "<description>Input".
     * @param {Array} fieldsArray An array of objects representing the names and data types of input fields, deduced from an input type on the GraphQL schema.
     * @param {string} mutationName The name of a GraphQL mutation exactly as it appears on the schema.
     * @param {object} specifications
     * @param {object} args An object whose keys represent the names of mutation input fields to exclude from the form, and whose values provide the value to be used for each variable when the mutation is committed. 
     */

    const formBuilder = (fields, specifications, args) => {
      const formElementsArray = [];
      //const fieldsArray = fieldsArrayGenerator(mutationName, schema);
      fields.forEach((fieldObj) => {
        if(args[fieldObj.name]) return;     // early return 

        let element;
        if(specifications.fields[fieldObj.name]){
            element = generateSpecifiedElement(fieldObj, specifications.fields[fieldObj.name]);
        } else {
            element = generateDefaultElement(fieldObj);
        }
        formElementsArray.push(element);           
      });
      return formElementsArray;
    }

  /**
   * A React functional component with input fields corresponding to a Relay mutation.
   * @param {String} mutationName (REQUIRED) The name of a mutation axactly s written on the Relay schema.
   * @param {String} mutationGQL (REQUIRED) The GraphQL query string representing the mutation.
   * @param {Object} specifications Optional parameters to specify the form's elements. 
   * @param {[Object]} args Optional input values for the mutation, represented as objects with the shape {[nameOfInputField]: value}. Input fields represented here will not be represented on the form.
   * @return HTML
   */

  const PeriqlesForm = ({mutationName, mutationGQL, specifications, args}) => {  
    console.log('PeriqlesForm is using this schema: ', schema);

    // STATE  
    const formState = {};   //--> { fieldName: { value: valueOfState, set: fnToSetState }};
    
    // distill input fields from mutation schema
    const fields = fieldsArrayGenerator(mutationName, schema);
    console.log('Generated input fields array:', fields);
    // assign an initial state for each field that reflects its data type
    fields.forEach((field) => {
    //   console.log('field object', field);
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
          initialValue = null;
      }
      // Declare a piece of state and a setter function for each field
      const [value, set] = useState(initialValue);   
      formState[field.name] = {              
        value,
        set
      };
    });
    
    
    // HANDLERS
    /**
     * @param {object} Event
     */
    const handleSubmit = (e) => {
      if (e.key === 'Enter' || e.type === 'click') {
        e.preventDefault();   // prevent page refesh 
      }
      
      // populate $input for mutation
      const input = {
        clientMutationId,      // TODO: How to get this in scope? Is this needed for every commit?
      };
      Object.keys(formState).forEach(key => {
        input[key] = formState[key].value;
      });
      if (args) {
        args.forEach(([key, value]) => {
          input[key] = value;
        });
      }
  
      // Documentation re: shape of commitMutation's second parameter: https://relay.dev/docs/en/mutations#arguments
      // Referencing use of commitMutation in js/mutations/AddTodoMutation
      const variables = {
        input,
      };
      commitMutation(environment, {
        mutationString,       // --> MUST BE A QUERY STRING
        variables,
        onCompleted: (response, errors) => console.log('Server response to mutation:', response, errors),
        onError: (err) => console.error(err)
      });   
    }
      
    /**
     * @param {object} Event
     */
    const handleChange = (e) => {
      const {name, value} = e.target;
      console.log(`${name} field changed its value to: ${value}`);
      formState[name].set(value);
      // console.log('new state:', formState);
    }

    // ADDITIONAL ELEMENTS AND STYLES
    let headerText = mutationName.replace('Mutation', '')                  
                                    .replace(/([a-z])([A-Z])/g, '$1 $2');  // add spaces before capital letters
    headerText = headerText[0].toUpperCase() + headerText.slice(1);        // capitalize first letter                                
    
    return (
        // TODO: Add a handler to div to permit submitting with an "enter" keydown event anywhere inside the div
        <div className="PeriqlesForm"
            aria-labelledby= "form">
            <h2>{headerText}</h2>
            {formBuilder(fields, specifications, args)}
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
    }
    
    return PeriqlesForm;
}


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