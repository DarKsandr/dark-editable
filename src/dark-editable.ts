import "./dark-editable.css";
import PopupMode from "./Modes/PopupMode.ts";
import InlineMode from "./Modes/InlineMode.ts";
import BaseType from "./Types/BaseType.ts";
import InputType from "./Types/InputType.ts";
import TextAreaType from "./Types/TextAreaType.ts";
import SelectType from "./Types/SelectType.ts";
import DateType from "./Types/DateType.ts";
import DateTimeType from "./Types/DateTimeType.ts";
import Options from "./Interfaces/Options.ts";
import BaseMode from "./Modes/BaseMode.ts";

/*!
 * DarkEditable.js
 * License: MIT
 */
export default class DarkEditable{
    element: HTMLElement;
    options: Options;

    typeElement: BaseType;
    modeElement: BaseMode;

    constructor(element: HTMLElement, options: Options = {}) {
        this.element = element;
        this.options = { ...options };
        
        this.init_options();
        this.typeElement = this.route_type();
        this.typeElement.initOptions();
        this.modeElement = this.route_mode();
        this.modeElement.init();
        this.init_text();
        this.init_style();
        if(this.options.disabled){
            this.disable();
        }
        this.element.dispatchEvent(new CustomEvent("init"));
    }

    /* INIT METHODS */

    get_opt(name: string, default_value: any): any
    {
        // @ts-ignore
        return this.options[name] = this.element.dataset?.[ name ] ?? this.options?.[ name ] ?? default_value;
    }

    get_opt_bool(name: string, default_value: any): void
    {
        this.get_opt(name, default_value);
        // @ts-ignore
        if(typeof this.options[ name ] !== "boolean"){
            // @ts-ignore
            if(this.options[ name ] === "true") {
                // @ts-ignore
                this.options[ name ] = true;
                return;
            }
            // @ts-ignore
            if(this.options[ name ] === "false") {
                // @ts-ignore
                this.options[ name ] = false;
                return;
            }
            // @ts-ignore
            this.options[ name ] = default_value;
        }
    }

    init_options(): void
    {
        // for backward compatibility
        const title = this.get_opt("title", "");

        //priority date elements
        this.get_opt("value", this.element.innerHTML);
        this.get_opt("name", this.element.id);
        this.get_opt("pk", null);
        this.get_opt("type", "text");
        this.get_opt("emptytext", "Empty");
        this.get_opt("mode", "popup");
        this.get_opt("url", null);
        this.get_opt("popupOptions", {});
        this.options.popupOptions = Object.assign({
            customClass: "dark-editable",
            title: title,
        }, this.options.popupOptions);
        this.get_opt("ajaxOptions", {});
        this.options.ajaxOptions = Object.assign({
            method: "POST",
            dataType: "text",
        }, this.options.ajaxOptions);
        this.get_opt_bool("send", true);
        this.get_opt_bool("disabled", false);
        this.get_opt_bool("required", false);
        this.get_opt_bool("showbuttons", true);
        if(this.options?.success && typeof this.options?.success === "function"){
            this.success = this.options.success;
        }
        if(this.options?.error && typeof this.options?.error === "function"){
            this.error = this.options.error;
        }
        this.get_opt("attributes", {});
    }

    init_text(){
        const empty_class = "dark-editable-element-empty";
        this.element.classList.remove(empty_class);
        if(this.typeElement.initText()){
            this.element.classList.add(empty_class);
        }
    }

    init_style(){
        this.element.classList.add("dark-editable-element");
    }

    /* INIT METHODS END */
    route_mode(){
        switch (this.options.mode){
            default:
                throw new Error(`Mode ${this.options.mode} not found!`)
            case 'popup':
                return new PopupMode(this);
            case 'inline':
                return new InlineMode(this);
        }
    }

    route_type(): BaseType
    {
        if(this.options.type && typeof this.options.type !== 'string'){
            // @ts-ignore
            return new this.options.type(this);
        }
        switch (this.options.type) {
            case "text":
            case "password":
            case "email":
            case "url":
            case "tel":
            case "number":
            case "range":
            case "time":
                return new InputType(this);
            case "textarea":
                return new TextAreaType(this);
            case "select":
                return new SelectType(this);
            case "date":
                return new DateType(this);
            case "datetime":
                return new DateTimeType(this);
        }
        throw new Error(`Undefined type`);
    }

    /* AJAX */

    async success(response: Response, newValue: string): Promise<any>
    {
        return await this.typeElement.successResponse(response, newValue);
    }

    async error(response: Response, newValue: string): Promise<any>
    {
        return await this.typeElement.errorResponse(response, newValue);
    }

    /* AJAX END */

    /* METHODS */

    enable(): void
    {
        this.options.disabled = false;
        this.element.classList.remove("dark-editable-element-disabled");
        this.modeElement.enable();
    }

    disable(): void
    {
        this.options.disabled = true;
        this.element.classList.add("dark-editable-element-disabled");
        this.modeElement.enable();
    }

    setValue(value: string): void
    {
        this.options.value = value;
        this.init_text();
    }

    getValue(): string
    {
        return this.options.value ?? '';
    }

    /* METHODS END */
}