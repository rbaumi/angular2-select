import { Injectable }                   from '@angular/core';
import { Response }                     from '@angular/http';

import { AuthHttp }                     from 'angular2-jwt';
import { Observable }                   from 'rxjs/Observable';
import * as map                         from 'rxjs/add/operator/map';
import * as share                       from 'rxjs/add/operator/share';

import { User, Role }                   from '../../../../shared/interfaces/user-management.interface';
import { StandardResponse }             from '../../../../shared/interfaces/api-response.interface';

import { ApplicationService }           from '../../../../shared/services/application.service';
import { PhotostationService }          from '../../../photostation.service';
import * as _                           from 'underscore';

@Injectable()
export class AccountsService {
    private roles: Role[];
    private accounts: User[];
    private accountsLoader: Observable<boolean> = null;

    constructor(
        private authHttp: AuthHttp,
        private applicationService: ApplicationService,
        private photostationService: PhotostationService
    ) { }

    public getAccounts() : User[] {
        return this.accounts;
    }

    public loadAccounts(filters : Object[]): Observable<boolean> {
        if (!this.accountsLoader)
            this.accountsLoader = this.authHttp.get('/api/users?filter=' + JSON.stringify(filters))
                .map(result => result.json())
                .map(resultJson => {
                    // we expect array. if we got object that we will check the flag success
                    // if its false than we display error message and return empty array
                    if (this.applicationService.isNoSuccess(resultJson)) {
                        this.applicationService.disaplyApplicationInfo(resultJson.message ? resultJson.message : 'APPLICATION_ERROR', 'danger');
                        return false;
                    }

                    this.accounts = resultJson;
                    _.each(this.accounts, (account, idx) => {
                        if (account.id == this.photostationService.getCurrentUser().id) {
                            this.accounts[idx] = this.photostationService.getCurrentUser();
                        }
                    });
                    this.accountsLoader = null;
                    return true;
                }).share();

        return this.accountsLoader;
    }

    public updateAccount (user: User): Observable<StandardResponse> {
        let acc = _.clone(user);
        delete(acc.avatar);

        return this.authHttp.put('/api/users/' + user.id, JSON.stringify(acc))
            .map(result => result.json());
    }

    public getRoles() : Role[] {
        return this.roles;
    }
    public loadRoles(filters : Object[]) : Observable<boolean> {
        return this.authHttp.get('/api/roles?filter=' + JSON.stringify(filters))
            .map(result => result.json())
            .map(resultJson => {
                // we expect array. if we got object that we will check the flag success
                // if its false than we display error message and return empty array
                if (this.applicationService.isNoSuccess(resultJson)) {
                    this.applicationService.disaplyApplicationInfo(resultJson.message ? resultJson.message : 'APPLICATION_ERROR', 'danger');
                    return false;
                }

                this.roles = resultJson;
                return true;
            });
    }

}
