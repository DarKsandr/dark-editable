import DateType from "./DateType.js";
import moment from "moment";

export default class DateTimeType extends DateType{
    create(){
        const input = this.createElement(`input`);
        input.type = "datetime-local";

        return this.createContainer(input);
    }

    initOptions(): void
    {
        this.context.get_opt("format", "YYYY-MM-DD HH:mm");
        this.context.get_opt("viewformat", "YYYY-MM-DD HH:mm");
        this.context.setValue(moment(this.context.getValue()).format("YYYY-MM-DDTHH:mm"));
    }
}