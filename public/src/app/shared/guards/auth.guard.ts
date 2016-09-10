import { Injectable }                   from '@angular/core';
import { CanActivate }                  from '@angular/router';
import { CanDeactivate }                from '@angular/router';
import { Observable }                   from 'rxjs/Observable';

import { AuthService }                  from '../services/auth.service';

export interface CanComponentDeactivate {
    canDeactivate: () => boolean | Observable<boolean>;
}
@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
    canDeactivate(component: CanComponentDeactivate): Observable<boolean> | boolean {
        return component.canDeactivate ? component.canDeactivate() : true;
    }
}

@Injectable()
export class CanActivateGuard implements CanActivate {
    constructor(private authService: AuthService) { }
    canActivate() { return this.authService.canAccess(false); }
}

@Injectable()
export class CanActivateLogoutGuard implements CanActivate {
    constructor(private authService: AuthService) { }
    canActivate() { return this.authService.logout(); }
}

@Injectable()
export class CanActivateLoginGuard implements CanActivate {
    constructor(private authService: AuthService) { }
    canActivate() { return this.authService.canAccess(true); }
}
