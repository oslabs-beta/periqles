// A sandbox to test our JavaScript logic in isolation. Run CLI command "node drafts.js" to execute this file and see its console-logs in the terminal.

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

/*
const inputType = {
  name: 'AddTodoInput',
  inputFields: [
    {
      name: 'text',
      type: {
        name: null,
        kind: 'NON_NULL',
        ofType: {
          name: 'String',
          kind: 'SCALAR',
        },
      },
    },
    {
      name: 'userId',
      type: {
        name: null,
        kind: 'NON_NULL',
        ofType: {
          name: 'ID',
          kind: 'SCALAR',
        },
      },
    },
    {
      name: 'clientMutationId',
      type: {
        name: 'String',
        kind: 'SCALAR',
        ofType: null,
      },
    },
  ],
};
*/

const args = [
  {name: 'clientMutationId', value: '0000'},
  {name: 'userId', value: 'me'},
];

const inputTypeName = 'AddTodoInput';

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
  .then(res => res.json())
  .then(data => {
    console.log('AddTodoInput:', data);
    const fields = fieldsArrayGenerator(data);
    console.log(fields);
});
