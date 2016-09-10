import { Routes, RouterModule }  from '@angular/router';

import { AuthRoutes }                   from './auth/auth.routes';
import { PhotostationRoutes }           from './photostation/photostation.routes';

import { CanActivateGuard,
         CanActivateLogoutGuard,
         CanActivateLoginGuard,
         CanDeactivateGuard, }          from './shared/guards/auth.guard';
import { AuthService }                  from './shared/services/auth.service';

export const appRoutes: Routes = [
    ...AuthRoutes,
    ...PhotostationRoutes,

    // all other that doesn't match
    { path: '', redirectTo: '/photostation', pathMatch: 'full'}
];

export const authRoutingProviders: any[] = [
    CanActivateGuard,
    CanActivateLogoutGuard,
    CanActivateLoginGuard,
    CanDeactivateGuard,
    AuthService
];
