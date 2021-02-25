// Type definitions for periqles v2.x

// Externally available types
type PeriqlesForm = (props: PeriqlesFormProps) => JSX.Element;

interface PeriqlesFormProps {
  mutationName: string;
  environment?: RelayEnvironment;
  mutationGQL?: string | object;
  useMutation?: any,
  specifications?: PeriqlesSpecifications;
  args?: PeriqlesMutationArgs;
  callbacks?: PeriqlesCallbacks;
}

interface RelayEnvironment {
  store: any;
  networkLayer: any;
  handlerProvider?: any;
}

interface PeriqlesSpecifications {
  header?: string;
  fields?: Record<string, PeriqlesFieldSpecs>;
}

type PeriqlesMutationArgs = Record<string, number | boolean | string>;

interface PeriqlesCallbacks {
  onSuccess?: (response: object) => any;
  onFailure?: (err: object) => any;
}

interface PeriqlesFieldSpecs {
  element?: string;
  label?: string;
  options?: PeriqlesOptionSpec[];
  render?: (params: {
    formState: FormState,
    setFormState: React.Dispatch<React.SetStateAction<FormState>>,
    handleChange: (e) => void,
  }) => JSX.Element;
  src?: string;
  min?: number;
  max?: number;
}

interface PeriqlesOptionSpec {
  label: string;
  value: number | string | boolean;
}

type FormState = Record<string, number | string | boolean>;


// Types used internally by PeriqlesForm

type PeriqlesField = (props: PeriqlesFieldProps) => JSX.Element;

interface PeriqlesFieldProps {
  field: PeriqlesFieldInfo;
  formState: FormState;
  handleChange: (e) => void;
  specs?: PeriqlesFieldSpecs;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
}

// input field info introspected from schema
// used to build HTML for each PeriqlesField component 
interface PeriqlesFieldInfo {
  name: string;
  label?: string;
  type?: string;
  options?: PeriqlesFieldOption[];
  required?: boolean;
}

// options prepared for dropdowns/radio buttons
interface PeriqlesFieldOption {
  name: string;
  label: string;
  value: number | string | boolean;
  type: string;
}


// helper functions

type FieldsArrayGenerator = (
  inputType: InputType,
  args: PeriqlesMutationArgs,
) => PeriqlesFieldInfo[];

type GenerateDefaultElement = (params: {
  field: PeriqlesFieldInfo,
  formState: FormState,
  handleChange: (e) => void,
}) => JSX.Element;

type GenerateSpecifiedElement = (params: {
  field: PeriqlesFieldInfo,
  specs: PeriqlesFieldSpecs,
  formState: FormState,
  handleChange: (e) => void,
  setFormState: React.Dispatch<React.SetStateAction<FormState>>,
}) => JSX.Element;


// data expected from introspection query

interface InputType {
  name: string;
  inputFields: InputField[];
}

interface InputField {
  name: string;
  type: GraphQLType;
}

interface GraphQLType {
  name: string;
  kind: string;
  ofType?: GraphQLOfType;
  enumValues?: EnumValue[];
}

interface GraphQLOfType {
  name: string;
  kind: string;
  enumValues?: EnumValue[];
}

// Although EnumValue's one propety is called "name", it actuallly holds a value.
interface EnumValue {
  name: number | string | boolean;
}

// commitMutation parameters
type Input = Record<string, number | string | boolean>;

interface Variables {
  input: Input;
}
