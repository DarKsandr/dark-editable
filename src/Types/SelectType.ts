import BaseType from "./BaseType.js";

export default class SelectType extends BaseType{
    create(){
        const select = this.createElement(`select`);
        if(this.context.options.source && Array.isArray(this.context.options.source)) {
            this.context.options.source.forEach(item => {
                const opt = document.createElement(`option`);
                opt.value = item.value;
                opt.innerHTML = item.text;
                select.append(opt);
            });
        }

        return this.createContainer(select);
    }

    initText(){
        this.context.element.innerHTML = this.context.options.emptytext || "";
        if(this.context.getValue() !== "" && this.context.options.source && Array.isArray(this.context.options.source) && this.context.options.source.length > 0){
            for(let i = 0; i < this.context.options.source.length; i++){
                const item = this.context.options.source[ i ];
                if( item.value == this.context.getValue()){
                    this.context.element.innerHTML = item.text;
                    return false;
                }
            }
        }
        return true;
    }

    initOptions(){
        this.context.get_opt("source", []);
        if(this.context.options && typeof this.context.options.source === "string" && this.context.options.source !== ""){
            this.context.options.source = JSON.parse(this.context.options.source);
        }
    }
}