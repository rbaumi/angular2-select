## angular2-select

Select box input module for Angular2 using Material Design. Based on [official angular2-seed](https://github.com/angular/angular2-seed).

See [demo plunker](https://embed.plnkr.co/uIMv76/).

![alt tag](https://s12.postimg.org/abgma5619/baumi_angular2_select.png)

### Dependencies

- Angular2 in version min. RC.6
- [@angular2-material modules](https://www.npmjs.com/~angular2-material):
    - [core](https://www.npmjs.com/package/@angular2-material/core)
    - [card](https://www.npmjs.com/package/@angular2-material/card)
    - [icon](https://www.npmjs.com/package/@angular2-material/icon)
    - [input](https://www.npmjs.com/package/@angular2-material/input)

### Instalation

    npm install @baumi/angular2-select --save

### Usage

Import module:

```ts
import { Angular2SelectModule } from '@baumi/angular2-select';
...
@NgModule({
    imports: [
        Angular2SelectModule,
        ...
    ],
    ...
})
```

Use it in the template:

```html
<bm-ng2-select
    placeholder="Select a country"
    (selectionChanged)="onSelectionChange($event);">
    <bm-ng2-option value="PL">Poland</bm-ng2-option>
    <bm-ng2-option value="US" disabled="true">USA</bm-ng2-option>
    <bm-ng2-option value="DK" selected="true">Denmark</bm-ng2-option>
    <bm-ng2-option value="FR">France</bm-ng2-option>
</bm-ng2-select>
```

The ```<bm-ng2-select>``` component fully support two-way binding of ngModel, as if it was a normal ```<input>``` and can be also used as a ```formControl``` element:

```ts
export class AppComponent implements OnInit {
    private demoForm: FormGroup;

    constructor() {}
    ngOnInit() {
        this.demoForm = new FormGroup({
            person: new FormControl('')
        });
    }
}
```

```html
<form [formGroup]="demoForm">
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
```

### Development

- Clone or fork this repository
- Make sure you have [node.js](https://nodejs.org/) installed version 5+
- Make sure you have NPM installed version 3+
- `WINDOWS ONLY` run `npm install -g webpack webpack-dev-server typings typescript` to install global dependencies
- run `npm install` to install dependencies
- `WINDOWS ONLY` run `npm run typings-install` to install typings
- run `npm start` to fire up dev server
- open browser to [`http://localhost:5000`](http://localhost:5000)
