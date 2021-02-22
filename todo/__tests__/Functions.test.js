import * as React from 'react';
import {graphql} from 'react-relay';
import { testSchema } from './testSchema';
import {introspect, fieldsArrayGenerator, generateDefaultElement, generateSpecifiedElement} from '../ts/components/functions'
import {
    render,
    screen,
    fireEvent,
    waitForElement,
  } from '@testing-library/react';

  // fieldsArrayGenerator

const inputObj = testSchema;

const args = {
  'clientMutationId': 000
}

const
periqlesFieldr
[]{
  name: 'email',
  label: 'email',
  value: '',
  type: 'text'
}

const emptyFieldsArray = []
const fieldsArrayWithFieldsObj = [
  {
    name: 'email',
    type: 'string'
  }
]

const fieldObj = {
  name: "pizzaTopping"
}
const emptyOptionsArr = []
const fieldTypeEnumOptionsArr = [
  {
    name: 'string',
    option: 'testOption'
  }
]
const fieldTypeOfTypeEnumOptionsArr = [{
  name: 'boolean',
  option: 'testOption'
}]

const mappedOption = {
  name: 'boolean',
  label: 'boolean',
  value: false,
  type: "boolean"
}
describe('Functions file test', () => {

describe('fieldsArrayGenerator Test', => {
  it('It returns an array', () => {

  })
  
  it('Returned array length matches input field array length', () => {
    
  })

  it('array el names ', () => {
    
  })
})
// introspect
describe('Introspect Test', => {
  it('', () => {

  })
  it('', () => {
    
  })
})

// generateDefaultElement
describe('generateDefaultElement Test', => {
  it('', () => {

  })
  it('', () => {
    
  })
})

// generateSpecifiedElement <-- Cam 
describe('generateSpecifiedElement Test', => {
  it('', () => {

  })
  it('', () => {
    
  })
})

})