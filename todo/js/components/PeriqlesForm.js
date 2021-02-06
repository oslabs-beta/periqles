import React, {useState} from 'react';

function periqlesFormWrapper (schema, environment){

// accepts a Relay mutation and optional specifications as props
const PeriqlesForm = ({mutations, specifications}) => {  
  // console.log('PeriqlesForm component successfully imported');
  console.log('PeriqlesForm is using this schema: ', schema);

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
    const [value, set] = useState(null);   
    formState[field.name] = {              
      value: initialValue,
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
    console.log(formState);
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
                  class = {input.name + '-range'} 
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
                    className = {input.name + '-image'}
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
                  className={input.name + '-radio-option'} 
                  name={input.name} 
                  value={radio.value}/>   
              </label>;
            radioOptions.push(radioInput);
          })
          element = 
            <div className={input.name + '-radio'}>
              {radioOptions}
            </div>
          break;
        // TODO: handle non-null/non-null-default dropdowns
        case 'dropdown':
          const selectOptions = [];
          selectOptions.push(
            <option 
              value={null} 
              className={input.name + '-select-option'} 
              selected>
                {input.name}
            </option>);
          input.options.forEach((option) => {
            selectOptions.push(
              <option 
                value={option.value} 
                className={input.name + '-select-option'}
                >
                  {option.name}
              </option>)
          })
          element = 
            <select 
              className={input.name + '-select'} 
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
                className={input.name + '-textarea'} 
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
                className={input.name + '-input'} 
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

export default periqlesFormWrapper;