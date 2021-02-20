/* eslint-disable no-lone-blocks */
import React from 'react';
import renderer from 'react-test-renderer';
// import react-testing methods
import {
  render,
  fireEvent,
  waitFor,
  screen,
  getByLabelText,
  cleanup,
} from '@testing-library/react';
// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect';
//components to test
import PeriqlesForm from '../ts/components/PeriqlesForm';
import UserProfile from '../ts/components/UserProfile';

//React Component Tests
describe('Periqles unit tests', () => {
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
    headerText: 'I am a header',
    loadingTest: 'Loading form...',
    fields: ['Fields'],
    renderFields: () => {},
    className: 'periqles-submit',
    buttonText: 'Submit',
  };
  afterEach(cleanup);
  //PeriqlesForm  Tests
  describe('PeriqlesForm Tests', () => {
    it('Should render a form tag with a className of PeriqlesForm', () => {
      const {container} = render(<PeriqlesForm {...defaultProps} />);
      const formTag = container.querySelector('form');
      expect(formTag).toBeDefined();
    });

    it('Should render a form tag with an onSubmit function', () => {
      // wrapper.find('PeriqlesForm').simulate('submit');
      // expect(props.handleSubmit).toHaveBeenCalledTimes(1);
    });

    // it('Should render a form tag with that calls handleSubmit with the synthetic event and fields as arguments onSubmit', () => {});

    it('Should render a H2 tag with headerText props', () => {
      // expect(wrapper.find('h2')).to.have.length(1);
      // expect(wrapper.find('h2')).text.toEqual(props.headerText);
    });

    it('Should be passed a props called field that is an array of input tags', () => {
      // expect(wrapper.find());
    });

    it('Should be passed a props called renderFields that is a function that takes a single argument', () => {});

    it('Should call the renderFields function if the field prop has a length > 0', () => {});

    it('Should render multiple input elements if the field prop has a length > 0 ', () => {});

    it('Should render a p tag with the  "Loading form..." if the field prop has a length > 0', () => {});

    it('Should render a button with a className of periqles-submit', () => {});

    it('Should render a button with an onSubmit event handler', () => {});

    it('Should render a button with that calls the handleSubmit function with the synthetic event and fields as arguments on submit', () => {});

    it('Should render a p tag with the  "Loading form..." if the field prop has a length > 0', () => {});

    it('Should render a button with a className of periqles-submit', () => {});

    it('Should render a button with an onSubmit event handler', () => {});

    it('Should render a button with that calls the handleSubmit function with the synthetic event and fields as arguments on submit', () => {});

    it('Should render a button with the text "Submit"', () => {});
  });
});
// PERIQLES FORM COMPONENT FOR REFERENCE
