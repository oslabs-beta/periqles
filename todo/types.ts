export interface Specifications {
  fields: {FieldSpecs}; // TODO: how to say that this object can contain any number of FieldSpecs objects?
}

export interface FieldSpecs {
  element: string;
  label: string;
  options?: Option[];
  render?: (
    formState: FormState,
    setFormState: (value: any) => FormState,
    handleChange: (e: SyntheticEvent) => void, // TODO: import SyntheticEvent. (Or what type *should* this be?)
  ) => any;
}

export interface Option {
  label: string;
  value: string | number | boolean;
}

export interface FormState {
  // TODO: how to say that this object can have any number of key-value pairs?
}

// export default {
//   Specifications,
//   FieldSpecs,
//   Option,
//   FormState,
// }
