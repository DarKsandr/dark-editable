import BaseType from "./BaseType.js";

export default class InputType extends BaseType{
    create(){
        const input = this.createElement(`input`);
        input.type = this.context.type;

        return this.createContainer(input);
    }
}