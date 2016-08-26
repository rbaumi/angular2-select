import { EventEmitter, ElementRef, Renderer, QueryList, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Angular2OptionComponent } from './option.component';
export interface Selection {
    value: string;
    text: string;
}
export declare class Angular2SelectComponent implements ControlValueAccessor, AfterViewInit {
    private el;
    private renderer;
    private changeDetectionRef;
    placeholder: string;
    required: boolean;
    selectionChanged: EventEmitter<string>;
    options: QueryList<Angular2OptionComponent>;
    private selection;
    private areOptionsVisible;
    private animateState;
    private propagateChange;
    private propagateTouch;
    constructor(el: ElementRef, renderer: Renderer, changeDetectionRef: ChangeDetectorRef);
    ngAfterViewInit(): void;
    writeValue(value: string): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    markSelectionOnPlaceholder(option: Angular2OptionComponent, emit: boolean): void;
    unselectAllOtherOptions(value: string): void;
    showOptions(): void;
    hideOptions(): void;
    onEnter(): void;
    onClick(event: any): void;
    clear(event: any): void;
}
