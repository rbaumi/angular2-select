/**
 * MdDateTimePicker component is build on the top of md-date-time-picker project:
 * https://puranjayjain.github.io/md-date-time-picker/
 */
import { Component,
    ViewEncapsulation,
    Input,
    Output,
    EventEmitter,
    OnInit,
    OnDestroy,
    AfterViewInit,
    ElementRef,
    Renderer,
    forwardRef }                   from '@angular/core';
import { ControlValueAccessor,
    NG_VALUE_ACCESSOR }            from '@angular/forms';
import * as moment                 from 'moment';
//import mdDateTimePicker            from "md-date-time-picker";

declare var mdDateTimePicker;

@Component({
    selector: 'md-date-time-picker',
    template: `
        <div class="md-date-time-picker-overlay" *ngIf="isDialogVisible"></div>
        <md-input
            readOnly="true"
            placeholder="{{placeholder}}"
            (focus)="onEnter()"
            [(ngModel)] = "presentedDate"
            #calendarInput
        ></md-input>
        <md-icon
            fontSet="fa"
            fontIcon="fa-calendar"
            (click)="calendarInput.focus()">
        </md-icon>
        <input type="hidden" id="{{inputId}}" >
    `,
    styles: [`
        md-date-time-picker {
            position: relative;
            cursor: pointer;
        }
        div.md-date-time-picker-overlay {
            position: fixed;
            top:0;
            left:0;
            width:100%;
            height:100%;
            z-index: 15;
            cursor: default;
            background: black;
            opacity: .7;
        }
        md-date-time-picker md-input {
            width: 100%  !important;
            cursor: pointer;
        }
        md-date-time-picker md-input input {
            cursor: pointer !important;
        }
        md-date-time-picker md-icon {
            position: absolute;
            right: 10px;
            top: -5px;
            display: block !important;
            color: #517F85;
        }
        .mddtp-picker .mddtp-picker__header .mddtp-picker__title {
            font-size: 28px !important;
        }
        .mddtp-picker-date .mddtp-picker__left {
            background-image: url("/node_modules/md-date-time-picker/dist/images/ic_keyboard_arrow_left_black_24px.svg") !important;
        }
        .mddtp-picker-date .mddtp-picker__right {
            background-image: url("/node_modules/md-date-time-picker/dist/images/ic_keyboard_arrow_right_black_24px.svg") !important;
        }
        .mddtp-picker-date .mddtp-picker__left:disabled {
            background-image: url("/node_modules/md-date-time-picker/dist/images/ic_keyboard_arrow_left_black_disabled_24px.svg") !important;
        }
        .mddtp-picker-date .mddtp-picker__right:disabled {
            background-image: url("/node_modules/md-date-time-picker/dist/images/ic_keyboard_arrow_right_black_disabled_24px.svg") !important;
        }
    `],
    styleUrls: [
        '../../../../../node_modules/md-date-time-picker/dist/css/mdDateTimePicker.scss'
    ],
    encapsulation: ViewEncapsulation.None,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => MdDateTimePicker),
        multi: true
    }]
})
export class MdDateTimePicker implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
    @Input() placeholder: string;
    @Input() type: string = 'date';
    @Input() format: string = 'YYYY-MM-DD';
    @Input() presentationFormat: string = 'DD MMM YYYY';

    private dialog: any;
    private isDialogVisible: boolean = false;
    private presentedDate: string;
    private inputId: string = this.generateRandomId();
    private propagateChange = (_: any) => { };
    private propagateTouch = (_: any) => { };

    /**
     * @param onOkListenFunc will hold the function returned by "renderer.listen"
     */
    private onOkListenFunc: Function;

    /**
     * @param onCancelListenFunc will hold the function returned by "renderer.listen"
     */
    private onCancelListenFunc: Function;

    constructor(private pickerElement: ElementRef, private renderer: Renderer) { }

    private generateRandomId(): string {
        return 'md-date-time-picker-' + Math.random().toString(36).substring(7);
    }

    ngOnInit() {
        this.dialog = new mdDateTimePicker({
            type: this.type,                            // date / time
            past: moment().subtract(80, 'years'),       // first date
            mode: true ,                                // for 24-hour format
            init: this.presentedDate ? moment(this.presentedDate) : moment()
        });
    }

    ngAfterViewInit() {
        this.dialog.trigger = document.getElementById(this.inputId);

        this.onOkListenFunc = this.renderer.listen(
            this.pickerElement.nativeElement.querySelector('#' + this.inputId), 'onOk', (event) => {
                this.isDialogVisible = false;
                this.presentedDate = this.dialog.time.format(this.presentationFormat);

                this.propagateChange(this.dialog.time.format(this.format));
            });
        this.onCancelListenFunc = this.renderer.listen(
            this.pickerElement.nativeElement.querySelector('#' + this.inputId), 'onCancel', (event) => {
                this.isDialogVisible = false;
            });
    }
    /**
     * When destroying component we need to get rid of listeners.
     * We have to execute both functions to remove the respectives listeners.
     */
    ngOnDestroy() {
        // Removes "onOk" listener
        this.onOkListenFunc();

        // Removes "onCancel" listener
        this.onCancelListenFunc();
    }

    writeValue(value: any) {
        if (value !== undefined) {
            this.presentedDate = moment(value).format(this.presentationFormat);
            this.dialog.time = moment(value);
        }
    }

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn) {
        this.propagateTouch = fn;
    }

    onEnter() {
        this.propagateTouch(this.presentedDate);
        this.isDialogVisible = true;
        this.dialog.toggle();
    }
}
