import DarkEditable from "../dark-editable.ts";

export default class BaseMode{
    context: DarkEditable;

    constructor(context: DarkEditable) {
        if(this.constructor === BaseMode){
            throw new Error(`It's abstract class`);
        }
        this.context = context;
    }
    event_show(){
        this.context.typeElement.hideError();
        if(!this.context.typeElement.element){
            throw new Error("Element is missing!");
        }
        this.context.typeElement.element.value = this.context.getValue();
        this.context.element.dispatchEvent(new CustomEvent("show"));
    }
    event_shown(){
        this.context.element.dispatchEvent(new CustomEvent("shown"));
    }
    event_hide(){
        this.context.element.dispatchEvent(new CustomEvent("hide"));
    }
    event_hidden(){
        this.context.element.dispatchEvent(new CustomEvent("hidden"));
    }
    init(){
        throw new Error('Method `init` not define!');
    }
    enable(){
        throw new Error('Method `enable` not define!');
    }
    disable(){
        throw new Error('Method `disable` not define!');
    }
    hide(){
        throw new Error('Method `hide` not define!');
    }
}