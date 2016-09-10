import { Routes }                       from '@angular/router';

import { PhotostationComponent }        from './photostation.component';
import { HomePageComponent }            from './home-page/home-page.component';
import { AlbumsComponent }              from './albums/albums.component';

import { SettingsRoutes }               from './settings/settings.routes';
import { CanActivateGuard }             from '../shared/guards/auth.guard';

export const PhotostationRoutes : Routes = [{
    path: 'photostation',
    component: PhotostationComponent,
    children: [{
        path: '',
        component:      HomePageComponent,
        canActivate:    [ CanActivateGuard ]
    }, {
        path: 'albums',
        component:      AlbumsComponent,
        canActivate:    [ CanActivateGuard ]
    },
    ...SettingsRoutes
    ]
}];
