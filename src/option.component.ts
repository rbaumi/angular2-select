import { Component,
    Input,
    EventEmitter,
    Output,
    AfterViewInit,
    OnInit,
    ElementRef,
    ViewChild }                         from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'bm-ng2-option',
    template: `
        <li (click)="select($event)"
            [class.disabled]="disabled"
            [class.active]="isActive">
            <div class="inner" #contentWrapper>
                <ng-content></ng-content>
            </div>
        </li>
    `,
    styleUrls: [
        'option.styles.min.css'
    ]
})
export class Angular2OptionComponent implements OnInit, AfterViewInit {
    @Input() value: string;
    @Input() disabled: boolean = false;
    @Input() selected: boolean = false;
    @Output() onSelect: EventEmitter<string> = new EventEmitter();

    @ViewChild('contentWrapper') DOMContent: ElementRef;

    private isActive: boolean = false;
    public text: string = '';

    constructor() { }

    ngOnInit() {
        if (this.selected)
            this.markAsSelected(false);
    }
    ngAfterViewInit() {
        this.text = this.DOMContent.nativeElement.innerHTML.trim();
    }
    unselect() {
        this.isActive = false;
    }
    select(event) {
        event.stopPropagation();

        if (this.disabled)
            return;

        this.markAsSelected(true);
    }
    markAsSelected(emit: boolean) {
        this.isActive = true;
        this.onSelect.emit(this.value);
    }
}
