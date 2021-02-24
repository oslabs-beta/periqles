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

//const { introspect } = require('../../src/functions.tsx');

//components to test
import PeriqlesForm from '../src/PeriqlesForm.tsx';
// import UserProfile from '../ts/components/UserProfile.tsx';
import PeriqlesField from '../src/PeriqlesField.tsx'

// //React Component Tests
const props = {
  environment: 'modernEnvironment',
  mutationName: 'AddUser',
  mutationGQL: 'mutationGQL',
};

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

//PeriqlesForm Tests
describe('Periqles Test', () => {
  xit('Should render a Form with the class of PeriqlesForm', () => {
    const {container} = render(<PeriqlesForm {...props} />);
    expect(container.querySelector('form')).toBeInTheDocument()
    expect(container.querySelector('form').getAttribute('class')).toBe('PeriqlesForm')

    // screen.debug()
  });

xit('Should return the correct PeriqlesField when renderFields is passed in a fields argument', () => {
    const fields = [
      {
        name: 'email',
        label: 'email',
        type: 'string'
      },
      {
        name: 'age',
        label: 'age',
        type: 'Int',
      }
    ]
    // render(PeriqlesForm.renderFields(fields));
    // console.log(PeriqlesForm.renderFields(fields));
    // screen.debug()
  });

  it('Should render form inputs if introspection is successful', async () => {
    // let container;
    const {getByText, getByRole} = render(<PeriqlesForm {...props}/>)
     await waitFor(() => {
       expect(getByText('Pizza Topping')).toBeInTheDocument()
       expect(getByRole('combobox')).toBeInTheDocument()

        // const {container} = render(<PeriqlesForm {...props}/>)
        // expect(container.querySelector('select')).toBeInTheDocument()
        // container = render(<PeriqlesForm {...props} />)    
     })
    //  const {container} = render(<PeriqlesForm {...props}/>)
    //  expect(container.querySelector('select')).toBeInTheDocument()
     
    // container = render(<PeriqlesForm {...props} />)    
  });

  
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
// // PERIQLES FORM COMPONENT FOR REFERENCE
