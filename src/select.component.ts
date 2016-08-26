import { Component,
    EventEmitter,
    trigger,
    state,
    style,
    transition,
    animate,
    forwardRef,
    ElementRef,
    Renderer,
    ContentChildren,
    ViewChild,
    QueryList,
    AfterViewInit,
    Input,
    HostListener,
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
                #internalInput
                autoComplete="off"
                readOnly="true"
                [(ngModel)] = "selection.text"
                (focus)="onEnter($event)"
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
                fontIcon="fa-caret-down"
                (click)="open($event)">
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
    }]
})
export class Angular2SelectComponent implements ControlValueAccessor, AfterViewInit {
    @Input() placeholder: string;
    @Input() required: boolean = false;
    @Output() selectionChanged: EventEmitter<string> = new EventEmitter();
    @ViewChild('internalInput') internalInput;
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
        private renderer: Renderer,
        private changeDetectionRef: ChangeDetectorRef
    ) { }

    ngAfterViewInit() {
        this.options.forEach((option) => {
            option.onSelect.subscribe(
                value => {
                    this.unselectAllOtherOptions(value);
                    this.markSelectionOnPlaceholder(option, true);
                    this.hideOptions();
                }
            );
            if (option.selected)
                this.selection.value = option.value;
        });

        // now we can setup text property.
        // we could do this above when looping through options and finding selected one,
        // but it will work only in case we have a property selected in option.
        // in case we use selector in form and set data for it using [(ngModel)]
        // we ahve only value of selection (function writeValue is called before the view is initiaded).
        this.selectOption(this.selection.value)
        this.changeDetectionRef.detectChanges();
    }

    selectOption(value: string) {
        // options is undefined when called before view is initiaded
        // which is the first call of writeValue
        if (typeof this.options == 'undefined')
            this.selection.value = value;
        else {
            let option = this.options.filter(opt => {
                return opt.value == value;
            });
            if (option && option.length) {
                option[0].markAsSelected(false);
                this.selection.text = option[0].text;
            }
        }
    }

    writeValue(value: string) {
        if (value !== undefined) {
            this.selection.value = value;
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
    showOptions() {
        this.areOptionsVisible = true;
        this.animateState = 'visible';
    }
    hideOptions() {
        this.animateState = 'hidden';
        setTimeout(() => { this.areOptionsVisible = false; }, 300);
    }

    onEnter() {
        // when the md-input field get focused than the document is not receiving the click event
        // (maybe because the md-input stops propagating it)
        // in this case we have trigger the click event manually on the component
        // so it will close other open selec boxes as this event is propagated down to document
        let event = new MouseEvent('click', {bubbles: true});
        this.renderer.invokeElementMethod(this.el.nativeElement, 'dispatchEvent', [event]);

        // propagate touch event. Part of ControlValueAccessor interface.
        this.propagateTouch(this.selection.value);

        // open selector options
        this.showOptions();
    }

    /**
     * Function binds click event to the document. The options will hide whenever
     * user click anywhere outside the selector.
     * TODO: make it as an Input so the default behaviour can be configured
     * @param event MouseEvent
     */
    @HostListener('document:click', ['$event'])
    onClick(event) {
        // check if the element that was clicked is contained within this component
        // if not just hide the options
        if (!this.el.nativeElement.contains(event.target))
            this.hideOptions();
    }

    /**
     * Deselect current selection
     * @param event MouseEvent
     */
    clear(event) {
        // we have to stop propagation to not to open the options when
        // clear icon is being clicked
        event.stopPropagation();
        this.selection = {
            value: null,
            text: ''
        };
        // make sure the options are maked ad not active
        this.unselectAllOtherOptions('');
        // emit the event
        this.selectionChanged.emit(null);
    }

    /**
     * Opend options
     * @param event MouseEvent
     */
    open(event) {
        event.stopPropagation();
        this.internalInput.focus();
    }
}
