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
    success?: (response: any, newValue: string|number) => Promise<any>;
    error?: (response: any, newValue: string|number) => Promise<any>;
    //other
    viewformat?: string;
    source?: [{value: string, text: string}]|string;
}