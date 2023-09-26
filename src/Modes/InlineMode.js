import BaseMode from "./BaseMode.js";

export default class InlineMode extends BaseMode{
    init(){
        const open = () => {
            if(!this.context.disabled){
                const item = this.context.typeElement.create();
                this.event_show();
                this.context.element.removeEventListener('click', open);
                this.context.element.innerHTML = '';
                this.context.element.append(item);
                this.event_shown();
            }
        }
        this.context.element.addEventListener('click', open);
    }
    enable(){

    }
    disable(){

    }
    hide(){
        this.event_hide();
        this.context.element.innerHTML = this.context.value;
        setTimeout(() => {
            this.init();
            this.event_hidden();
        }, 100);
    }
}