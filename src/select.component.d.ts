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
    internalInput: any;
    options: QueryList<Angular2OptionComponent>;
    private selection;
    private areOptionsVisible;
    private animateState;
    private propagateChange;
    private propagateTouch;
    constructor(el: ElementRef, renderer: Renderer, changeDetectionRef: ChangeDetectorRef);
    onClick(event: any): void;
    ngAfterViewInit(): void;
    writeValue(value: string): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    private _markOptionAsSelected(value);
    private _markSelectionOnPlaceholder(option);
    private _unselectAllOtherOptions(value);
    private _hideOptions();
    private _onEnter();
    private _clear(event);
    private _open(event);
}
