import { EventEmitter, AfterViewInit, OnInit, ElementRef, ChangeDetectorRef } from '@angular/core';
export declare class Angular2OptionComponent implements OnInit, AfterViewInit {
    private changeDetectionRef;
    value: string;
    disabled: boolean;
    selected: boolean;
    onSelect: EventEmitter<string>;
    DOMContent: ElementRef;
    private isActive;
    text: string;
    constructor(changeDetectionRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    /**
     * Mark this element as not selected.
     * Function is called from select.component
     */
    unselect(): void;
    /**
     * select this element.
     */
    private _select(event);
    /**
     * Mark this option as selected..
     */
    markAsSelected(emit: boolean): void;
}
