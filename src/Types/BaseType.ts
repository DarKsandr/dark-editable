import DarkEditable from "../dark-editable.ts";
import BaseTypeButtons from "../Interfaces/BaseTypeButtons.ts";

export default class BaseType{
    context: DarkEditable;
    element: HTMLInputElement|null = null;
    error: HTMLElement|null = null;
    form: HTMLElement|null = null;
    load: HTMLElement|null  = null;
    buttons: BaseTypeButtons = {success: null, cancel: null};

    constructor(context: DarkEditable) {
        if(this.constructor === BaseType){
            throw new Error(`It's abstract class`);
        }
        this.context = context;
    }

    create(): HTMLElement
    {
        throw new Error('Method `create` not define!');
    }

    createContainer(element: HTMLInputElement): HTMLDivElement
    {
        const div = document.createElement(`div`);
        this.element = element;
        this.error = this.createContainerError();
        this.form = this.createContainerForm();
        this.load = this.createContainerLoad();
        this.form.append(element, this.load);
        this.buttons.success = null;
        this.buttons.cancel = null;
        if(this.context.options.showbuttons){
            this.buttons.success = this.createButtonSuccess();
            this.buttons.cancel = this.createButtonCancel();
            this.form.append(this.buttons.success, this.buttons.cancel);
        }

        div.append(this.error, this.form);
        return div;
    }

    createContainerError(): HTMLDivElement
    {
        const div = document.createElement(`div`);
        div.classList.add("text-danger", "fst-italic", "mb-2", "fw-bold");
        div.style.display = "none";
        return div;
    }

    createContainerForm(): HTMLFormElement
    {
        const form = document.createElement(`form`);
        form.classList.add("d-flex", "align-items-start");
        form.style.gap = "20px";
        form.addEventListener('submit', async e => {
            e.preventDefault();
            const newValue = this.getValue();
            if(this.context.options.send && this.context.options.pk && this.context.options.url && (this.context.value !== newValue)){
                this.showLoad();
                let msg;
                try {
                    const response = await this.ajax(newValue);
                    if(response.ok){
                        msg = await this.context.success(response, newValue);
                    } else {
                        msg = await this.context.error(response, newValue) || `${response.status} ${response.statusText}`;
                    }
                } catch (error) {
                    console.error(error);
                    msg = error;
                }

                if(msg){
                    this.setError(msg);
                    this.showError();
                } else {
                    this.setError('');
                    this.hideError();
                    this.context.value = this.getValue();
                    this.context.modeElement.hide();
                    this.initText();
                }
                this.hideLoad();
            } else {
                this.context.value = this.getValue();
                this.context.modeElement.hide();
                this.initText();
            }
            this.context.element.dispatchEvent(new CustomEvent("save"));
        })
        return form;
    }

    createContainerLoad(): HTMLDivElement
    {
        const div = document.createElement(`div`);
        div.style.display = "none";
        div.style.position = "absolute";
        div.style.background = "white";
        div.style.width = "100%";
        div.style.height = "100%";
        div.style.top = '0';
        div.style.left = '0';
        const loader = document.createElement(`div`);
        loader.classList.add("dark-editable-loader");
        div.append(loader);
        return div;
    }

    createButton(): HTMLButtonElement
    {
        const button = document.createElement("button");
        button.type = "button";
        button.classList.add("btn", "btn-sm");
        button.style.color = "transparent";
        button.style.textShadow = "0 0 0 white";
        return button;
    }

    createButtonSuccess(): HTMLButtonElement
    {
        const btn_success = this.createButton();
        btn_success.type = "submit";
        btn_success.classList.add("btn-success");
        btn_success.innerHTML = "✔";
        return btn_success;
    }

    createButtonCancel(): HTMLButtonElement
    {
        const btn_cancel = this.createButton();
        btn_cancel.classList.add("btn-danger");
        const div = document.createElement("div");
        div.innerHTML = "✖";
        btn_cancel.append(div);
        btn_cancel.addEventListener("click", () => {
            this.context.modeElement.hide();
        });
        return btn_cancel;
    }

    hideLoad(): void
    {
        if(this.load){
            this.load.style.display = "none";
        }
    }

    showLoad(): void
    {
        if(this.load){
            this.load.style.display = "block";
        }
    }

    ajax(new_value: string): Promise<Response>
    {
        let url = this.context.options.url;
        if(!url){
            throw new Error("URL is required!");
        }
        if(!this.context.options.pk){
            throw new Error("pk is required!");
        }
        if(!this.context.options.name){
            throw new Error("Name is required!");
        }
        const form = new FormData;
        form.append("pk", this.context.options.pk);
        form.append("name", this.context.options.name);
        form.append("value", new_value);
        if(this.context.options.ajaxOptions?.method === "GET"){
            const params: [string?] = [];
            form.forEach((value, key) => {
                params.push(`${key}=${value}`);
            });
            url += "?" + params.join("&");
        }

        const ajaxOptions = {...this.context.options.ajaxOptions};
        ajaxOptions.body = form;
        return fetch(url, ajaxOptions);
    }

    async successResponse(_response: Response, _newValue: string): Promise<any>
    {

    }

    async errorResponse(_response: Response, _newValue: string): Promise<any>
    {

    }

    setError(errorMsg: string): void
    {
        if(this.error){
            this.error.innerHTML = errorMsg;
        }
    }

    showError(): void
    {
        if(this.error){
            this.error.style.display = "block";
        }
    }

    hideError(): void
    {
        if(this.error){
            this.error.style.display = "none";
        }
    }

    createElement(name: string): HTMLInputElement
    {
        const element = <HTMLInputElement>document.createElement(name);
        element.classList.add("form-control");
        if(this.context.options.required){
            element.required = this.context.options.required;
        }
        if(!this.context.options.showbuttons){
            element.addEventListener('change', () => {
                if(this.form){
                    this.form.dispatchEvent(new Event('submit'));
                }
            });
        }
        this.add_focus(element);
        return element;
    }

    add_focus(element: HTMLInputElement): void
    {
        this.context.element.addEventListener('shown', function(){
            element.focus();
        });
    }

    initText(): boolean
    {
        if(this.context.value === ""){
            this.context.element.innerHTML = this.context.options.emptytext || "";
            return true;
        } else {
            this.context.element.innerHTML = this.context.value;
            return false;
        }
    }

    initOptions(): void
    {

    }

    getValue(): string
    {
        return this.element ? this.element.value : '';
    }
}