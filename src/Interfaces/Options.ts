import { Popover } from "bootstrap";
import BaseType from "../Types/BaseType.ts";

export default interface Options {
    value?: string;
    name?: string;
    pk?: string;
    title?: string;
    type?: BaseType|string;
    ajaxOptions?: RequestInit;
    disabled?: boolean;
    send?: boolean;
    mode?: 'popup'|'inline';
    emptytext?: string;
    url?: string|null;
    required?: boolean;
    showbuttons?: boolean;
    success?: (response: Response, newValue: string|number) => Promise<any>;
    error?: (response: Response, newValue: string|number) => Promise<any>;
    popoverOptions?: Popover.Options
    //other
    format?: string;
    viewformat?: string;
    source?: [{ value: string, text: string }] | string;
    attributes?: { [key: string]: string|number|boolean|undefined; };
}