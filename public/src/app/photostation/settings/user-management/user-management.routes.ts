import { Routes }                       from '@angular/router';

import { UserManagementComponent }      from './user-management.component';
import { AccountViewerComponent }       from './accounts/account-viewer.component';

import { CanActivateGuard }             from '../../../shared/guards/auth.guard';

export const UserManegementRoutes: Routes = [{
    path:           'user-management',
    canActivate:    [ CanActivateGuard ],
    children: [{
        path:           '',
        component:      UserManagementComponent,
        canActivate:    [ CanActivateGuard ]
    }, {
        path:           'account/:id',
        component:      AccountViewerComponent,
        canActivate:    [ CanActivateGuard ],
        outlet:         'aux'
    }]
}];
