import { NgModule}                      from '@angular/core';
import { BrowserModule }                from '@angular/platform-browser';
import { HttpModule }                   from '@angular/http';
import { FormsModule,
         ReactiveFormsModule }          from '@angular/forms';

import { MdRippleModule }               from '@angular2-material/core';
import { MdCardModule }                 from '@angular2-material/card';
import { MdInputModule }                from '@angular2-material/input';
import { MdIconModule,
        MdIconRegistry }                from '@angular2-material/icon';

import { Angular2SelectComponent }      from './select.component';
import { Angular2OptionComponent }      from './option.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        MdRippleModule,
        MdCardModule,
        MdInputModule,
        MdIconModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        MdIconRegistry
    ],
    declarations: [
        Angular2SelectComponent,
        Angular2OptionComponent
    ],
    exports: [
        Angular2SelectComponent,
        Angular2OptionComponent
    ]
})
export class Angular2SelectModule {
    private dom;
}