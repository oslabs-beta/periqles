import * as React from 'react';
import PeriqlesField from './PeriqlesField';
import {introspect, fieldsArrayGenerator} from './functions';
import {commitMutation} from 'react-relay';

const {useState, useEffect} = React;

/**
 * Higher-order component that performs an introspection query then returns a form component that renders dynamically based on an introspected input type.
 * @param {Object} environment (REQUIRED) The RelayEnvironment instance shared by this application's components, containing the network layer and store.
 * @param {String} mutationName (REQUIRED) The name of a mutation exactly as written on the Relay schema.
 * @param {String|Object} mutationGQL (REQUIRED) A GraphQˀL mutation string or GraphQLTaggedNode request object.
 * @param {Object} specifications Optional parameters to specify the form's appearance and behavior, including a "fields" property that is an array of objects matching field names to specifed HTML input element types.
 * @param {[Object]} args Optional arguments to be passed to the mutation, represented as an array of objects with the shape {name, value}. Input fields represented here will be excluded from the form.
 * @return {Function} PeriqlesField, a React functional component
 *
 */

const PeriqlesForm = ({
  environment,
  mutationName,
  mutationGQL,
  specifications,
  args,
  callbacks,
}: PeriqlesFormProps): JSX.Element => {
  const [formState, setFormState] = useState<FormState>({});
  const [fields, setFields] = useState<PeriqlesField[]>([]);

  useEffect(() => {
    introspect(mutationName, setFields, args);
  }, [mutationName]);

  // HANDLERS
  const handleSubmit = (e, fields): void => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault(); // prevent page refesh
    }

    // validate non-null text fields
    const fieldNames = Object.keys(formState);
    for (let i = 0; i < fieldNames.length; i += 1) {
      const fieldObj = fields.filter(
        (fieldObj) => fieldObj.name === fieldNames[i],
      )[0];
      if (fieldObj.required && formState[fieldNames[i]] === '') {
        window.alert(`The following field is required: ${fieldObj.label}`);
        return;
      }
    }

    const input: Input = {...formState, ...args};
    const variables: Variables = {
      input,
    };
    commitMutation(environment, {
      mutation: mutationGQL,
      variables,
      onCompleted: (response, errors): void => {
        if (callbacks?.onSuccess) callbacks.onSuccess(response);
        setFormState({});
      },
      onError: (err): void => {
        if (callbacks?.onFailure) callbacks.onFailure(err);
      },
    });
  };

  const handleChange = (e): void => {
    const {name, value, type} = e.target;
    let useValue = value;
    // type-coerce values from number input elements before storing in state
    if (type === 'number' && typeof value !== 'number') {
      useValue -= 0;
    }

    const newState = Object.assign({}, formState);
    newState[name] = useValue;
    setFormState(newState);
  };

  const renderFields = (fields: PeriqlesField[]) => {
    // add each field to formState
    // const startingValues = {};
    // fields.forEach((field: PeriqlesField) => {
    //   let initialValue;
    //   switch (field.type) {
    //     case 'String':
    //       initialValue = '';
    //       break;
    //     case 'Int':
    //       initialValue = 0;
    //       break;
    //     case 'Boolean':
    //       initialValue = false;
    //       break;
    //     case 'Enum':
    //       if (!field.options) {
    //         initialValue = '';
    //       } else initialValue = field.options[0].name;
    //       break;
    //     default:
    //       initialValue = '';
    //   }
    //   startingValues[field.name] = initialValue;
    // });
    // console.log('Setting initial form state');
    // setFormState(startingValues);    // infinite loop

    return fields.map((field: PeriqlesField, index: number) => {
      const specs = specifications
        ? specifications.fields[field.name]
        : undefined;
      return (
        <PeriqlesField
          key={`Periqles${mutationName}Field${index}`}
          field={field}
          specs={specs}
          formState={formState}
          setFormState={setFormState}
          handleChange={handleChange}
        />
      );
    });
  };

  let headerText: string = mutationName
    .replace('Mutation', '') //remove 'Mutation'
    .replace(/([a-z])([A-Z])/g, '$1 $2'); // add spaces before capital letters
  headerText = headerText[0].toUpperCase() + headerText.slice(1); // capitalize first letter

  return (
    <form
      role="form"
      className="PeriqlesForm"
      aria-labelledby="form"
      onSubmit={(e) => handleSubmit(e, fields)}>
      <h2>{headerText}</h2>
      {fields.length ? renderFields(fields) : <p>Loading form...</p>}
      <button
        className="periqles-submit"
        onClick={(e) => handleSubmit(e, fields)}>
        Submit
      </button>
    </form>
  );
};

export default PeriqlesForm;
