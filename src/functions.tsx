import * as React from 'react';

export const introspect = (mutationName, setFields, args) => {
  const inputTypeName: string = mutationName + 'Input';

  fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `query typeQuery($inputType: String!)
        {
      __type(name: $inputType) {
          name
          inputFields {
              name
              type {
                  name
                  kind
                  ofType {
                      name
                      kind
                      enumValues {
                          name
                          description
                      }
                  }
                }
            }
        }
      }`,
      variables: {
        inputType: inputTypeName,
      },
    }),
  })
    .then((res) => res.json())
    .then(({data}) => {
      if (!data) {
        return console.error(
          'ERROR at periqles: Failed to introspect. No data received.',
        );
      }
      if (!data.__type) {
        return console.error(
          'ERROR at periqles: Failed to introspect. No __type property on received data.',
        );
      }
      const typeSchema = data.__type;
      // intuit fields off the schema
      const fieldsArr: PeriqlesField[] = fieldsArrayGenerator(typeSchema, args);
      setFields(fieldsArr);
    })
    .catch((err) => {
      console.error('ERROR at periqles: Failed to introspect.', err);
    });
};

export const fieldsArrayGenerator = (
  inputType: InputType,
  args: PeriqlesMutationArgs = {},
): PeriqlesField[] => {
  if (!inputType || !inputType.inputFields) {
    console.error('ERROR at PeriqlesForm: mutation input type is undefined.');
    return [];
  }

  const fieldsArray: Array<PeriqlesField> = [];

  inputType.inputFields.forEach((field) => {
    // exclude from the form any inputs accounted for by args
    if (args[field.name]) return;

    const fieldObj: PeriqlesField = {
      name: field.name,
    };

    //check the field.type.kind to see if the field is NON_NULL (required)
    //if so, set fieldObj.required to true
    fieldObj.required = field.type.kind === 'NON_NULL';

    // the input field is a scalar, nullable type
    if (field.type.name && field.type.kind === 'SCALAR') {
      fieldObj.type = field.type.name;
    }

    // the input field is an enumerated type (whether or not wrapped in a NON_NULL type)
    else if (field.type.kind === 'ENUM' || field.type.ofType?.kind === 'ENUM') {
      fieldObj.type = 'Enum';
      try {
        const optionsArr =
          field.type.enumValues || field.type.ofType?.enumValues || [];
        // provide each option a type property
        fieldObj.options = optionsArr.map((option: EnumValue) => {
          let value, type;

          switch (typeof option.name) {
            case 'number':
            case 'bigint':
              value = option.name;
              type = 'Int';
              break;
            case 'boolean':
              // stringify booleans b/c HTML typing doesn't allow for boolean value attributes
              value = `${option.name}`;
              type = 'Boolean';
              break;
            default:
              value = option.name;
              type = 'String';
          }

          const mappedOption: PeriqlesFieldOption = {
            name: `${option.name}`,
            label: `${option.name}`,
            value,
            type,
          };

          return mappedOption;
        });
      } catch (err) {
        console.error(
          'ERROR at PeriqlesForm: Failure to assign enumerated field.',
          err,
        );
      }
    }
    // the input field is a scalar wrapped in a NON_NULL type
    else if (field.type.ofType?.name && field.type.ofType?.kind === 'SCALAR') {
      // TODO
      fieldObj.type = field.type.ofType.name;
    }
    // TODO: the input field is not a scalar or enum type
    else {
      console.warn(
        `The '${field.name}' input field is of a complex type not currently supported by PeriqlesForm. It will default to a 'String'. Type:`,
        field,
      );
      fieldObj.type = 'String';
    }

    fieldsArray.push(fieldObj);
  });

  return fieldsArray;
};

/* eslint-disable flowtype/no-types-missing-file-annotation */
/**
 * Builds an HTML element to collect user input for a GraphQL mutation based on user-provided instructions.
 * @param {Object} field An object representing an input field for a GraphQL mutation. Example: {name: "name", type: "String"}
 * @param {Object} specs An object representing developer-specified information to use for an HTML element representing this field. 
 * @param {Function} handleChange
 * @param {Object} formState
 * @param {Function} setFormState
 * @return  Returns the specified HTML input element with the specified label and specified sub-options, if any.
 */

export const generateSpecifiedElement: GenerateSpecifiedElement = ({
  field,
  specs,
  formState,
  handleChange,
  setFormState,
}) => {
  if (specs.render) {
    return specs.render({formState, setFormState, handleChange});
  }
  //If label isn't given, set it as field.name w/ spaces & 1st letter capitalized
  if (!specs.label) {
    specs.label = field.name.replace(/([a-z])([A-Z])/g, '$1 $2'); // put spaces before capital letters
    specs.label = specs.label[0].toUpperCase() + specs.label.slice(1);  // capitalize first letter
  }

  switch (specs.element) {
    case 'range':
      return (
        <label>
          {specs.label}
          <input
            type="range"
            className={field.name + '-range periqles-range'}
            name={field.name}
            min={specs.min || 0}
            max={specs.max || Infinity}
            value={formState[field.name]}
            onChange={handleChange}
          />
        </label>
      );

    case 'image':
      return (
        <label>
          {specs.label}
          <input
            type="image"
            className={field.name + '-image periqles-image'}
            name={field.name}
            src={specs.src}
            alt={specs.label}
            value={formState[field.name]}
            onChange={handleChange}
          />
        </label>
      );

    case 'radio':
      if (!specs.options && !field.options) {
        return (<label>
            {specs.label}
            <input
              type="text"
              className={`${field.name}-radio periqles-radio`}
              name={field.name}
              value={formState[field.name]}
              onChange={handleChange}></input>
          </label>);
      }

      let radioOptions: Array<PeriqlesFieldOption> = [];
      if (specs.options && field.options) {
        specs.options.forEach((spec) => {
          field.options?.forEach((option) => {
            if (option.value === spec.value) {
              const newOption: PeriqlesFieldOption = {
                name: option.name,
                label: spec.label,
                value: option.value,
                type: option.type,
              };
              return radioOptions.push(newOption);
            }
          });
        });
      } else if (specs.options && !field.options) {
          // dev can constrain possible inputs on the frontend for fields that are not enumerated on the schema
          specs.options.forEach((spec) => {
            const newOption: PeriqlesFieldOption = {
              name: spec.label,
              label: spec.label,
              value: spec.value,
              type: typeof spec.value,
            };
            radioOptions.push(newOption);
          });
      } else {
        // specs didn't provide options
        radioOptions = field.options;
      }

      return (
        <div className={field.name + '-radio periqles-radio'}>
          <label className="periqles-radio-div-label">{specs.label}</label>
          {radioOptions.map((option, index) => {
            return (
              <label
                key={`${field.name}radio-label${index}`}
                className="periqles-radio-option-label">
                <input
                  key={`${field.name}radio-btn${index}`}
                  type="radio"
                  name={field.name}
                  className={field.name + '-radio-option periqles-radio-option'}
                  value={option.value}
                  onChange={handleChange}
                  // dynamically set initial "checked" attribute based on whether this option's value matches the div's value
                  defaultChecked={option.value === formState[field.name]}
                />
                {option.label}
              </label>
            );
          })}
        </div>
      );

    case 'select':
      if (!specs.options && !field.options) {
        return (<label>
            {specs.label}
            <input
              type="text"
              className={`${field.name}-select periqles-select`}
              name={field.name}
              value={formState[field.name]}
              onChange={handleChange}></input>
          </label>);
      }

      let selectOptions: Array<PeriqlesFieldOption> = [];
      if (specs.options && field.options) {
        specs.options.forEach((spec) => {
          field.options?.forEach((option) => {
            if (option.value === spec.value) {
              const newOption: PeriqlesFieldOption = {
                name: option.name,
                label: spec.label,
                value: option.value,
                type: option.type,
              };
              return selectOptions.push(newOption);
            }
          });
        });
      } else if (specs.options && !field.options) {
        // dev can constrain possible inputs on the frontend for fields that are not enumerated on the schema
        specs.options.forEach((spec) => {
          const newOption: PeriqlesFieldOption = {
            name: spec.label,
            label: spec.label,
            value: spec.value,
            type: typeof spec.value,
          };
          selectOptions.push(newOption);
        });
    } else {
      // specs didn't provide options
      selectOptions = field.options;
    }

      return (
        <label>
          {specs.label}
          <select
            className={field.name + '-select periqles-select'}
            name={field.name}
            // defaultValue={selectOptions[0].value}
            defaultValue={''}
            onChange={handleChange}>
            <option
                key={`${field.name}selectnulloption`}
                value={''}
                className={
                  field.name + '-select-option periqles-select-option'
                }>
                Choose one...
            </option>
            {selectOptions.map((option, index) => {
              return (
                <option
                  key={`${field.name}select${option.name}option${index}`}
                  value={option.value}
                  className={
                    field.name + '-select-option periqles-select-option'
                  }>
                  {option.label}
                </option>
              );
            })}
          </select>
        </label>
      );

    case 'textarea':
      return (
        <label>
          {specs.label}
          <textarea
            className={field.name + '-textarea periqles-textarea'}
            name={field.name}
            value={formState[field.name]}
            onChange={handleChange}
          />
        </label>
      );

    default:
      return (
        <label>
          {specs.label}
          <input
            type="text"
            className={`${field.name}-text periqles-text`}
            name={field.name}
            value={formState[field.name]}
            onChange={handleChange}></input>
        </label>
      );
  }
};

/**
 * Builds an HTML element to collect user input for a GraphQL mutation based on default logic.
 * @param {Object} field An object representing an input field for a GraphQL mutation.
 * @param {Object} formState
 * @param {Function} handleChange
 * @return  Returns an HTML input element.
 */
export const generateDefaultElement: GenerateDefaultElement = ({field, formState, handleChange}) => {
  // assign a label that matches name but w/ spaces between words and first char uppercased
  field.label = field.name.replace(/([a-z])([A-Z])/g, '$1 $2');
  field.label = field.label[0].toUpperCase() + field.label.slice(1);

  switch (field.type) {
    case 'Int':
      return (
        <label>
          {field.label}
          <input
            type="number"
            className={field.name + '-number periqles-number'}
            name={field.name}
            value={formState[field.name]}
            onChange={handleChange}></input>
        </label>
      );

    // TODO: formState values restricted only to numbers or strings due to HTML input type defs
    case 'Boolean':
      return (
        <label>
          {field.label}
          <input
            type="checkbox"
            className={field.name + '-checkbox periqles-checkbox'}
            name={field.name}
            value={formState[field.name]}
            onChange={handleChange}></input>
        </label>
      );

    case 'Enum':
      if (!field.options || !field.options.length) {
        return (<label>
            {field.label}
            <input
              type="text"
              className={`${field.name}-select periqles-select`}
              name={field.name}
              value={formState[field.name]}
              onChange={handleChange}></input>
          </label>);
      }

      const selectOptions: Array<PeriqlesFieldOption> = field.options;

      return (
        <label>
          {field.label}
          <select
            className={field.name + '-select periqles-select'}
            name={field.name}
            // defaultValue={selectOptions[0].value}
            defaultValue={''}
            onChange={handleChange}>
              <option
                key={`${field.name}selectnulloption`}
                value={''}
                className={
                  field.name + '-select-option periqles-select-option'
                }>
                Choose one...
              </option>
              {selectOptions.map((option, index) => {
                return (
                  <option
                    key={`${field.name}select${option.name}option${index}`}
                    value={option.value}
                    className={
                      field.name + '-select-option periqles-select-option'
                    }>
                    {option.label}
                  </option>
                );
              })}
          </select>
        </label>
      );

    default:
      const elementLookup = {
        pass: 'password',
        password: 'password',
        color: 'color',
        colour: 'color',
        url: 'url',
        link: 'url',
        date: 'date',
        time: 'time',
        file: 'file',
        datetime: 'datetime',
        timestamp: 'datetime',
        telephone: 'tel',
        phone: 'tel',
        mobile: 'tel',
        phonenumber: 'tel',
        cell: 'tel',
      };
      const textFieldName: string = field.name.toLowerCase();
      const elementType: string = elementLookup[textFieldName] || 'text';

      return (
        <label>
          {field.label}
          <input
            type={elementType}
            className={`${field.name}-${elementType} periqles-${elementType}`}
            name={field.name}
            value={formState[field.name]}
            onChange={handleChange}></input>
        </label>
      );
  }
};