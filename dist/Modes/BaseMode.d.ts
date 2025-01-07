import { default as DarkEditable } from '../dark-editable.ts';
export default class BaseMode {
    context: DarkEditable;
    constructor(context: DarkEditable);
    event_show(): void;
    event_shown(): void;
    event_hide(): void;
    event_hidden(): void;
    init(): void;
    enable(): void;
    disable(): void;
    hide(): void;
}
