import { generateDefaultElement, generateSpecifiedElement } from './functions';
var PeriqlesField = function (_a) {
    var field = _a.field, specs = _a.specs, formState = _a.formState, setFormState = _a.setFormState, handleChange = _a.handleChange;
    // console.log(`Rendering PeriqlesField for ${field.name}`);
    var renderField = function () {
        if (!specs) {
            return generateDefaultElement(field, formState, handleChange);
        }
        return generateSpecifiedElement(field, specs, formState, setFormState, handleChange);
    };
    return renderField();
};
export default PeriqlesField;
//# sourceMappingURL=PeriqlesField.js.map