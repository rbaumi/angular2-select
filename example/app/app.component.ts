import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
    <div>
        <h2>angular2-select</h2>
        <div style="width:300px;margin:20px;">
            <bm-ng2-select
                placeholder="Select a country"
                value="3">
                <bm-ng2-option value="1">Option 1</bm-ng2-option>
                <bm-ng2-option value="2" disabled="true">Option 2</bm-ng2-option>
                <bm-ng2-option value="3">Option 3</bm-ng2-option>
                <bm-ng2-option value="4">Option 4</bm-ng2-option>
                <bm-ng2-option value="5">Option 5</bm-ng2-option>
                <bm-ng2-option value="6">Option 6</bm-ng2-option>
                <bm-ng2-option value="7">Option 7</bm-ng2-option>
            </bm-ng2-select>
        </div>
    </div>
  `,
})
export class AppComponent {
    constructor() {

    }
}
