import { Component,
         OnInit }                       from '@angular/core';
import { FormGroup,
         FormControl,
         Validators }                   from '@angular/forms';

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
            <form [formGroup]="demoForm" #f="ngForm">
                <h4>As formControl element:</h4>
                <bm-ng2-select
                    formControlName="person"
                    placeholder="Select person"
                    required=true
                    #person
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

    constructor() {

    }
    ngOnInit() {
        this.demoForm = new FormGroup({
            person: new FormControl(''),
            person2: new FormControl('')
        });
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
