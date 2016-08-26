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
    unselect(): void;
    select(event: any): void;
    markAsSelected(emit: boolean): void;
}
