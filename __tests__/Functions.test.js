import * as React from 'react'
import {graphql} from 'react-relay';
import testInputObj from '../__mocks__/testInputObj';
import {
  render,
  screen,
  fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { introspect, fieldsArrayGenerator, generateDefaultElement, generateSpecifiedElement} from '../src/functions.tsx'
import ReactDOMServer from 'react-dom/server';

const args = {
  clientMutationId: '0000'
};

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


describe('fieldsArrayGenerator Test', () => {
  const testReturn = fieldsArrayGenerator(testInputObj, args)
  it('It returns an array', () => {
    expect (Array.isArray(testReturn)).toBe(true);
  })
  
  it('Returned array length matches input field array length', () => {
    expect(testReturn.length).toBe(testInputObj.inputFields.length - 1);
  })

  it('Returns objects in an array that match fieldObj', () => {
    const testReturnObj = testReturn[0]
    const testInputField = testInputObj.inputFields[0]
    expect (Array.isArray(testReturnObj)).toBe(false);
    expect (typeof testReturnObj).toBe("object");
    expect (testReturnObj.name).toBe(testInputField.name);
  })

  it('The name value in the fieldObj should not be a property of args', () => {
    const fieldObjName = testReturn[0].name
    expect (args.fieldObjName).toBe(undefined);
  })
})

// generateDefaultElement
describe('generateDefaultElement Test', () => {
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

    const returnElement = generateDefaultElement({field, formState, handleChange})
    const {container} = render(returnElement)
    expect(container.querySelector('Label')).toBeInTheDocument()
    expect(container.querySelector('input')).toBeInTheDocument()
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