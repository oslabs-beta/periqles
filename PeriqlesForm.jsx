import React, {useState} from 'react';

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
      ],
      id: "radioId",
    },
  ],
};

// invoke with mock props
const PeriqlesForm = PeriqlesFormWrapper(schema, environment);
PeriqlesForm(mutation, specifications);
  
//Wrapper function 
/**
 * Builds a HTML form based on user provided parameters
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
    // STATE
    const formState = {};   //--> { fieldName: { value: valueOfState, set: fnToSetState }};
  
    // HANDLERS
    /**
     * @param {object} Event
     * @param {object} input The form state needed to commit the query or mutation. 
     */
    const handleSubmit = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();   // prevent page refesh 
      }
      
      // TODO: replace with formState
      const input = {'hi': 'hello'};
  
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
      console.log('name and value: ', name, value);
      formState[name].set(value);
    }
  
   
  // desconstruct mutation from props
  // check if specifications were passed in
  
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
        // Assign a piece of state and a setter function for each field
        const [statePiece, setStatePiece] = useState(null);   // locally scoped to this iteration
        formState[input.name] = {    // scoped to entire component
          value: statePiece,
          set: (val) => setStatePiece(val)
        };
  
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
  
  }


//import schema, environment

// import the schema response
// parse through the response body to find the query/mutation & fields passed in as props
// store the relevant data (types & inputs) in a variable

  // is there linked data between different graphql objects?


// possible form types: text box, checkbox, radio, dropdown
  //Complete list of input types:
  // {/* <input type="button">
  // <input type="checkbox">
  // <input type="color">
  // <input type="date">
  // <input type="datetime-local">
  // <input type="email">
  // <input type="file">
  // <input type="hidden">
  // <input type="image">
  // <input type="month">
  // <input type="number">
  // <input type="password">
  // <input type="radio">
  // <input type="range">
  // <input type="reset">
  // <input type="search">
  // <input type="submit">
  // <input type="tel">
  // <input type="text">
  // <input type="time">
  // <input type="url">
  // <input type="week"></input>

/*
 if (input.element === 'text'){
          const textInput = <label>{input.name} <input type ="text" id = {input.id} name ={input.name} onChange={(e) => changeHandler(e, formState[input.name].set)}/> </label>;
          return pForm.push(textInput);
        }
        if (input.element === 'radio'){
          input.options.forEach((radio) => {
            const radioInput = <label><input type = "radio" id = {input.id} name = {input.name} value = {radio} />{radio}</label>;
            return pForm.push(radioInput);
          })
        }
        if (input.element === 'checkbox'){
          const checkInput = <label><input type="checkbox" id={input.id} name={input.name} />{input.name}</label>;
          return pForm.push(checkInput);
        }
        if (input.element === 'dropdown'){
          // let dropSelect = <select name={input.name}>;
          // pForm.push(dropSelect);
          const options = [];
          options.push(<option value={null} selected>{input.name}</option>);
          input.options.forEach((option) => {
            options.push(<option value={option}>{option}</option>)
          })
          // dropSelect = </select>
          return pForm.push(<select name={input.name}>{options}</select>);
        }
        if (input.element === 'password'){
          const passwordInput = <label>{input.name} <input type = "password" id = {input.id} name ={input.name}/></label>;
          pForm.push(passwordInput);
        }
        if (input.element === 'number'){
          const numberInput = <label>{input.name} <input type = "number" id = {input.id} name ={input.name} /></label>;
          pForm.push(numberInput);
        }
        if (input.element === 'date'){
          const dateInput = <label> {input.name}<input type = "date" id = {input.id} name ={input.name} /> </label>;
          pForm.push(dateInput);
        }
        if (input.element === 'email'){
          const emailInput = <label> {input.name}<input type = "email" id = {input.id} name = {input.name}/></label>;
          pForm.push(emailInput);
        }
        if (input.element === 'textarea'){
          const textAreaInput = <label>{input.name}<textarea id = {input.id} name = {input.name}></textarea></label>; 
          pForm.push(textAreaInput);
        }
        if (input.element === 'tel'){
          const telInput = <label>{input.name}<input type ="tel" id = {input.id} name = {input.name}/></label>;
          pForm.push(telInput)
        }
        if (input.element === 'url'){
          const urlInput = <label>{input.name}<input type="url" id = {input.id} name = {input.name}></input></label>; 
          pForm.push(urlInput);
        }
        if (input.element === 'file'){
          const fileInput = <label>{input.name}<input type = "file" id = {input.id} name = {input.name}/></label>
          pForm.push(fileInput)
        }
        if (input.element === 'button'){
          const buttonInput = <label>{input.name}<input type="button" id = {input.id} name = {input.name}></input></label>; 
          pForm.push(buttonInput);
        }
        if (input.element === 'time'){
          const timeInput = <label>{input.name}<input type = "time" id = {input.id} name = {input.name}/></label>
          pForm.push(timeInput)
        }
        if (input.element === 'color'){
          const colorInput = <label>{input.name}<input type="color" id = {input.id} name = {input.name}></input></label>; 
          pForm.push(colorInput);
        }
        if (input.element === 'localDateTime'){
          const localDateTimeInput = <label>{input.name}<input type="localDateTime" id = {input.id} name = {input.name}></input></label>; 
          pForm.push(localDateTimeInput);
        }
*/


    // current possible shape of fields props:
      // fields: [{
      //   name: "gender",
      //   element: "radio",
      //   options: [
      //     {name: "male", value: "m"},
      //     {name:"female", value: "f"},
      //     {name: "prefer not to say", value: "x"}
      //   ]
      // }]

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



  // example mutation invocation?
  /*
  RenameTodoMutation.commit(relay.environment, text, todo);
  */

  // introspection schema to get mock data
  /*

  */

  

  /*FORM VAILDATION NOTES:
      https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#what_is_form_validation
      -input type tags generally have built-in validation
      -required tag: eg. <input type="text" id="username" name="username" required></input>
      -input type tell can specify a pattern: <input type="tel" id="phone" name="phone" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required></input>
        */
  