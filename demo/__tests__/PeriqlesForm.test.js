/* eslint-disable no-lone-blocks */
import * as React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitForElement,
} from '@testing-library/react';
// import '../setupTests';
import App from '../testing.jsx';

//components to test
import PeriqlesForm from '../ts/components/PeriqlesForm.tsx';
// import UserProfile from '../ts/components/UserProfile.tsx';
import PeriqlesField from '../ts/components/PeriqlesField.tsx'

// //React Component Tests
const defaultProps = {
  environment: 'modernEnvironment',
  mutationName: 'AddUser',
  mutationGQL: 'mutationGQL',
  specifications: ['specifications'],
  args: 'args',
  callbacks: {
    onSuccess: () => {},
    onFailure: () => {},
  },
  className: 'PeriqlesForm',
  handleSubmit: () => {},
  fieldNames: [],
  input: {},
  variables: {},
  handleChange: () => {},
  headerText: 'I am a header',
  loadingTest: 'Loading form...',
  fields: ['Fields'],
  PeriqlesField: {},
  renderFields: () => {},
  // className: 'periqles-submit',
  buttonText: 'Submit',
  fetch: () => {},
};

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
  it('Should render a form tag with a className of PeriqlesForm', () => {
    // render(<PeriqlesForm {...defaultProps} />);
    const fetch = () => {}
    render(<PeriqlesForm fetch ={fetch} {...defaultProps} />);
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

//     it('Should be passed a props called renderFields that is a function that takes a single argument', () => {});

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
