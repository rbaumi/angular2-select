import { NgModule }                     from '@angular/core';
import { BrowserModule  }               from '@angular/platform-browser';
import { HttpModule }                   from '@angular/http';
import { FormsModule,
         ReactiveFormsModule }          from '@angular/forms';
import { RouterModule }                 from '@angular/router';

import { appRoutes,
         authRoutingProviders }         from './app.routes';
import { TranslateModule }              from 'ng2-translate/ng2-translate';

import { SharedModule }                 from './shared/shared.module';

import { MdRippleModule }               from '@angular2-material/core';
import { MdButtonModule }               from '@angular2-material/button';
import { MdButtonToggleModule }         from '@angular2-material/button-toggle';
import { MdIconModule }                 from '@angular2-material/icon';
import { MdToolbarModule }              from '@angular2-material/toolbar';
import { MdTabsModule }                 from '@angular2-material/tabs'
import { MdCardModule }                 from '@angular2-material/card'
import { MdGridListModule }             from '@angular2-material/grid-list';
import { MdInputModule }                from '@angular2-material/input';
import { MdCheckboxModule }             from '@angular2-material/checkbox';
import { MdListModule }                 from '@angular2-material/list';
import { MdProgressBarModule }          from '@angular2-material/progress-bar';
import { MdProgressCircleModule }       from '@angular2-material/progress-circle';
import { MdRadioModule }                from '@angular2-material/radio';
import { MdSidenavModule }              from '@angular2-material/sidenav';
import { MdSlideToggleModule }          from '@angular2-material/slide-toggle';
import { MdSliderModule }               from '@angular2-material/slider';
import { MdTooltipModule }              from '@angular2-material/tooltip';
import { AlertComponent }               from 'ng2-bootstrap/components/alert';
import { AgmCoreModule,
    provideLazyMapsAPILoaderConfig }    from 'angular2-google-maps/core';

import { LoadingComponent }             from './shared/components/loading/loading.component'
import { MdDateTimePicker }             from './shared/components/md-date-time-picker/md-date-time-picker.component'
import { AutocompleteComponent }        from './shared/components/autocomplete/autocomplete.component';
import { FileUploaderComponent }        from './shared/components/file-uploader/file-uploader.component';
import { DatatableModule }              from './shared/components/datatable/datatable.module';

import { MenuComponent }                from './photostation/menu/menu.component';
import { AppComponent }                 from './app.component';
import { AuthComponent }                from './auth/auth.component';
import { LoginPageComponent }           from './auth/login/login.component';
import { PhotostationComponent }        from './photostation/photostation.component';
import { HomePageComponent }            from './photostation/home-page/home-page.component';
import { SettingsComponent }            from './photostation/settings/settings.component';
import { UserManagementComponent }      from './photostation/settings/user-management/user-management.component';
import { AccountsComponent }            from './photostation/settings/user-management/accounts/accounts.component';
import { AccountViewerComponent }       from './photostation/settings/user-management/accounts/account-viewer.component';
import { ResourcesComponent }           from './photostation/settings/user-management/resources/resources.component';
import { AlbumsComponent }              from './photostation/albums/albums.component';

import { Angular2SelectModule }         from '@baumi/angular2-select';

// Variable is taken from application config and passed to the view
// It is set as as global variable in template index.phtml.
declare var GOOGLE_API_KEY: string;

@NgModule({
    declarations: [
        LoadingComponent,
        AutocompleteComponent,
        // MdDateTimePicker,
        FileUploaderComponent,
        AlertComponent,

        MenuComponent,
        AppComponent,
        AuthComponent,
        LoginPageComponent,
        PhotostationComponent,
        HomePageComponent,
        SettingsComponent,
        UserManagementComponent,
        AccountsComponent,
        AccountViewerComponent,
        AlbumsComponent,
        ResourcesComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),

        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        TranslateModule.forRoot(),

        // global providers and services
        SharedModule.forRoot(),

        // Material Design
        MdRippleModule,
        MdIconModule,
        MdToolbarModule,
        MdButtonModule,
        MdButtonToggleModule,
        MdTabsModule,
        MdGridListModule,
        MdListModule,
        MdInputModule,
        MdCheckboxModule,
        MdProgressBarModule,
        MdProgressCircleModule,
        MdRadioModule,
        MdSidenavModule,
        MdSlideToggleModule,
        MdSliderModule,
        MdCardModule,
        MdTooltipModule,
        Angular2SelectModule,
        // Google Maps
        AgmCoreModule.forRoot(),

        // Datatable
        DatatableModule
    ],
    providers: [
        // here we keep only router providers
        // all other global providers are in SharedModule (./shared/shared.module.ts)
        authRoutingProviders,

        // for now this is the way of setting up GoogleMaps API key
        // pointed by the author of the component in this comment:
        // https://github.com/SebastianM/angular2-google-maps/issues/550#issuecomment-241249141
        // provideLazyMapsAPILoaderConfig({apiKey: GOOGLE_API_KEY})
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule {}
