import { Component,
    Input,
    OnInit,
    ElementRef,
    ViewChild }                      from '@angular/core';
import { Angular2SelectService }        from './select.service';

@Component({
    moduleId: module.id,
    selector: 'bm-ng2-option',
    template: `
        <li (click)="selectValue($event)" [class.disabled]="disabled" [class.active]="value == selectService.getSelectedValue()">
            <div class="inner" #contentWrapper>
                <ng-content></ng-content>
            </div>
        </li>
    `,
    styleUrls: [
        'option.styles.min.css'
    ]
})
export class Angular2OptionComponent implements OnInit {
    @Input() value: string;
    @Input() disabled: boolean = false;
    @Input() selected: boolean;

    @ViewChild('contentWrapper') text: ElementRef;

    constructor (
        private selectService: Angular2SelectService
    ) { }

    ngOnInit() {
        if (this.selected) {
            this.selectService.setSelectedValue(this.value);
        }
    }
    selectValue(event) {
        event.stopPropagation();

        if (this.disabled)
            return;

        this.selectService.setSelectedValue(this.value);
        this.selectService.setSelectedText(this.text.nativeElement.innerHTML.trim());
        this.selectService.hideSelector();
    }
}
