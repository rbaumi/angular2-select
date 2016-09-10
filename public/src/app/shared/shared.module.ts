import { NgModule,
         ModuleWithProviders}           from '@angular/core';
import { CommonModule }                 from '@angular/common';

import { MdIconRegistry }               from '@angular2-material/icon';
import { provideAuth }                  from 'angular2-jwt';

import { GeoService }                   from './services/geo.service';
import { ApplicationService }           from './services/application.service';
import { AuthService }                  from './services/auth.service';
import { AccountsService }              from './../photostation/settings/user-management/accounts/accounts.service';
import { PhotostationService }          from './../photostation/photostation.service';

@NgModule({
    imports: [ CommonModule ],
    exports: [ CommonModule ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                MdIconRegistry,
                provideAuth({
                    headerName: 'Authorization',
                    headerPrefix: 'Bearer',
                    tokenName: 'jwt',
                    globalHeaders: [{ 'Content-Type': 'application/json' }]
                }),
                ApplicationService,
                AuthService,
                AccountsService,
                PhotostationService,
                GeoService
            ]
        };
    }
}
