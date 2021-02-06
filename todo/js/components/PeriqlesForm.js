import React, {useState} from 'react';
import commitMutation from 'react-relay'; // importing the mutation commit fn provided by Relay instead of expecting mutation prop to have a commit() method with params of a certain shape

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
   * @param {String} mutationName (REQUIRED) The name of a mutation as written on the Relay schema.
   * @param {String} mutationGQL (REQUIRED) The GraphQL query string representing the mutation.
   * @param {Object} specifications Optional parameters to specify the form's elements. 
   * @param {[Object]} args Optional input values for the mutation, represented as objects with the shape {[nameOfInputField]: value}. Input fields represented here will not be represented on the form.
   * @return HTML
   */
  const PeriqlesForm = ({mutationName, mutationGQL, specifications, args}) => {  
    // console.log('PeriqlesForm component successfully imported');
    // console.log('PeriqlesForm is using this schema: ', schema);
    // STATE  
    const formState = {};   //--> { fieldName: { value: valueOfState, set: fnToSetState }};

    // mock fields array
    const fields = [{name: 'name', type: 'string'}, {name:'age', type:'number'}, {name:'gender', type:'string'}, {name:'over18', type:'boolean'}];

    fields.forEach((field) => {
      // console.log('field object', field);
      let initialValue;
      switch (field.type) {
        case 'string': 
          initialValue = '';
          break;
        case 'number':
          initialValue = 0;
          break;
        case 'boolean':
          initialValue = false;
          break;
        default:
          initialValue = null;
      }
      // Assign a piece of state and a setter function for each field
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
                    value={formState[input.name].value} 
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
                      value={formState[input.name].value} 
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
                  value={formState[input.name].value} 
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
                  value={formState[input.name].value} 
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