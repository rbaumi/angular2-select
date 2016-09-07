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
    /**
     * Function binds click event to the document. The options will hide whenever
     * user click anywhere outside the selector.
     * TODO: make it as an @Input() so the default behaviour can be configured
     * @param event MouseEvent
     */
    onClick(event: any): void;
    ngAfterViewInit(): void;
    /**
     * Implementation of ControlValueAccessor interface
     */
    writeValue(value: string): void;
    /**
     * Implementation of ControlValueAccessor interface
     */
    registerOnChange(fn: any): void;
    /**
     * Implementation of ControlValueAccessor interface
     */
    registerOnTouched(fn: any): void;
    /**
     * Function looks for specific bm-ng2-option element and mark it as active
     * @param value string value of bm-ng2-option element to be selected
     */
    private _markOptionAsSelected(value);
    /**
     * Function sets the value of select placeholder. It is called after bm-ng2-option is being clicked.
     * @param option Angular2OptionComponent clicked bm-ng2-option
     */
    private _markSelectionOnPlaceholder(option);
    /**
     * Function loops through all bm-ng2-options and deselects them
     * @param value string value of bm-ng2-option element not to be changed
     */
    private _unselectAllOtherOptions(value);
    /**
     * Close selector
     */
    private _hideOptions();
    /**
     * Function that is triggered when md-input is focused
     */
    private _onEnter();
    /**
     * Deselect current selection
     * @param event MouseEvent
     */
    private _clear(event);
    /**
     * Opens options after the arrow icon is being clicked
     * @param event MouseEvent
     */
    private _open(event);
}
