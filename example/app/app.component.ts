import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
    <div>
        <h2>angular2-select</h2>
        <div>
            <bm-ng2-select>
                <bm-ng2-option></bm-ng2-option>
                <bm-ng2-option value="1">Option 1</bm-ng2-option>
            </bm-ng2-select>
        </div>
    </div>
  `,
})
export class AppComponent {
    constructor() {

    }
}
