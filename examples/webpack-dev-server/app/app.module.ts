import { BrowserModule }                from "@angular/platform-browser";
import { NgModule }                     from "@angular/core";
import { FormsModule,
         ReactiveFormsModule }          from '@angular/forms';
import { AppComponent }                 from "./app.component";
import { Angular2SelectModule }         from "../../../index";

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
