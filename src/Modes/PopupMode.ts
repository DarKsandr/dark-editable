import { Popover } from "bootstrap";
import BaseMode from "./BaseMode.js";

export default class PopupMode extends BaseMode{

    popover: Popover|null = null;

    init(){
        const options = this.context.options.popupOptions || {};
        if (!("container" in options)) {
            options.container = this.context.element.closest(".modal") ? ".modal-content" : "body";
        }
        options.html = true;
        options.content = this.context.typeElement.create();

        this.popover = new Popover(this.context.element, options);
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
            const target = <HTMLElement>e.target;
            // @ts-ignore
            if(this.popover && target === this.popover.tip || target === this.context.element) return;
            let current = target.parentNode;
            while(current){
                // @ts-ignore
                if(current === this.popover.tip) return;
                current = current.parentNode;
            }
            this.hide();
        })
    }
    enable(): void
    {
        if(this.popover){
            this.popover.enable();
        }
    }
    disable(): void
    {
        if(this.popover){
            this.popover.disable();
        }
    }
    hide(): void
    {
        if(this.popover){
            this.popover.hide();
        }
    }
}