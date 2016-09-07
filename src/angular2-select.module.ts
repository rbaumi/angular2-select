/// <reference path="../typings/index.d.ts" />

import { NgModule,
         ModuleWithProviders}           from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { BrowserModule }                from '@angular/platform-browser';
import { HttpModule }                   from '@angular/http';
import { FormsModule,
         ReactiveFormsModule }          from '@angular/forms';

import { MdRippleModule }               from '@angular2-material/core';
import { MdCardModule }                 from '@angular2-material/card';
import { MdInputModule }                from '@angular2-material/input';
import { MdIconModule }                 from '@angular2-material/icon';

import { Angular2SelectComponent }      from './select.component';
import { Angular2OptionComponent }      from './option.component';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        HttpModule,
        MdRippleModule,
        MdCardModule,
        MdInputModule,
        MdIconModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        Angular2SelectComponent,
        Angular2OptionComponent
    ],
    exports: [
        Angular2SelectComponent,
        Angular2OptionComponent,
        CommonModule
    ]
})
export class Angular2SelectModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: Angular2SelectModule
        };
    }
}
