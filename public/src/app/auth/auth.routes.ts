import { Routes }                       from '@angular/router';

import { AuthComponent }                from './auth.component';
import { LoginPageComponent }           from './login/login.component';

import { CanActivateLogoutGuard,
         CanActivateLoginGuard }        from '../shared/guards/auth.guard';

export const AuthRoutes: Routes = [{
    path: 'auth',
    component: AuthComponent,
    children: [{
        path: '',
        component:      LoginPageComponent,
        canActivate:    [ CanActivateLoginGuard ]
    }, {
        path: 'logout',
        canActivate:    [ CanActivateLogoutGuard ]
    }]
}];
