import { Component }                    from '@angular/core';

@Component({
    selector: 'user-management',
    template: `
        <div class="page-container with-padding">
            <md-tab-group class="full-page with-vertical-padding">
                <md-tab>
                    <template md-tab-label>
                        <md-icon fontSet="fa" fontIcon="fa-puzzle-piece" class="tab-header">
                        </md-icon>
                        {{ 'SETTINGS_USER_MANAGEMENT_RESOURCES' | translate }}
                    </template>
                    <template md-tab-content>
                        <resources></resources>
                    </template>
                </md-tab>
                <md-tab>
                    <template md-tab-label>
                        <md-icon fontSet="fa" fontIcon="fa-user" class="tab-header">
                        </md-icon>
                        {{ 'SETTINGS_USER_MANAGEMENT_ACCOUNTS' | translate }}
                    </template>
                    <template md-tab-content>
                        <accounts></accounts>
                    </template>
                </md-tab>
                <md-tab>
                    <template md-tab-label>
                        <md-icon fontSet="fa" fontIcon="fa-shield" class="tab-header">
                        </md-icon>
                        {{ 'SETTINGS_USER_MANAGEMENT_ROLES' | translate }}
                    </template>
                    <template md-tab-content>
                    </template>
                </md-tab>
            </md-tab-group>
        </div>
    `,
    styles: [`
        md-icon.tab-header {
            margin-right: 10px;
        }
        div.go-back {
            position: absolute;
            top: 24px;
            right: 20px;
            cursor: pointer;
            font-size: medium;
        }
    `]
})
export class UserManagementComponent {}
