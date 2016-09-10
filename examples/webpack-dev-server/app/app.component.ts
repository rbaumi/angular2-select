import { Component,
         OnInit }                       from '@angular/core';
import { FormGroup,
         FormControl,
         Validators }                   from '@angular/forms';
 import { Observable }                  from 'rxjs/Observable';
 import 'rxjs/add/observable/from';
 import 'rxjs/add/operator/delay';

export class Option {
    value: string;
    name: string;
    selected?: boolean;
    disabled?: boolean;
}

@Component({
    selector: 'my-app',
    styles: [`
        div.selector-container {
            width:200px;
            margin:20px;
            float:left;
        }
        div.notifications {
            position: fixed;
            bottom:0;
            padding:40px;
        }
        div.error {
            color: red;
        }
        div.divider {
            clear:both;
            margin:20px;
        }
    `],
    template: `
    <div>
        <h2>angular2-select</h2>
        <div class="selector-container">
            <h4>Simple selector:</h4>
            <bm-ng2-select
                placeholder="Select a country"
                (selectionChanged)="onSelectionChange('Country', $event);">
                <bm-ng2-option value="PL">Poland</bm-ng2-option>
                <bm-ng2-option value="US" disabled="true">USA</bm-ng2-option>
                <bm-ng2-option value="DK" selected="true">Denmark</bm-ng2-option>
                <bm-ng2-option value="FR">France</bm-ng2-option>
            </bm-ng2-select>
        </div>
        <div class="selector-container">
            <h4>Asynchronously loaded:</h4>
            <bm-ng2-select
                placeholder="Select an item"
                (selectionChanged)="onSelectionChange('Item', $event);">
                <bm-ng2-option
                    *ngFor="let item of selectorOptions"
                    value="{{item.value}}"
                    selected="{{item.selected}}"
                    disabled="{{item.disabled}}">{{item.name}}</bm-ng2-option>
            </bm-ng2-select>
        </div>
        <div class="divider"></div>
        <div class="selector-container">
            <form [formGroup]="demoForm">
                <h4>Model driven form:</h4>
                <bm-ng2-select
                    formControlName="person"
                    placeholder="Select person"
                    required=true
                    (selectionChanged)="onSelectionChange('Name', $event);">
                    <bm-ng2-option value="ANNA">Anna</bm-ng2-option>
                    <bm-ng2-option value="NATALIA">Natalia</bm-ng2-option>
                    <bm-ng2-option value="KASIA">Kasia</bm-ng2-option>
                </bm-ng2-select>
            </form>
            <div class="error" *ngIf="!demoForm.controls.person.valid">
                This field is required
            </div>
        </div>
        <div class="selector-container">
            <form #f="ngForm">
                <h4>Template driven form:</h4>
                <bm-ng2-select
                    [(ngModel)]="formName"
                    name="color"
                    placeholder="Select color"
                    (selectionChanged)="onSelectionChange('Color', $event);">
                    <bm-ng2-option value="RED">Red</bm-ng2-option>
                    <bm-ng2-option value="BLACK">Black</bm-ng2-option>
                    <bm-ng2-option value="YELLOW">Yellow</bm-ng2-option>
                </bm-ng2-select>
            </form>
        </div>
        <div class="notifications">
            Notifications: {{ message }}
        </div>
    </div>
  `,
})
export class AppComponent implements OnInit {
    private message: string;
    private messageClearTimeout: any;
    private demoForm: FormGroup;
    private selectorOptions: Option[] = [];
    private formName: string = 'YELLOW';

    constructor() {

    }
    ngOnInit() {
        this.demoForm = new FormGroup({
            person: new FormControl('')
        });

        this.getAsynchronously();
    }

    getAsynchronously() {
        let options: Option[] = [{
            value: 'SOFA',
            name: 'Sofa'
        }, {
            value: 'TV',
            name: 'TV',
            selected: true
        }, {
            value: 'TABLE',
            name: 'Table',
            disabled: true
        }];

        let subscription = Observable.from(options).delay(1000).subscribe(
            option => {
                this.selectorOptions.push(option);
            },
            err => {
                console.log(err);
            },
            () => {
                this.setMessage('Content of selector asynchronously loaded!');
            }
        );

    }

    setMessage(msg: string) {
        this.message = msg;
        this.clearMessage();
    }
    clearMessage() {
        if (this.messageClearTimeout)
            clearTimeout(this.messageClearTimeout);

        this.messageClearTimeout = setTimeout(() => { this.message = null; }, 2000);
    }

    onSelectionChange(selector: string, value: string) {
        this.setMessage('Selector ' + selector + ' value has changed to: ' + value);
    }
}
