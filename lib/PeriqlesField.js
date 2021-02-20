import { generateDefaultElement, generateSpecifiedElement } from './functions';
var PeriqlesField = function (_a) {
    var field = _a.field, specs = _a.specs, formState = _a.formState, setFormState = _a.setFormState, handleChange = _a.handleChange;
    return (specs
        ? generateSpecifiedElement({
            field: field,
            specs: specs,
            formState: formState,
            setFormState: setFormState,
            handleChange: handleChange,
        })
        : generateDefaultElement({
            field: field,
            formState: formState,
            handleChange: handleChange
        }));
};
export default PeriqlesField;
//# sourceMappingURL=PeriqlesField.js.map