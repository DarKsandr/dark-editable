import { default as BaseType } from './BaseType.js';
export default class SelectType extends BaseType {
    create(): HTMLDivElement;
    initText(): boolean;
    initOptions(): void;
}
