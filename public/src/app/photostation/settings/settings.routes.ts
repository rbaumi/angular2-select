import { Routes }                       from '@angular/router';

import { SettingsComponent }            from './settings.component';
import { UserManagementComponent }      from './user-management/user-management.component';

import { CanActivateGuard }             from '../../shared/guards/auth.guard';
import { UserManegementRoutes }         from './user-management/user-management.routes';

export const SettingsRoutes: Routes = [{
    path:           'settings',
    canActivate:    [ CanActivateGuard ],
    children: [{
        path:           '',
        component:      SettingsComponent,
        canActivate:    [ CanActivateGuard ]
    },
    ...UserManegementRoutes
    ]
}];
