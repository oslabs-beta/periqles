/* eslint-disable no-lone-blocks */
import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import app from '../__mocks__/mockServer'
import {
  render,
  screen,
  fireEvent,
  waitForElement,
  waitFor,
  findByRole,
  getByRole,
  getByText,
  getByLabelText,
} from '@testing-library/react';
// import '../setupTnoests';
import '@testing-library/jest-dom/extend-expect';
import {createMockEnvironment, MockPayloadGenerator} from 'relay-test-utils'
import {graphql} from 'react-relay';


//const { introspect } = require('../../src/functions.tsx');

//components to test
import PeriqlesForm from '../src/PeriqlesForm.tsx';
// // import UserProfile from '../ts/components/UserProfile.tsx';
// import PeriqlesField from '../src/PeriqlesField.tsx'

// //React Component Tests

const props = {
  environment: createMockEnvironment(),
  mutationName: 'AddUser',
  mutationGQL: "mutationGQL",
};

const specifications = {
  header: 'Sign Up',
  fields: {
    gender: {
      element: 'radio',
      label: 'Gender',
      options: [
        {label: 'Non-binary', value: 'NON_BINARY'},
        {label: 'Male', value: 'MALE'},
        {label: 'Female', value: 'FEMALE'},
      ],
    },
  },
};

//PeriqlesForm Tests
describe('Periqles Test', () => {
  it('Should render a Form with the class of PeriqlesForm', () => {
    const {container} = render(<PeriqlesForm {...props} />);
    expect(container.querySelector('form')).toBeInTheDocument()
    expect(container.querySelector('form').getAttribute('class')).toBe('PeriqlesForm')
  });

  it('Should render "Loading form..." if introspection is pending/unsuccessful', async () => {
    const {getByText} = render(<PeriqlesForm {...props}/>)
     await waitFor(() => {
       expect(getByText('Loading form...')).toBeInTheDocument()
     })
  });
  
  it('Should render form inputs if introspection is successful', async () => {
    const {getByText, getByRole} = render(<PeriqlesForm {...props}/>)
     await waitFor(() => {
       expect(getByText('Pizza Topping')).toBeInTheDocument()
       expect(getByRole('combobox')).toBeInTheDocument()
     })
  });
 
  it('Should render a form with a select tag and options if the passed in mutation has an ofType kind of Enum', async () => {
    const {getByText, getByRole} = render(<PeriqlesForm {...props}/>)
     await waitFor(() => {
       expect(getByText('Pizza Topping')).toBeInTheDocument()
       expect(getByRole('combobox')).toBeInTheDocument()
       screen.debug()
     })
})

//   it('Should trigger a callback when the form is submitted ', async () => {

//     const mutationGQL = graphql`
//                         mutation UserProfile_AddUserMutation($input: AddUserInput!) {
//                                   addUser(input: $input) {
//                                   userId
//                                   username
//                                   password
//                                   email
//                                   gender
//                                   pizzaTopping
//                                   age
//                                 }
//                               }
//                               `

//   const submitProps = {
//     environment: createMockEnvironment(),
//     mutationName: 'AddUser',
//     mutationGQL: mutationGQL,
//   };
  
//   const {getByText, getByRole, container} = render(<PeriqlesForm {...submitProps}/>)
//   const onSubmit = jest.fn()
//    await waitFor(() => {
//      expect(getByText('Pizza Topping')).toBeInTheDocument()
//      fireEvent.submit(container.querySelector('form'))
//      expect(onSubmit).toHaveBeenCalled()
//    })
   
// })

it('Should render a form with a text input if mutation input has a Type of String', async () => {
  const {getByRole} = render(<PeriqlesForm {...props}/>)
   await waitFor(() => {
     expect(getByRole('textbox')).toBeInTheDocument()
   })
})

xit('Should render a form with a number input if mutation input has a Type of Int', async () => {
  const {getByRole} = render(<PeriqlesForm {...props}/>)
   await waitFor(() => {
     expect(getByRole('spinbutton')).toBeInTheDocument()
   })
})

it('Should render a form with a string input if mutation input type is not handled', async () => {
  const {getByRole} = render(<PeriqlesForm {...props}/>)
   await waitFor(() => {
     expect(getByRole('textbox')).toBeInTheDocument()
   })
})

xit('Should render user provided header from specifications prop', async () => {
  const {getByText} = render(<PeriqlesForm {...props} specifications={specifications}/>)
   await waitFor(() => {
     expect(getByText('Sign Up')).toBeInTheDocument()
   })
})

it('Should render user provided inputs from specifications prop', async () => {
  const {getByRole} = render(<PeriqlesForm {...props} specifications={specifications}/>)
   await waitFor(() => {
     expect(getByRole('radio')).toBeInTheDocument()
   })
})
  
});




//     // eslint-disable-next-line no-labels
//     it('Should render a form tag with an onSubmit function', () => {
//       // wrapper.find('PeriqlesForm').simulate('submit');
//       // expect(props.handleSubmit).toHaveBeenCalledTimes(1);
//     });

//     // it('Should render a form tag with that calls handleSubmit with the synthetic event and fields as arguments onSubmit', () => {});

//     it('Should render a H2 tag with headerText props', () => {
//       // expect(wrapper.find('h2')).to.have.length(1);
//       // expect(wrapper.find('h2')).text.toEqual(props.headerText);
//     });

//     it('Should be passed a props called field that is an array of input tags', () => {
//       // expect(wrapper.find());
//     });

//     it('Should call the renderFields function if the field prop has a length > 0', () => {});

//     it('Should render multiple input elements if the field prop has a length > 0 ', () => {});

//     it('Should render a p tag with the  "Loading form..." if the field prop has a length > 0', () => {});

//     it('Should render a button with a className of periqles-submit', () => {});

//     it('Should render a button with an onSubmit event handler', () => {});

//     it('Should render a button with that calls the handleSubmit function with the synthetic event and fields as arguments on submit', () => {});

//     it('Should render a p tag with the  "Loading form..." if the field prop has a length > 0', () => {});

//     it('Should render a button with a className of periqles-submit', () => {});

//     it('Should render a button with an onSubmit event handler', () => {});

//     it('Should render a button with that calls the handleSubmit function with the synthetic event and fields as arguments on submit', () => {});

//     it('Should render a button with the text "Submit"', () => {});
//   });
// });


// specifications: ['specifications'],
// args: 'args',
// fields: [ {
//   name: 'email',
//   label: 'email',
//   type: 'string'
// },
// {
//   name: 'age',
//   label: 'age',
//   type: 'Int',
// }],
// callbacks: {
//   onSuccess: () => {},
//   onFailure: () => {},
// },
  // const className: 'PeriqlesForm',
  // const handleSubmit: () => {},
  // fieldNames: [],
  // input: {},
  // variables: {},
  // handleChange: () => {},
  // headerText: 'I am a header',
  // loadingTest: 'Loading form...',
  // fields: ['Fields'],
  // PeriqlesField: {},
  // renderFields: () => {},
  // // className: 'periqles-submit',
  // buttonText: 'Submit',
  // fetch: () => {}
// console.log('This is the App Component: ', App);
// console.log('This is the PF Component: ', PeriqlesForm);
// console.log('This is the UP Component: ', UserProfile);

// describe('App', () => {
//   test('renders App component', () => {
//     render(<App />);
//   });
// });
// export default type
