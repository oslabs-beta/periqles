import * as React from 'react';
import {generateDefaultElement, generateSpecifiedElement} from './functions';

const PeriqlesField = ({
  field,
  specs,
  formState,
  setFormState,
  handleChange,
}: PeriqlesFieldProps): JSX.Element => {
  return (specs 
    ? generateSpecifiedElement({
        field,
        specs,
        formState,
        setFormState,
        handleChange,
      }) 
    : generateDefaultElement({
        field, 
        formState, 
        handleChange}));
};

export default PeriqlesField;
