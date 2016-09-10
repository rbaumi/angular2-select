import { NgModule,
         ModuleWithProviders }          from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { DatatableService }             from './datatable.service';
import { DatatableComponent }           from './datatable.component';
import { MdIconModule }                 from '@angular2-material/icon';

@NgModule({
    imports: [
        CommonModule,
        MdIconModule
    ],
    exports: [
        CommonModule,
        DatatableComponent
    ],
    declarations: [
        DatatableComponent
    ],
    providers: [
        DatatableService
    ]
})
export class DatatableModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DatatableModule,
            providers: [
                DatatableService
            ]
        };
    }
}
