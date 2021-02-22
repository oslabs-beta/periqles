import * as React from 'react'
import {graphql} from 'react-relay';
import { testSchema } from './testSchema';
import { introspect, fieldsArrayGenerator, generateDefaultElement, generateSpecifiedElement} from '../src/functions.tsx'
import {
    render,
    screen,
    fireEvent,
    waitForElement,
  } from '@testing-library/react';

  // fieldsArrayGenerator

const inputObj = testSchema;

const args = {
  clientMutationId: '0000'
};
//{clientMutationId: '0000'}<-- args from userProfile

const periqlesFieldArray = [{
  name: 'email',
  label: 'email',
  value: '',
  type: 'text'
}];

const emptyFieldsArray = [];
const fieldsArrayWithFieldsObj = [
  {
    name: 'email',
    type: 'string'
  }
];

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
}];

const mappedOption = {
  name: 'boolean',
  label: 'boolean',
  value: false,
  type: "boolean"
};
describe('Functions file test', () => {

describe('fieldsArrayGenerator Test', () => {
  const testReturn = fieldsArrayGenerator(testSchema, args)
  console.log(testReturn);
  it('It returns an array', () => {
    expect (Array.isArray(testReturn)).toBe(true);
  })
  
  it('Returned array length matches input field array length', () => {
    expect(testReturn.length).toBe(testSchema.inputFields.length - 1);
  })

  it('Returns objects in an array that match fieldObj', () => {
    const testReturnObj = testReturn[0]
    const testInputObj = testSchema.inputFields[0]
    expect (Array.isArray(testReturnObj)).toBe(false);
    expect (typeof testReturnObj).toBe("object");
    expect (testReturnObj.name).toBe(testInputObj.name);
  })

  it('The name value in the fieldObj should not be a property of args', () => {
    const fieldObjName = testReturn[0].name
    expect (args.fieldObjName).toBe(undefined);
  })

  //If we have time:
  // xit('Should include a property options on the fieldObj if the field type or ofType has a property of ENUM', () => {
    
  // })
})
// introspect
xdescribe('Introspect Test', () => {
  it('', () => {

  })
  it('', () => {
    
  })
})

// generateDefaultElement
xdescribe('generateDefaultElement Test', () => {
  it('', () => {

  })
  it('', () => {
    
  })
})

// generateSpecifiedElement <-- Cam 
xdescribe('generateSpecifiedElement Test', () => {
  it('', () => {

  })
  it('', () => {
    
  })
})

})