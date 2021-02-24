// provide mock
import * as React from 'react'
import {graphql} from 'react-relay';
import { testSchema } from './testSchema';
import {
  render,
  screen,
  fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { generateSpecifiedElement, generateDefaultElement} from '../src/PeriqlesField.tsx'
import ReactDOMServer from 'react-dom/server';

describe('PeriqlesField Test', () => {
  const props = {
    key: '1',
    field: 'field',
    specs: {},
    formState: {},
    setFormState: () => console.log('Testing'),
    handleChange: () => console.log('Testing')
  }
  describe('Calls the right function', () => {
  it('It calls the appropriate function between generateSpecifiedElement and generateDefaultElement', () => {
    //checks if specs was passed in as a prop to PeriqlesField
    // render(<PeriqlesField {...props} />)
    screen.debug()
  })
  })
  
})


