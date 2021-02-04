import React, {useState} from 'react';

/**
 * Wraps the PeriqlesForm component in a closure containing the Relay project's schema and RelayEnvironment.
 * @param {Object} Schema (REQUIRED) The graphQL schema used in this application  
 * @param {Object} Environment (REQUIRED) - The environment variable for this application containing the network layer and store
 * @return {Function} Returns an inner function PeriqlesForm? that generates a Periqles React form component 
 * 
 */
 export default function periqlesFormWrapper (schema, environment){

  /**
   * A React functional component with input fields corresponding to a Relay mutation.
   * @param {Object} mutation (REQUIRED) The name of a mutation on the Relay schema.
   * @param {Object} specifications Optional parameters to control the composition of the form.
   * @return HTML
   */
  
  // accepts a Relay mutation and optional specifications as props
  const PeriqlesForm = ({mutations, specifications}) => {  
    // console.log('PeriqlesForm component successfully imported');
    // console.log('PeriqlesForm is using this schema: ', schema);

    // STATE
    const formState = {};   //--> { fieldName: { value: valueOfState, set: fnToSetState }};
    // mock fields array
    const fields = [{name: 'name'}, {name:'age'}, {name:'gender'}];
    fields.forEach((field) => {
      // console.log('field object', field);
      // Assign a piece of state and a setter function for each field
      const [value, set] = useState(null);   // locally scoped to this iteration
      formState[field.name] = {              // scoped to entire component
        value,
        set
      };
    });
    
    // HANDLERS
    /**
     * @param {object} Event
     */
    const handleSubmit = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();   // prevent page refesh 
      }
      
      // TODO: replace with formState
      const input = {hi: 'hello'};
  
      mutation.commit(environment, {
        mutation, 
        input,
        onCompleted: (res, errors) => console.log('Server response to mutation:', res, errors),
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
    }
  
    /**
     * Builds a HTML form based on user provided parameters
     * @param {String} mutation (REQUIRED) The name of the graphQL mutation used for the form. Example: 'addTodo'
     * @param {Object} specifications (OPTIONAL) - an object containing fields to use with the form. Example: {fields: [{name: "name", element: "text", id: "textID"}]}
     * @return  Returns a React Component with the generated form 
     * 
     */
    const formBuilder = () => {
      const formElements = [];
      // iterate through specifications to get form fields order & mutation inputs
      specifications.fields.forEach((input) => {
        let element;
        switch (input.element) {
          case 'range':
            element = 
              <label>
                {input.name}
                  <input type = {input.element} 
                    class = {input.name + '-range periqles-range'} 
                    name = {input.name} 
                    min = {input.min} max ={input.max}
                    value={formState[input.name.value]} 
                    onChange={handleChange}
                />
              </label>
            break;
          case 'image':
            element = 
              <label>
                {input.name}
                  <input type = {input.element} 
                      className = {input.name + '-image periqles-image'}
                      name = {input.name} 
                      src = {input.src} alt = {input.name} 
                      value={formState[input.name.value]} 
                      onChange={handleChange}
                  />
              </label>
            break;
          // TODO: how to handle state of radio buttons?
          case 'radio':
            const radioOptions = [];
            input.options.forEach((radio) => {
              const radioInput = 
                <label>
                  <input 
                    type="radio" 
                    className={input.name + '-radio-option periqles-radio-option'} 
                    name={input.name} 
                    value={radio.value}/>   
                </label>;
              radioOptions.push(radioInput);
            })
            element = 
              <div className={input.name + '-radio periqles-radio'}>
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
                selected>
                  {input.name}
              </option>);
            input.options.forEach((option) => {
              selectOptions.push(
                <option 
                  value={option.value} 
                  className={input.name + '-select-option periqles-select-option'}
                  >
                    {option.name}
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
              <label>{input.name}
                <textarea 
                  className={input.name + '-textarea periqles-textarea'} 
                  name={input.name}
                  placeholder={input.name}
                  value={formState[input.name.value]} 
                  onChange={handleChange}
                  />
              </label>; 
            break;
          default:
            element = 
              <label>{input.name}
                <input 
                  type={input.element || 'text'}
                  className={input.name + '-input periqles-text'} 
                  name={input.name} 
                  value={formState[input.name.value]} 
                  placeholder={input.name}
                  onChange={handleChange}>
                </input>
              </label>
        }
  
        formElements.push(element);
      });
  
      return formElements;
    }
  
    return (
      <form className="PeriqlesForm"
            onSubmit={handleSubmit}>
        {formBuilder()}
        <button onClick={handleSubmit}>Submit</button>
      </form>
    )
  }
  
  return PeriqlesForm;
}

/*
// mock props
const schema = [{'name': name, type: 'String'}];
const environment = {'networkLayer': 'fake network layer', 'store': 'fake Relay store'};
const mutation = '';
const specifications = {
  fields: [
    {
      name: "name",
      element: "text",
      id: "textId",
    },
    {
      name: "gender",
      element: "radio",
      options: [
        {name: "male", value: "m"},
        {name:"female", value: "f"},
        {name: "prefer not to say", value: "x"},
    }
  ],
};
*/

//import schema, environment

// import the schema response
// parse through the response body to find the query/mutation & fields passed in as props
// store the relevant data (types & inputs) in a variable

  // is there linked data between different graphql objects?

  // structure form elements in order equal to form structure props, if using custom form
    // each form element must have corresponding event handler to store form values in local state
    // create unique variables and/or hooks per form element?

  // if no custom form fields supplied, check mutation types/inputs to determine default form input type
    // write if logic to check each input type and build corresponding form HTML element
    // each form element must have corresponding event handler to store form values in local state
    // create unique variables and/or hooks per form element?

  // validate user entered data against mutation required input types
  // create event handlers to invoke mutation commit method on user submit
    // handled in a submit button
    // are all mutation commit methods structured the same?
  

  /*FORM VAILDATION NOTES:
      https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#what_is_form_validation
      -input type tags generally have built-in validation
      -required tag: eg. <input type="text" id="username" name="username" required></input>
      -input type tell can specify a pattern: <input type="tel" id="phone" name="phone" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required></input>
        */
  