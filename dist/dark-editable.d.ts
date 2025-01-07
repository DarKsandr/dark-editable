import { default as PopupMode } from './Modes/PopupMode.ts';
import { default as InlineMode } from './Modes/InlineMode.ts';
import { default as BaseType } from './Types/BaseType.ts';
import { default as Options } from './Interfaces/Options.ts';
import { default as BaseMode } from './Modes/BaseMode.ts';
/*!
 * DarkEditable.js
 * License: MIT
 */
export default class DarkEditable {
    element: HTMLElement;
    options: Options;
    typeElement: BaseType;
    modeElement: BaseMode;
    value: string;
    constructor(element: HTMLElement, options?: Options);
    get_opt(name: string, default_value: any): void;
    get_opt_bool(name: string, default_value: any): void;
    init_options(): void;
    init_text(): void;
    init_style(): void;
    route_mode(): PopupMode | InlineMode;
    route_type(): BaseType;
    success(response: Response, newValue: string): Promise<any>;
    error(response: Response, newValue: string): Promise<any>;
    enable(): void;
    disable(): void;
    setValue(value: string): void;
    getValue(): string;
}
