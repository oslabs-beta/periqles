/// <reference types="periqles" />
/// <reference types="react" />
export declare const introspect: (mutationName: any, setFields: any, args: any) => void;
export declare const fieldsArrayGenerator: (inputType: InputType, args?: Record<string, string | number | boolean>) => PeriqlesField[];
/**
 * Builds an HTML element to collect user input for a GraphQL mutation based on user-provided instructions.
 * @param {Object} field An object representing an input field for a GraphQL mutation. Example: {name: "name", type: "String"}
 * @param {Object} specs An object representing developer-specified information to use for an HTML element representing this field. Example: {label: "Name", element: "textarea", options: []}
 * @return  Returns the specified HTML input element with the specified label and specified sub-options, if any.
 */
export declare const generateSpecifiedElement: (field: PeriqlesField, specs: PeriqlesFieldSpecs, formState: Record<string, string | number>, handleChange: any, setFormState: any) => JSX.Element;
export declare const generateDefaultElement: (field: PeriqlesField, formState: Record<string, string | number>, handleChange: any) => JSX.Element;
