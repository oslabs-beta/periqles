// a fetch call to introspect for just one input type
const inputTypeName = 'AddUserInput';
let addUserInputType;

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
    console.log('Input type fetched by PF:', data.__type);
    addUserInputType = data.__type;
  });

  
// a reworked fieldsArrayGenerator that takes in one input type instead of a whole schema and an optional args array

// TODO: use the options property added to enumerated fields
const fieldsArrayGenerator = (inputType, args = []) => {
  const fieldsArray = [];
  // exclude from the form any inputs accounted for by args
  const exclude = args.map((arg) => arg.name);

  inputType.inputFields.forEach((field) => {
    if (exclude.includes(field.name)) return;

    const fieldObj = {
      name: field.name,
    };

    // the input field is a scalar, nullable type
    if (field.type.name && field.type.kind === 'SCALAR') {
      fieldObj.type = field.type.name;
    }
    // the input field is an enumerated type
    else if (field.type.kind === 'ENUM') {
      fieldObj.type = 'Enum';
      fieldObj.options = {};

      // TODO: Populate fieldObj.options. (Object or array?) Check out inputFields and other properties of __EnumValue type on schema.
    }
    // the input field is a scalar wrapped in a NON_NULL type
    else if (field.type.ofType.name && field.type.ofType.kind === 'SCALAR') {
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

const fields = fieldsArrayGenerator(addUserInputType);