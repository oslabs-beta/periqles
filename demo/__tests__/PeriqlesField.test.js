// provide mock
import React from 'react'
import PeriqlesField from '../ts/PeriqlesField'
import { testSchema } from './testSchema';
import {introspect, fieldsArrayGenerator, generateDefaultElement, generateSpecifiedElement} from '../ts/components/functions'
import {
    render,
    screen,
    fireEvent,
    waitForElement,
  } from '@testing-library/react';