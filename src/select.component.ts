import { Component,
    EventEmitter,
    trigger,
    state,
    style,
    transition,
    animate,
    forwardRef,
    OnInit,
    ElementRef,
    ViewChild,
    AfterContentInit,
    Input,
    Output }                            from '@angular/core';
import { ControlValueAccessor,
    NG_VALUE_ACCESSOR }                 from '@angular/forms';
import { Angular2SelectService }        from './select.service';

@Component({
    moduleId: module.id,
    selector: 'bm-ng2-select',
    template: `
        <div class="bm-ng2-select-container">
            <md-input
                autoComplete="off"
                readOnly="true"
                (focus)="onEnter()"
                placeholder="{{placeholder}}"
                [value]="selectService.getSelectedText()"
                required="{{required}}">
            </md-input>
            <md-icon
                *ngIf="!required && selectService.getSelectedValue()"
                fontSet="fa"
                fontIcon="fa-times"
                (click)="clear($event)">
            </md-icon>
            <md-icon
                *ngIf="required && selectService.getSelectedValue()"
                fontSet="fa"
                fontIcon="fa-caret-down">
            </md-icon>
            <div class="options"
                *ngIf="selectService.isSelectorVisible()"
                [@animateState]="selectService.getSelectorAnimState()">
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
export class Angular2SelectComponent implements ControlValueAccessor, AfterContentInit {
    @Input() placeholder: string;
    @Input() required: boolean = false;
    @ViewChild('[selected]') selected: ElementRef;

    // to propagate change event to external form
    private propagateChange = (_: any) => { };

        // to propagate touch event to external form
    private propagateTouch = (_: any) => { };

    constructor(
        private el: ElementRef,
        private selectService: Angular2SelectService
    ) {
        console.log(this.el.nativeElement.find('li'));
    }

    ngAfterContentInit() {

    }

    writeValue(value: any) {
        if (value !== undefined) {
            this.selectService.setSelectedValue(value);
        }
    }

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn) {
        this.propagateTouch = fn;
    }

    onEnter() {
        this.propagateTouch(this.selectService.getSelectedValue());
        this.selectService.showSelector();
    }
    onClick(event) {
        if (!this.el.nativeElement.contains(event.target))
            this.selectService.hideSelector();
    }
    clear(event) {
        event.stopPropagation();
        this.selectService.setSelectedValue(null);
        this.selectService.setSelectedText(null);
    }
}
