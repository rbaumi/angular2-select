import { Component,
    EventEmitter,
    trigger,
    state,
    style,
    transition,
    animate,
    forwardRef,
    ElementRef,
    ContentChildren,
    QueryList,
    AfterViewInit,
    Input,
    Output,
    ChangeDetectorRef }                 from '@angular/core';
import { ControlValueAccessor,
    NG_VALUE_ACCESSOR }                 from '@angular/forms';
import { Angular2OptionComponent }      from './option.component';

export interface Selection {
    value: string;
    text: string;
}

@Component({
    moduleId: module.id,
    selector: 'bm-ng2-select',
    template: `
        <div class="bm-ng2-select-container">
            <md-input
                autoComplete="off"
                readOnly="true"
                [(ngModel)] = "selection.text"
                (focus)="onEnter()"
                placeholder="{{placeholder}}"
                required="{{required}}">
            </md-input>
            <md-icon
                *ngIf="!required && selection.value"
                fontSet="fa"
                fontIcon="fa-times"
                (click)="clear($event)">
            </md-icon>
            <md-icon
                *ngIf="required && selection.value"
                fontSet="fa"
                fontIcon="fa-caret-down">
            </md-icon>
            <div class="options"
                [hidden]="!areOptionsVisible"
                [@animateState]="animateState">
                <md-card>
                    <ul>
                        <ng-content></ng-content>
                    </ul>
                </md-card>
            </div>
        </div>
    `,
    styleUrls: [
        'select.styles.min.css'
    ],
    animations: [
        trigger('animateState', [
            state('hidden', style({
                opacity: 0,
                height: 0
            })),
            state('visible', style({
                opacity: 1,
                height: 'auto'
            })),
            transition('hidden => visible', animate(300)),
            transition('visible => hidden', animate(150))
        ])
    ],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => Angular2SelectComponent),
        multi: true
    }],
    host: {
        '(document:click)': 'onClick($event)',
    }
})
export class Angular2SelectComponent implements ControlValueAccessor, AfterViewInit {
    @Input() placeholder: string;
    @Input() required: boolean = false;
    @Output() selectionChanged: EventEmitter<string> = new EventEmitter();

    @ContentChildren(Angular2OptionComponent) options: QueryList<Angular2OptionComponent>;

    private selection: Selection = {
        value: null,
        text: ''
    };
    private areOptionsVisible: boolean = false;
    private animateState: string = 'hidden';


    // to propagate change event to external form
    private propagateChange = (_: any) => { };

    // to propagate touch event to external form
    private propagateTouch = (_: any) => { };

    constructor(
        private el: ElementRef,
        private changeDetectionRef: ChangeDetectorRef
    ) { }

    ngAfterViewInit() {
        this.options.forEach((option) => {
            option.onSelect.subscribe(
                value => {
                    this.unselectAllOtherOptions(value);
                    this.markSelectionOnPlaceholder(option, true);
                    this.hideSelector();
                }
            );
            if (option.selected)
                this.markSelectionOnPlaceholder(option, false);
        });
        this.changeDetectionRef.detectChanges();
    }

    writeValue(value: string) {
        if (value !== undefined) {
            //    this.selectService.setSelectedValue(value, false);
        }
    }

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn) {
        this.propagateTouch = fn;
    }

    markSelectionOnPlaceholder(option: Angular2OptionComponent, emit: boolean) {
        this.selection = {
            value: option.value,
            text: option.text
        };
        if (emit)
            this.selectionChanged.emit(option.value);
    }
    unselectAllOtherOptions(value: string) {
        this.options.forEach((option) => {
            if (option.value != value)
                option.unselect();
        });
    }
    showSelector() {
        this.areOptionsVisible = true;
        this.animateState = 'visible';
    }
    hideSelector() {
        this.animateState = 'hidden';
        setTimeout(() => { this.areOptionsVisible = false; }, 300);
    }

    onEnter() {
        this.propagateTouch(this.selection.value);
        this.showSelector();
    }
    onClick(event) {
        if (!this.el.nativeElement.contains(event.target))
            this.hideSelector();
    }
    clear(event) {
        event.stopPropagation();
        this.selection = {
            value: null,
            text: ''
        };
        this.unselectAllOtherOptions('');
        this.selectionChanged.emit(null);
    }
}
