import * as React from 'react';
import PeriqlesField from './PeriqlesField';
import {introspect} from './functions';
import {commitMutation} from 'react-relay';
import '../periqles.css'
import { render } from 'react-dom';

const {useState, useEffect} = React;

const PeriqlesForm = ({
  environment,
  mutationName,
  mutationGQL,
  useMutation,
  specifications,
  args = {},
  callbacks,
}: PeriqlesFormProps): JSX.Element => {
  const [formState, setFormState] = useState<FormState>({});
  const [fields, setFields] = useState<PeriqlesFieldInfo[]>([]);

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

    if (environment) {
      // relay commit method
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

  const renderFields = (fields: PeriqlesFieldInfo[]) => {
    return fields.map((field: PeriqlesFieldInfo, index: number) => {
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
