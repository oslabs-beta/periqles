/// <reference types="periqles" />
/// <reference types="react" />
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
declare const PeriqlesForm: ({ environment, mutationName, mutationGQL, specifications, args, callbacks, useMutation }: PeriqlesFormProps) => JSX.Element;
export default PeriqlesForm;
