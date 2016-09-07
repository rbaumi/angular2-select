/// <reference path="../typings/index.d.ts" />

import { BrowserModule }                from "@angular/platform-browser";
import { NgModule }                     from "@angular/core";
import { FormsModule,
         ReactiveFormsModule }          from '@angular/forms';
import { AppComponent }                 from "./app.component";
import { Angular2SelectModule }         from "../../lib/angular2-select.module";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        Angular2SelectModule
    ],
    declarations: [ AppComponent ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
