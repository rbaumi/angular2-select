import { Component,
    Input,
    Output,
    EventEmitter,
    trigger,
    state,
    style,
    transition,
    keyframes,
    animate,
    forwardRef }                        from "@angular/core";
import { ControlValueAccessor,
    NG_VALUE_ACCESSOR }                 from '@angular/forms';
import * as _                           from 'underscore';

@Component({
    selector: "autocomplete",
    template: `
        <div class="autocomplete-container">
            <md-input
                autoComplete="off"
                readonly="{{readonly}}"
                (focus)="onEnter()"
                (blur)="onLeave()"
                (keyup)= "onKeyUp($event)"
                [(ngModel)] = "searchText"
                placeholder="{{placeholder}}"
                required="{{required}}">
            </md-input>
            <md-icon
                *ngIf="clearable"
                fontSet="fa"
                fontIcon="fa-times"
                (click)="clear()">
            </md-icon>
            <md-icon
                *ngIf="!clearable"
                fontSet="fa"
                fontIcon="fa-ellipsis-h">
            </md-icon>

            <div class="md-whiteframe-z1 autocomplete-list" *ngIf="popupVisible">
                <div class="autocomplete-list-elements" [@animateState]="animateState">
                    <ul class="autocomplete-suggestions">
                        <li
                            *ngFor= "let item of matches"
                            (mousedown)="select(item)"
                            [class.selected]="selectedItem && selectedItem[itemValue] == item[itemValue]">

                            <p>{{item[itemText]}}</p>
                            <md-divider></md-divider>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['autocomplete.styles.scss'],
    animations: [
        trigger('animateState', [
            state('hidden', style({
                transform: 'rotateX(-90deg)'
            })),
            state('visible', style({
                transform: 'rotateX(0deg)'
            })),
            transition('hidden => visible', animate(500, keyframes([
                style({ opacity: 0, transform: 'rotateX(-89deg)', offset: 0 }),
                style({ transform: 'rotateX(35deg)', offset: 0.45 }),
                style({ opacity: 1, transform: 'rotateX(0deg)', offset: 1.0 })
            ])))
        ])
    ],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AutocompleteComponent),
        multi: true
    }]
})
export class AutocompleteComponent implements ControlValueAccessor {
    @Input() placeholder: string;
    @Input() required: boolean = false;
    @Input() clearable: boolean = false;
    @Input() forceMatch: boolean = false;
    @Input() readonly: boolean = false;
    @Input() matches = null;
    @Input() itemText: string;
    @Input() itemValue: string = 'id';
    @Output() searchTextChange = new EventEmitter();

    private propagateChange = (_: any) => { };
    private propagateTouch = (_: any) => { };

    private selectedItem;
    private popupVisible = false;
    private searchText: string = '';
    private animateState: string = 'hidden';

    writeValue(value: any) {
        if (value !== undefined) {
            this.selectedItem = value;
            let selectedItem = this.selectedItem;
            let itemValue = this.itemValue
            let matches = _.filter(this.matches, function(item) { return item[itemValue] == selectedItem[itemValue]; });
            if (matches.length) {
                this.searchText = matches[0][this.itemText];
            }
        }
    }

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn) {
        this.propagateTouch = fn;
    }

    onEnter() {
        this.propagateTouch(this.selectedItem);

        this.setMatches();
        this.showPopup();
    }

    onLeave() {
        if (this.forceMatch && !this.selectedItem) {
            if (this.matches && this.matches.length == 1) {
                this.select(this.matches[0]);
                return;
            }
            this.searchText = '';
        }
        this.hidePopup();
    }

    showPopup() {
        this.popupVisible = true;

        _.delay(() => {
            this.animateState = 'visible';
        }, 100);
    }
    hidePopup() {
        this.popupVisible = false;
        this.animateState = 'hidden';
    }

    clear() {
        this.searchText = '';
        this.selectedItem = null;
        this.setMatches();
    }

    onKeyUp(event) {
        this.searchText = event.target.value;
        this.setMatches();
        this.selectedItem = null;
        this.propagateChange(this.selectedItem);
    }

    select(item) {
        this.propagateChange(item);

        this.selectedItem = item;
        this.searchText = item[this.itemText];
        this.setMatches();
        this.hidePopup();
    }

    private setMatches() {
        this.searchTextChange.emit(this.searchText);
    }
}
