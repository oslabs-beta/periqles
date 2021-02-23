import * as React from 'react'
import {graphql} from 'react-relay';
import { testSchema } from './testSchema';
import {
  render,
  screen,
  fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { introspect, fieldsArrayGenerator, generateDefaultElement, generateSpecifiedElement} from '../src/functions.tsx'
import ReactDOMServer from 'react-dom/server';
// import {handleChange} from '../src/PeriqlesForm.tsx'

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

// describe('Functions file test', () => {

describe('fieldsArrayGenerator Test', () => {
  const testReturn = fieldsArrayGenerator(testSchema, args)
  // console.log(testReturn);
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

// introspect <--Kelly
// parameters: mutationName, setFields, args
xdescribe('Introspect Test', () => {
  const testMutationName = 'AddUser';
  let testFields = [];
  const testSetFields = (array) => {
  testFields = array.map((x) => x);
  }
  
  introspect(testMutationName, testSetFields, args);

  it('Should make a fetch request to /graphql', () => {
    //how to see fetch request response?
    //if the inputType name isn't found, shouLd get pre-defined error msg
  })
  it('Should update fields state to include input fields from schema ONLY if they are NOT in args', () => {
    console.log('testFields: ', testFields);
    
    const testInputFields = testSchema.inputFields;
    const testField = testFields[0];
    const testFieldName = testField.name;

    expect (Array.isArray(testFields)).toBe(true);
    expect(testFields.length).toBe(testInputFields.length - args.keys.length);
    expect (Array.isArray(testField).toBe(false));
    expect (typeof testField).toBe("object");
    expect (testFieldName).toBe(testInputFields[0].name);
    expect (args.testFieldName).toBe(undefined);
  })
});

// generateDefaultElement
describe('generateDefaultElement Test', () => {
 
 
    
   //INPUTS
    //field
    //formState
    //handleChange
  //OUTPUTS
    //JSX Element
    // const testFields = {
    //   name: "email",
    //   label: "email",
    //   type: "string",
    //   // options?: PeriqlesFieldOption[];
    //   // required?: boolean;
    // }
    // const testFormState = {
    //   email: ''
    // } 
  it('Returns an HTML element with a label tag and input tag', () => {
    const field = {
      name: "email",
      label: "email",
      type: "string",
    }
    const formState = {
      email: ''
    } 
    const handleChange = () => console.log('testing')

    //expect generateDefaultElement(fields, formState, handleChange) to be 
    const returnElement = generateDefaultElement({field, formState, handleChange})
    const {container} = render(returnElement)
    expect(container.querySelector('Label')).toBeInTheDocument()
    expect(container.querySelector('input')).toBeInTheDocument()
    // expect(generateDefaultElement(testFields, testFormState, testHandleChange)).toBe(returnText.element[0])
  })

  it('Returns an input tag with a type of number if the field type is Int', () => {
    const field = {
      name: "number",
      label: "number",
      type: "Int",
    }
    const formState = {
      number: ''
    } 
    const handleChange = () => console.log('testing')
    const returnElement = generateDefaultElement({field, formState, handleChange})
    const {container} = render(returnElement)
    expect(container.querySelector('input').getAttribute('type')).toBe('number')
  })

  it('Returns an input tag with a type of checkbox if the field type is Boolean', () => {
    const field = {
      name: "number",
      label: "number",
      type: "Boolean",
    }
    const formState = {
      number: ''
    } 
    const handleChange = () => console.log('testing')
    const returnElement = generateDefaultElement({field, formState, handleChange})
    const {container} = render(returnElement)
    expect(container.querySelector('input').getAttribute('type')).toBe('checkbox')
    
  })

  it('Returns an select tag if the field type is Enum', () => {
    const field = {
      name: "Pizza Topping",
      label: "Pizza Topping",
      type: "Enum",
      options: [{
          name: 'buffalo chicken',
          label: 'buffalo chicken',
          value: 'buffalo chicken',
          type: 'string'
        }, 
        {
          name: 'buffalo chicken',
          label: 'buffalo chicken',
          value: 'buffalo chicken',
          type: 'string'
        }, 
        {
          name: 'buffalo chicken',
          label: 'buffalo chicken',
          value: 'buffalo chicken',
          type: 'string'
        }]
    }
    const formState = {
      number: 0
    } 
    const handleChange = () => console.log('testing')
    const returnElement = generateDefaultElement({field, formState, handleChange})
    const {container} = render(returnElement)
    expect(container.querySelector('select')).toBeInTheDocument()
  })

  it('Returns a input tag with the corresponding type from the element lookup object if the type property on field is not a Int, Boolean, or Enum', () => {
    const field = {
      name: "email",
      label: "email",
      type: "string",
    }
    const formState = {
      email: ''
    } 
    const handleChange = () => console.log('testing')

    //expect generateDefaultElement(fields, formState, handleChange) to be 
    const returnElement = generateDefaultElement({field, formState, handleChange})
    const {container} = render(returnElement)
    expect(container.querySelector('input').getAttribute('type')).toBe('text')
  })
  //If we have time
  xit('Includes an option tag if the field type is Enum and the options value on the field is greater than 1', () => {
    const field = {
      name: "Pizza Topping",
      label: "Pizza Topping",
      type: "Enum",
      options: [
        {
          name: 'buffalo chicken',
          label: 'buffalo chicken',
          value: 'buffalo chicken',
          type: 'string'
        }, 
        {
          name: 'buffalo chicken',
          label: 'buffalo chicken',
          value: 'buffalo chicken',
          type: 'string'
        }, 
        {
          name: 'buffalo chicken',
          label: 'buffalo chicken',
          value: 'buffalo chicken',
          type: 'string'
        }]
    }
    const formState = {
      number: ''
    } 
    const handleChange = () => console.log('testing')
    const returnElement = generateDefaultElement({field, formState, handleChange})
    const {container} = render(returnElement)
    expect(container.querySelector('option')).toBeInTheDocument()
  })
});

describe('generateSpecifiedElement', () => {
  let field = {
    name: '',
  };
  let specs = {
    element: '',
  };
  const formState = {field: 'value'};
  const handleChange = () => console.log('Handling change');
  const setFormState = ({field, value}) => formState[field] = value;

  const params = {
    field,
    specs,
    formState,
    handleChange,
    setFormState
  };
     
  it('returns the result of invoking specs.render() if that method is present', () => {
    params.specs.render = () => 'custom element';
    const result = generateSpecifiedElement(params);
    expect(result).toBe('custom element');    
  });

  it('generates a label if none is provided in specs', () => {
    params.field = {
      name: 'firstName',
      type: 'string',
      required: false,
    };
    params.specs = {
      element: 'text',
    };
    
    const element = generateSpecifiedElement(params);
    expect(element.type).toBe('label');
    expect(element.props.children[0]).toBe('First Name');
  });
  
  describe('Returns the appropriate input element type based on specs.element', () => {
    it('returns a range input element if specs.element is range', () => {
      params.field = {
        name: 'age',
        type: 'Int',
        required: false,
      };
      params.specs = {
        element: 'range',
      };
      
      const element = generateSpecifiedElement(params);
      expect(element.props.children[0]).toBe('Age');
      expect(element.props.children[1].props.type).toBe('range');
    });

    it('if no range min/max specified, set from 0-Infinity', () => {
      params.field = {
        name: 'age',
        type: 'Int',
        required: false,
      };
      params.specs = {
        element: 'range',
      };
      
      const element = generateSpecifiedElement(params);
      expect(element.props.children[1].props.min).toBe(0);
      expect(element.props.children[1].props.max).toBe(Infinity);
    });

    it('range min/max should equal provided values', () => {
      params.field = {
        name: 'age',
        type: 'Int',
        required: false,
      };
      params.specs = {
        element: 'range',
        min: 1,
        max: 100
      };
      
      const element = generateSpecifiedElement(params);
      expect(element.props.children[1].props.min).toBe(1);
      expect(element.props.children[1].props.max).toBe(100);
    });

    it('returns an image input element if specs.element is image', () => {
      params.field = {
        name: 'profile photo',
        required: false,
      };
      params.specs = {
        element: 'image',
      };
      
      const element = generateSpecifiedElement(params);
      expect(element.props.children[0]).toBe('Profile photo');
      expect(element.props.children[1].props.type).toBe('image');
    });

    it('image source should equal provided value', () => {
      params.field = {
        name: 'profile photo',
        required: false,
      };
      params.specs = {
        element: 'image',
        src: 'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg'
      };
      
      const element = generateSpecifiedElement(params);
      expect(element.props.children[1].props.src).toBe('https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg');
    });

    it('returns a textarea input element if specs.element is textarea', () => {
      params.field = {
        name: 'review',
        required: false,
      };
      params.specs = {
        element: 'textarea',
      };
      
      const element = generateSpecifiedElement(params);
      expect(element.props.children[0]).toBe('Review');
      expect(element.props.children[1].type).toBe('textarea');
    });

    it('returns a text input element as default', () => {
      params.field = {
        name: 'username',
        required: false,
      };
      params.specs = {
        element: null,
      };
      
      const element = generateSpecifiedElement(params);
      expect(element.props.children[0]).toBe('Username');
      expect(element.props.children[1].props.type).toBe('text');
    });
  });

  // TODO: test defaultChecked attribute of radio buttons
  describe('Handles enumerated fields', () => {

    it('returns default text input if field is not enumerated on schema and options are not provided in specs', () => {
      params.field = {
        name: 'gender',
        type: 'String',
      };
      params.specs = {
        element: 'radio',
      };
      
      let element = generateSpecifiedElement(params);
      expect(element).toBeDefined();
      expect(element.props.children[1].props.type).toBe('text');

      params.specs = {
        element: 'select',
      };
      
      element = generateSpecifiedElement(params);
      expect(element).toBeDefined();
      expect(element.props.children[1].props.type).toBe('text');
    });
    
    it('returns radio buttons if specs.element is radio and options are provided on the schema', () => {
      params.field = {
        name: 'gender',
        type: 'Enum',
        options: [
          {
            name: 'NONBINARY',
            label: 'NONBINARY',
            value: 'NONBINARY',
            type: 'String',
          },
          {
            name: 'MALE',
            label: 'MALE',
            value: 'MALE',
            type: 'String',
          },
          {
            name: 'FEMALE',
            label: 'FEMALE',
            value: 'FEMALE',
            type: 'String',
          },
        ]
      };
      params.specs = {
        element: 'radio',
      };
      
      const element = generateSpecifiedElement(params);
      expect(element.type).toBe('div');
      expect(element.props.children[0].type).toBe('label');
      
      const options = element.props.children[1];
      expect(options).toHaveLength(3);
      const oneOption = options[0].props.children[0];
      expect(oneOption.props.type).toBe('radio');
    });

    it('returns radio buttons with the labels provided in specs', () => {
      params.field = {
        name: 'gender',
        type: 'Enum',
        options: [
          {
            name: 'NONBINARY',
            label: 'NONBINARY',
            value: 'NONBINARY',
            type: 'String',
          },
          {
            name: 'MALE',
            label: 'MALE',
            value: 'MALE',
            type: 'String',
          },
          {
            name: 'FEMALE',
            label: 'FEMALE',
            value: 'FEMALE',
            type: 'String',
          },
        ],
      };
      params.specs = {
        element: 'radio',
        options: [
          {
            label: 'nonbinary',
            value: 'NONBINARY',
          },
          {
            label: 'male',
            value: 'MALE',
          },
          {
            label: 'female',
            value: 'FEMALE',
          },
        ]
      };
      
      const element = generateSpecifiedElement(params);
      expect(element.type).toBe('div');
      expect(element.props.children[0].type).toBe('label');

      const options = element.props.children[1];
      // contains an array of 3 children
      expect(options).toHaveLength(3);
      // children are radio buttons
      expect(options[0].props.children[0].props.type).toBe('radio');
      // radio button has correct label
      expect(options[0].props.children[1]).toBe('nonbinary');
    });

    it('returns radio buttons even if field is not marked as enumerated on the schema', () => {
      params.field = {
        name: 'gender',
        type: 'String',
      };
      params.specs = {
        element: 'radio',
        options: [
          {
            label: 'nonbinary',
            value: 'NONBINARY',
          },
          {
            label: 'male',
            value: 'MALE',
          },
          {
            label: 'female',
            value: 'FEMALE',
          },
        ]
      };
      
      const element = generateSpecifiedElement(params);
      expect(element.type).toBe('div');
      expect(element.props.children[0].type).toBe('label');

      const options = element.props.children[1];
      // contains an array of 3 children
      expect(options).toHaveLength(3);
      // children are radio buttons
      expect(options[0].props.children[0].props.type).toBe('radio');
    });
    
    it('returns a select input element if specs.element is select', () => {
      params.field = {
        name: 'gender',
        type: 'Enum',
        options: [
          {
            name: 'NONBINARY',
            label: 'NONBINARY',
            value: 'NONBINARY',
            type: 'String',
          },
          {
            name: 'MALE',
            label: 'MALE',
            value: 'MALE',
            type: 'String',
          },
          {
            name: 'FEMALE',
            label: 'FEMALE',
            value: 'FEMALE',
            type: 'String',
          },
        ],
      };
      params.specs = {
        element: 'select',
        options: [
          {
            label: 'nonbinary',
            value: 'NONBINARY',
          },
          {
            label: 'male',
            value: 'MALE',
          },
          {
            label: 'female',
            value: 'FEMALE',
          },
        ]
      };
      
      const element = generateSpecifiedElement(params);
      expect(element.type).toBe('label');
      expect(element.props.children[1].type).toBe('select');
    });
  });
  
});