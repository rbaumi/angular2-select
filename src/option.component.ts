import { Component,
    Input,
    EventEmitter,
    Output,
    AfterViewInit,
    OnInit,
    ElementRef,
    ChangeDetectorRef,
    ViewChild } from '@angular/core';

@Component({
    selector: 'bm-ng2-option',
    template: `
        <li (click)="_select($event)"
            [class.disabled]="disabled"
            [class.active]="isActive">
            <div class="inner" #contentWrapper>
                <ng-content></ng-content>
            </div>
        </li>
    `,
    styles: [`
        li {
          clear: both;
          color: rgba(0, 0, 0, 0.87);
          height: 50px;
          line-height: 50px;
          border-bottom: 1px solid #ededed;
          width: 100%;
          text-align: left;
          text-transform: none;
          list-style-type: none;
        }

        li.disabled {
          color: rgba(0, 0, 0, 0.3);
          background-color: transparent;
        }

        li.active {
          background-color: #F5F5F5;
        }

        li:not(.disabled):hover {
          background-color: #eee;
        }

        li div.inner {
          padding-left: 20px;
        }

        li:not(.disabled) {
          cursor: pointer;
        }
    `]
})

export class Angular2OptionComponent implements OnInit, AfterViewInit {
    @Input() value: string;
    @Input() disabled: boolean = false;
    @Input() selected: boolean = false;
    @Output() onSelect: EventEmitter<string> = new EventEmitter<string>();

    @ViewChild('contentWrapper') DOMContent: ElementRef;

    private isActive: boolean = false;
    public text: string = '';

    constructor(private changeDetectionRef: ChangeDetectorRef) { }

    ngOnInit() {
        if (this.selected)
            this.markAsSelected(false);
    }

    ngAfterViewInit() {
        // get the text of this element
        this.text = this.DOMContent.nativeElement.innerHTML.trim();
    }

    /**
     * Mark this element as not selected.
     * Function is called from select.component
     */
    unselect() {
        this.isActive = false;
    }

    /**
     * select this element.
     */
    private _select(event) {
        event.stopPropagation();

        if (this.disabled)
            return;

        this.markAsSelected(true);
    }

    /**
     * Mark this option as selected..
     */
    markAsSelected(emit: boolean) {
        this.isActive = true;
        this.changeDetectionRef.detectChanges();

        if (emit)
            this.onSelect.emit(this.value);
    }
}
