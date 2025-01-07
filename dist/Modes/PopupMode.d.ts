import { Popover } from 'bootstrap';
import { default as BaseMode } from './BaseMode.js';
export default class PopupMode extends BaseMode {
    popover: Popover | null;
    init(): void;
    enable(): void;
    disable(): void;
    hide(): void;
}
