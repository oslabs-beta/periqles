type Scalar = number | boolean | string;
type FormState = Record<string, number | string>;


// PROPS FOR PERIQLES COMPONENTS
interface PeriqlesSpecifications {
  header?: string;
  fields?: Record<string, PeriqlesFieldSpecs>;
}

interface PeriqlesFieldSpecs {
  element: string;
  label: string | JSX.Element;
  options?: PeriqlesOptionSpec[];
  render?: (
    formState: FormState,
    setFormState: React.Dispatch<React.SetStateAction<FormState>>,
    handleChange: (e) => void,
  ) => JSX.Element;
  src?: string;
  min?: number;
  max?: number;
}

interface PeriqlesOptionSpec {
  label: string | JSX.Element;
  value: number | string;
}

// objects returned by generateFieldsArray
interface PeriqlesField {
  name: string;
  label?: string | JSX.Element;
  type?: string;
  options?: PeriqlesFieldOption[];
  required?: boolean;
}

// options objects prepared for input fields represented by dropdowns/radios
interface PeriqlesFieldOption {
  name: string;
  label: string | JSX.Element;
  value: number | string;
  type: string;
}

interface PeriqlesCallbacks {
  onSuccess?: (response: object) => any;
  onFailure?: (err: object) => any;
}

type PeriqlesMutationArgs = Record<string, Scalar>;

interface RelayEnvironment {
  store: any;
  networkLayer: any;
  handlerProvider?: any;
}

interface PeriqlesFormProps {
  // eventually: this environment will accept RelayEnvironment | ApolloClient
  environment?: RelayEnvironment;
  mutationName: string;
  mutationGQL?: string | object;
  specifications?: PeriqlesSpecifications;
  args?: PeriqlesMutationArgs;
  callbacks?: PeriqlesCallbacks;
  useMutation?: any;
}

interface PeriqlesFieldProps {
  field: PeriqlesField;
  formState: FormState;
  handleChange: (e) => void;
  specs?: PeriqlesFieldSpecs;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
}

// PERIQLES HELPER FUNCTIONS
type GenerateDefaultElement = (params: {
  field: PeriqlesField,
  formState: FormState,
  handleChange: (e) => void,
}) => JSX.Element;

type GenerateSpecifiedElement = (params: {
  field: PeriqlesField,
  specs: PeriqlesFieldSpecs,
  formState: FormState,
  handleChange: (e) => void,
  setFormState: React.Dispatch<React.SetStateAction<FormState>>,
}) => JSX.Element;

// RESULT OF INTROSPECTION QUERY

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
  name: number | string;
}

// commitMutation parameters
type Input = Record<string, string | boolean | number>;
interface Variables {
  input: Input;
}
