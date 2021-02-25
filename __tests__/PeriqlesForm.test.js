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
import '@testing-library/jest-dom/extend-expect';

//components to test
import PeriqlesForm from '../src/PeriqlesForm.tsx';

// //React Component Tests

const props = {
  environment: 'modernEnvironment',
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

  xit('Should render "Loading form..." if introspection is pending/unsuccessful', async () => {
    const {getByText} = render(<PeriqlesForm {...props}/>)
     await waitFor(() => {
       expect(getByText('Loading form...')).toBeInTheDocument()
     })
  });
  
  it('Should render form inputs if introspection is successful', async () => {
    const {getByText, getAllByRole} = render(<PeriqlesForm {...props}/>)
     await waitFor(() => {
       expect(getByText('Pizza Topping')).toBeInTheDocument()
       expect(getAllByRole('combobox').length).toBeTruthy()
     })
  });
 
  it('Should render a form with a select tag and options if the passed in mutation has an ofType kind of Enum', async () => {
    const {getByText, getAllByRole} = render(<PeriqlesForm {...props}/>)
     await waitFor(() => {
       expect(getByText('Pizza Topping')).toBeInTheDocument()
       expect(getAllByRole('combobox').length).toBeTruthy()
     })
  })

  it('Should render a form with a text input if mutation input has a Type of String', async () => {
    const {getAllByRole} = render(<PeriqlesForm {...props}/>)
    await waitFor(() => {
      expect(getAllByRole('textbox').length).toBeTruthy()
    })
  })

  it('Should render a form with a number input if mutation input has a Type of Int', async () => {
    const {getByRole} = render(<PeriqlesForm {...props}/>)
    await waitFor(() => {
      expect(getByRole('spinbutton')).toBeInTheDocument()
    })
  })

  it('Should render a form with a string input if mutation input type is not handled', async () => {
    const {container} = render(<PeriqlesForm {...props}/>)
    await waitFor(() => {
      let match;
      container.querySelectorAll('input').forEach(input => {
        if (input.getAttribute('name') === 'username'){
          match = input
        }
      })
      expect(match.getAttribute('name')).toBe('username')
      expect(match.getAttribute('type')).toBe('text')
    })
  })

  it('Should render user provided header from specifications prop', async () => {
    const {getByText} = render(<PeriqlesForm {...props} specifications={specifications}/>)
    await waitFor(() => {
      expect(getByText('Sign Up')).toBeInTheDocument()
    })
  })

  it('Should render user provided inputs from specifications prop', async () => {
    const {getAllByRole} = render(<PeriqlesForm {...props} specifications={specifications}/>)
    await waitFor(() => {
      expect(getAllByRole('radio').length).toBeTruthy()
    })
  })
});
