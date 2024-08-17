import { Popover } from "bootstrap";
import BaseMode from "./BaseMode.js";

export default class PopupMode extends BaseMode{
    init(){
        this.popover = new Popover(this.context.element, {
            container: "body",
            content: this.context.typeElement.create(),
            html: true,
            customClass: "dark-editable",
            title: this.context.title,
        });
        this.context.element.addEventListener('show.bs.popover', () => {
            this.event_show();
        });
        this.context.element.addEventListener('shown.bs.popover', () => {
            this.event_shown();
        });
        this.context.element.addEventListener('hide.bs.popover', () => {
            this.event_hide();
        });
        this.context.element.addEventListener('hidden.bs.popover', () => {
            this.event_hidden();
        });

        document.addEventListener('click', (e) => {
            const target = e.target;
            if(target === this.popover.tip || target === this.context.element) return;
            let current = target;
            while(current = current.parentNode){
                if(current === this.popover.tip) return;
            }
            this.hide();
        })
    }
    enable(){
        this.popover.enable();
    }
    disable(){
        this.popover.disable();
    }
    hide(){
        this.popover.hide();
    }
}