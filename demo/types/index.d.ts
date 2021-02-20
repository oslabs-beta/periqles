type FlatObject = Record<string, string | boolean | number>;

// commitMutation parameters
type Input = FlatObject;
interface Variables {
  input: Input;
}
