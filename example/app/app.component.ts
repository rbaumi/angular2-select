import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
    <div>
        <h2>angular2-select</h2>
        <div style="width:300px;margin:20px;float:left;">
            <bm-ng2-select
                placeholder="Select an option"
                (selectionChanged)="onSelectionChange($event);">
                <bm-ng2-option value="1">Option 1</bm-ng2-option>
                <bm-ng2-option value="2" disabled="true">Option 2</bm-ng2-option>
                <bm-ng2-option value="3" selected="true">Option 3</bm-ng2-option>
                <bm-ng2-option value="4">Option 4</bm-ng2-option>
                <bm-ng2-option value="5">Option 5</bm-ng2-option>
                <bm-ng2-option value="6">Option 6</bm-ng2-option>
                <bm-ng2-option value="7">Option 7</bm-ng2-option>
            </bm-ng2-select>
            <bm-ng2-select
                placeholder="Select a country"
                (selectionChanged)="onSelectionChange($event);">
                <bm-ng2-option value="PL">Poland</bm-ng2-option>
                <bm-ng2-option value="US" disabled="true">USA</bm-ng2-option>
                <bm-ng2-option value="DK" selected="true">Denmark</bm-ng2-option>
                <bm-ng2-option value="FR">France</bm-ng2-option>
            </bm-ng2-select>
            <form>

            </form>
        </div>
        <div style="width:300px;margin:20px 20px 20px 20px;height: 50px;float: left;">
            Notifications:
            <br/>
            {{ message }}
        </div>
    </div>
  `,
})
export class AppComponent {
    private message: string;
    private messageClearTimeout: any;

    constructor() {

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

    onSelectionChange(value: string) {
        this.setMessage('Selection value has changed to: ' + value);
    }
}
