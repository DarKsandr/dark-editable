import BaseType from "./BaseType.js";

export default class InputType extends BaseType{
    create() {
        const input = this.createElement(`input`);
        const { options = {} } = this.context;

        input.type = typeof options.type === "string" ? options.type : 'text';

        const inputAttrs = options.attributes || {};
        const allowedAttributes = [
            'step', 'min', 'max',
            'minlength', 'maxlength',
            'pattern', 'placeholder',
            'required', 'readonly',
            'disabled', 'autocomplete',
            'autofocus', 'name', 'value'
        ];
        for (const [key, value] of Object.entries(inputAttrs)) {
            if (allowedAttributes.includes(key) && value !== undefined) {
                input.setAttribute(key, String(value));
            }
        }

        return this.createContainer(input);
    }
}