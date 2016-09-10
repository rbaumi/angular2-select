import { Component,
    OnInit,
    AfterViewInit,
    trigger,
    state,
    style,
    transition,
    animate }                           from '@angular/core';
import { Router }                       from '@angular/router';

import { AccountsService }              from './accounts.service';
import { User, Role }                   from '../../../../shared/interfaces/user-management.interface';
import { ApplicationService }           from '../../../../shared/services/application.service';
import * as _                           from 'underscore';

@Component({
    selector: 'accounts',
    templateUrl: 'accounts.template.html',
    styleUrls: ['accounts.styles.scss'],
    animations: [
        trigger('showToolbarState', [
            state('hidden', style({
                height: '0px',
                width: '0%',
                opacity: '0'
            })),
            state('visible', style({
                height: '30px',
                width: '100%',
                opacity: '1'
            })),
            transition('hidden => visible', animate('500ms ease-in'))
        ]),
        trigger('showAccountState', [
            state('false', style({
                width: '0%',
                opacity: '0',
                display: 'none'
            })),
            state('true, void', style({
                width: '100%',
                opacity: '0.9',
                display: 'block'
            })),
            transition('true <=> false', animate('300ms ease-in')),
            transition('void => false', animate('300ms ease-in'))
        ])
    ]

})
export class AccountsComponent implements OnInit, AfterViewInit {
    isUserListLoading: boolean = true;
    menuToolbarState: string = 'hidden';
    selectedFilterRole: Role;
    filterAccountName: string;

    constructor(
        private accountsService: AccountsService,
        private applicationService: ApplicationService,
        private router: Router) { }

    selectAccount(account: User) {
        this.router.navigateByUrl(`/photostation/settings/user-management/(aux:account/${account.id})`)
            .catch(err => console.log(err));
    }

    ngOnInit() {
        this.menuToolbarState = 'hidden';

        this.loadAccounts();
        this.loadRoles();
    }

    ngAfterViewInit() {
        _.delay(() => { this.menuToolbarState = 'visible'; }, 100);
    }

    private getRoles() {
        return this.accountsService.getRoles();
    }
    private loadRoles() {
        this.accountsService.loadRoles([])
            .subscribe(
                success => {
                    if (!success)
                        this.applicationService.disaplyApplicationInfo('APPLICATION_ERROR', 'danger');
                },
                err => { this.applicationService.disaplyApplicationInfo('APPLICATION_ERROR', 'danger'); }
            );
    }

    private getAccounts() {
        return this.accountsService.getAccounts();
    }
    private loadAccounts() {
        this.isUserListLoading = true;
        this.accountsService.loadAccounts([])
            .subscribe(
                success => {
                    if (!success)
                        this.applicationService.disaplyApplicationInfo('APPLICATION_ERROR', 'danger');

                    this.isUserListLoading = false;
                },
                err => { this.applicationService.disaplyApplicationInfo('APPLICATION_ERROR', 'danger'); }
            );
    }

    // private filterAccounts = _.debounce(function () {
    //     this.accounts = _.map(this.accounts, (acc: User) => {
    //         acc.animShow = (!this.filterAccountName || acc.name.toLowerCase().indexOf(this.filterAccountName) > -1) ? 'true' : 'false'
    //         return acc;
    //     })
    // }, 200);

    changeFilterAccountName(event) {
        //this.filterAccounts()
    }
    changeFilterRole(role) {
        this.selectedFilterRole = role;
    }
}
