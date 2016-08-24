import { OnInit, ElementRef } from '@angular/core';
import { Angular2SelectService } from './select.service';
export declare class Angular2OptionComponent implements OnInit {
    private selectService;
    value: string;
    disabled: boolean;
    selected: boolean;
    text: ElementRef;
    constructor(selectService: Angular2SelectService);
    ngOnInit(): void;
    selectValue(event: any): void;
}
