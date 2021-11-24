class DarkEditable{
    constructor(element, options = {}){
        this.element = element;
        this.options = options;
        
        this.init_options();
        this.init_popover();
        this.init_text();
        this.init_hide_onclick();
        this.init_style();
        if(this.disabled){
            this.disable();
        }
    }

    /* INIT METHODS */

    init_options(){
        const get_opt = (name, default_value) => {
            return this[ name ] = this.element.dataset?.[ name ] ?? this.options?.[ name ] ?? default_value;
        }
        const get_opt_bool = (name, default_value) => {
            get_opt(name, default_value);
            if(typeof this[ name ] != "boolean"){
                if(this[ name ] == "true") {
                    this[ name ] = true;
                } else if(this[ name ] == "false") {
                    this[ name ] = false;
                } else {
                    this[ name ] = default_value;
                }
            }
            return this[ name ];
        }
        //priority date elements
        get_opt("value", this.element.innerHTML);
        get_opt("name", this.element.id);
        get_opt("pk", null);
        get_opt("title", "");
        get_opt("type", "text");
        get_opt("emptytext", "Empty");
        get_opt("url", null);
        get_opt("ajaxOptions", {});
        this.ajaxOptions = Object.assign({
            method: "POST",
        }, this.ajaxOptions);
        get_opt_bool("send", true);
        get_opt_bool("disabled", false);
        get_opt_bool("required", false);
        switch(this.type){
            case "select":
                get_opt("source", []);
            break;
            case "date":
                get_opt("format", "YYYY-MM-DD");
                get_opt("viewformat", "YYYY-MM-DD");
                // if(this.value != empty_value) this.value = moment(this.value).format("YYYY-MM-DD");
            break;
            case "datetime":
                get_opt("format", "YYYY-MM-DD HH:mm");
                get_opt("viewformat", "YYYY-MM-DD HH:mm");
                this.value = moment(this.value).format("YYYY-MM-DDTHH:mm");
            break;
        }
    }

    init_text(){
        switch(this.type){
            default:
                this.element.innerHTML = this.value == "" ? this.emptytext : this.value;
            break;
            case "select":
                this.element.innerHTML = this.emptytext;
                if(this.value != "" && this.source.length > 0){
                    this.source.forEach(item => {
                        if(item.value == this.value){
                            this.element.innerHTML = item.text;
                        }
                    });
                }
            break;
            case "date":
            case "datetime":
                this.element.innerHTML = this.value == "" ? this.emptytext : moment(this.value).format(this.viewformat);
            break;
        }
    }

    init_style(){
        this.element.classList.add("dark-editable-element");
    }

    init_hide_onclick(){
        document.addEventListener('click', (e) => {
            const target = e.target;
            if(target === this.popover.tip || target == this.element) return;
            let current = target;
            while(current = current.parentNode){
                if(current === this.popover.tip) return;
            }
            this.popover.hide();
        })
    }

    init_popover(){
        const content = this.route_type();
        this.popover = new bootstrap.Popover(this.element, {
            container: "body",
            content,
            html: true,
            customClass: "dark-editable",
            title: this.title,
        });
    }

    /* INIT METHODS END */

    /* ENABLE/DISABLE */

    enable(){
        this.disabled = false;
        this.element.classList.remove("dark-editable-element-disabled");
        this.popover.enable();
    }

    disable(){
        this.disabled = true;
        this.element.classList.add("dark-editable-element-disabled");
        this.popover.disable();
    }

    /* ENABLE/DISABLE END */

    route_type(){
        switch(this.type){
            default:
                throw new Error(`Undefined type`);
            case "text":
            case "password":
            case "email":
            case "url":
            case "tel":
            case "number":
            case "range":
            case "time":
                return this.type_input();
            case "textarea":
                return this.type_textarea();
            case "select":
                return this.type_select();
            case "date":
                return this.type_date();
            case "datetime":
                return this.type_datetime();
        }
    }

    /* TYPES */

    createElement(name){
        const element = document.createElement(name);
        element.classList.add("form-control");
        if(this.required){
            element.required = this.required;
        }
        this.add_focus(element);
        return element;
    }

    type_input(){
        const input = this.createElement(`input`);
        input.type = this.type;
        input.value = this.value;

        return this.createContainer(input);
    }

    type_textarea(){
        const textarea = this.createElement(`textarea`);
        textarea.value = this.value;

        return this.createContainer(textarea);
    }

    type_select(){
        const select = this.createElement(`select`);
        this.source.forEach(item => {
            const opt = document.createElement(`option`);
            opt.value = item.value;
            opt.innerHTML = item.text;
            select.append(opt);
        });
        
        return this.createContainer(select);
    }

    type_date(){
        const input = this.createElement(`input`);
        input.type = "date";
        input.value = this.value;

        return this.createContainer(input);
    }

    type_datetime(){
        const input = this.createElement(`input`);
        input.type = "datetime-local";
        input.value = this.value;

        return this.createContainer(input);
    }

    /* TYPES END */

    /* ADD FOCUS */
    add_focus(element){
        this.element.addEventListener('shown.bs.popover', function(){
            element.focus();
        });
    }
    /* ADD FOCUS END */

    /* CONTAINER DIV */

    createContainer(element){
        const form = this.createContainerForm(element);
        form.append(element, this.createButtonSuccess(), this.createButtonCancel());
        return form;
    }

    createContainerForm(element){
        const form = document.createElement(`form`);
        form.classList.add("d-flex", "align-items-start");
        form.style.gap = "20px";
        form.addEventListener('submit', async e => {
            e.preventDefault();
            this.value = element.value;
            if(this.send){
                await this.ajax();
            }
            this.popover.hide();
            this.init_text();
        })
        return form;
    }

    /* CONTAINER DIV END */

    /* BUTTONS */

    createButton(){
        const button = document.createElement("button");
        button.type = "button";
        button.classList.add("btn", "btn-sm");
        button.style.color = "transparent";
        button.style.textShadow = "0 0 0 white";
        return button;
    }

    createButtonSuccess(){
        const btn_success = this.createButton();
        btn_success.type = "submit";
        btn_success.classList.add("btn-success");
        btn_success.innerHTML = "✔";
        return btn_success;
    }

    // createButtonSuccess(element){
    //     const btn_success = this.createButtonSuccessNoAction();
    //     btn_success.addEventListener("click", async () => {
    //         if(this.send){
    //             await this.ajax();
    //         }
    //         this.value = element.value;
    //         this.popover.hide();
    //         this.init_text();
    //     });
    //     return btn_success;
    // }

    createButtonCancel(){
        const btn_cancel = this.createButton();
        btn_cancel.classList.add("btn-danger");
        btn_cancel.innerHTML = "✖";
        btn_cancel.addEventListener("click", () => {
            this.popover.hide();
        });
        return btn_cancel;
    }

    /* BUTTONS END */

    /* AJAX */

    async ajax(){
        let url = this.url;
        const form = new FormData;
        form.append("pk", this.pk);
        form.append("name", this.name);
        form.append("value", this.value);
        const option = {};
        option.method = this.ajaxOptions.method;
        if(option.method == "POST"){
            option.POST = form;
        } else {
            url += "?" + new URLSearchParams(form).toString();
        }
        const response = await fetch(url, option);
        console.log(response)
        return response;
    }

    /* AJAX END */
}