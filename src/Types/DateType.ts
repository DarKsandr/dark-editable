import BaseType from "./BaseType.js";
import moment from "moment";

export default class DateType extends BaseType{
    create(){
        const input = this.createElement(`input`);
        input.type = "date";

        return this.createContainer(input);
    }

    initText(): boolean
    {
        const value = this.context.getValue();
        if(value === ""){
            this.context.element.innerHTML = this.context.options.emptytext || "";
            return true;
        } else {
            this.context.element.innerHTML = moment(value, this.context.options.format).format(this.context.options.viewformat);
            return false;
        }
    }

    initOptions(): void
    {
        const default_format = "YYYY-MM-DD";
        const format = this.context.get_opt("format", default_format);
        const viewformat = this.context.get_opt("viewformat", default_format);
        this.context.setValue(moment(this.context.getValue(), viewformat).format(format));
    }
}