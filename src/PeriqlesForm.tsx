import * as React from 'react';
import PeriqlesField from './PeriqlesField';
import {introspect} from './functions';
import {commitMutation} from 'react-relay';
import '../periqles.css'

const {useState, useEffect} = React;

/**
 * Functional component that performs an introspection query then renders PeriqlesField components based on the mutation's defined input type.
 * @param {Object} environment (REQUIRED) The RelayEnvironment instance shared by this application's components, containing the network layer and store.
 * @param {String} mutationName (REQUIRED) The name of a mutation exactly as written on the schema.
 * @param {String|Function} mutationGQL (REQUIRED) A GraphQL mutation string or (if using Relay) a tagged template literal using the graphql`` tag imported from react-relay.
 * @param {Object} specifications Optional parameters to specify the form's appearance and behavior.
 * @param {Object} args Optional arguments to be passed to the mutation as input variables, represented as key-value pairs. Fields represented here will be excluded from the form.
 */

const PeriqlesForm = ({
  environment,
  mutationName,
  mutationGQL,
  specifications,
  args = {},
  callbacks,
  useMutation
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
    console.log('fieldNames', fieldNames);
    for (let i = 0; i < fieldNames.length; i += 1) {
      const fieldObj = fields.filter(
        (fieldObj) => fieldObj.name === fieldNames[i],
      )[0];
      console.log('this fieldObj:', fieldObj);
      if (fieldObj.required && formState[fieldNames[i]] === '') {
        window.alert(`The following field is required: ${fieldObj.label}`);
        return;
      }
    }

    const input: Input = {...formState, ...args};
    const variables: Variables = {
      input,
    };

    if (environment) {
      // relay commit method
      console.log('committing Relay mutation');
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
    } else {
      // apollo commit method
      console.log('committing Apollo mutation');
      // actual invocation of addUser useMutation mutate function; if passing variables must be passed inside of an object
      useMutation({ variables })
      .then(response => {
        if (callbacks?.onSuccess) callbacks.onSuccess(response); // useMutation mutate function returns a promise of mutation result
        setFormState({});
      })
      .catch(err => {
        if (callbacks?.onFailure) callbacks.onFailure(err); // if onFailure callback provided, invoke on useMutation mutate function promise error
      })
    }
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

  return (
    <form
      className="PeriqlesForm"
      aria-labelledby="form"
      onSubmit={(e) => handleSubmit(e, fields)}>
        {specifications && specifications.header && <h2>{specifications.header}</h2>}
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
