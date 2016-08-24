import { ElementRef, AfterContentInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Angular2SelectService } from './select.service';
export declare class Angular2SelectComponent implements ControlValueAccessor, AfterContentInit {
    private el;
    private selectService;
    placeholder: string;
    required: boolean;
    selected: ElementRef;
    private propagateChange;
    private propagateTouch;
    constructor(el: ElementRef, selectService: Angular2SelectService);
    ngAfterContentInit(): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    onEnter(): void;
    onClick(event: any): void;
    clear(event: any): void;
}
