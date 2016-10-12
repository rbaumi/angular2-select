import { NgModule}                      from '@angular/core';
import { BrowserModule }                from '@angular/platform-browser';
import { HttpModule }                   from '@angular/http';
import { FormsModule,
         ReactiveFormsModule }          from '@angular/forms';

import { MaterialModule,
         MdIconRegistry }               from '@angular/material';

import { Angular2SelectComponent }      from './component/select.component';
import { Angular2OptionComponent }      from './component/option.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        MaterialModule,
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
    
}