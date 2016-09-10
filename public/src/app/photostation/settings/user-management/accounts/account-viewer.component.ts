import { Component,
    OnInit,
    OnDestroy,
    trigger,
    state,
    style,
    transition,
    animate }                           from '@angular/core';
import { DomSanitizer,
    SafeStyle }                         from '@angular/platform-browser';
import { ActivatedRoute }               from '@angular/router';
import { Subscription }                 from 'rxjs/Subscription';
import { FormGroup,
    FormControl,
    Validators }                        from '@angular/forms';
import { MouseEvent }                   from 'angular2-google-maps/core';

import { User, Gender, Address }        from '../../../../shared/interfaces/user-management.interface';
import { StandardResponse }             from '../../../../shared/interfaces/api-response.interface';

import { AccountsService }              from './accounts.service';
import { TranslateService }             from 'ng2-translate/ng2-translate';
import { ApplicationService }           from '../../../../shared/services/application.service';
import { GeoService }                   from '../../../../shared/services/geo.service';
import * as _                           from 'underscore';

@Component({
    selector: 'account-viewer',
    templateUrl: 'account-viewer.template.html',
    styleUrls: ['account-viewer.styles.scss'],
    animations: [
        trigger('animateState', [
            state('hidden', style({
                height: '0px',
                width: '0%',
                opacity: '0'
            })),
            state('visible', style({
                height: '100%',
                width: '100%',
                opacity: '1'
            })),
            transition('hidden => visible', animate('500ms ease-in'))
        ])
    ]
})
export class AccountViewerComponent implements OnInit, OnDestroy {

    private account: User;
    private isViewerLoading: boolean = true;
    private isViewerUpdating: boolean = false;
    private genders: Gender[];
    private animateState: string = 'hidden';
    private hasBaseDropZoneOver: boolean = false;
    private trustedAvatarBackgroundStyle: SafeStyle;
    private uploadURL: string;
    private sub: Subscription;
    private accountBasicPropertyForm: FormGroup;
    private accountAddressForm: FormGroup;
    private mapSettings: any = {
        marker: null,
        showMarker: false,
        zoomLevel: 1,
        mapPosition: {
            lat: 0,
            lng: 0
        }
    };
    private allowForPickingAddressFromMap: boolean = false;

    private updateAccount: Function = _.debounce(() => {
        this.isViewerUpdating = true;
        this.accountsService.updateAccount(this.account)
            .subscribe(
            result => {
                if (result.success)
                    this.applicationService.disaplyApplicationInfo('ACCOUNT_UPDATED_SUCCESSFULY', 'success');
                else
                    this.applicationService.disaplyApplicationInfo(result.message, 'danger');
            },
            err => {
                this.applicationService.disaplyApplicationInfo('ACCOUNT_UPDATE_FAILED', 'danger');
                this.isViewerUpdating = false;
            },
            () => { this.isViewerUpdating = false; }
            )
    }, 500);

    private updateAddress: Function = _.debounce((formData: any) => {
        this.isViewerUpdating = true;

        let address = formData.street + ' ' + formData.cityZip + ' ' + formData.stateProvince + ' ' + formData.country;
        this.geoService.getCoordinatesFromAddress(address)
            .subscribe(
                coords => {
                    var location;
                    if (coords.status != 'OK') {
                        this.applicationService.disaplyApplicationInfo('ERROR_FETCH_DATA_GOOGLE_MAPS', 'warning');
                        location = {lat: 0, lng: 0};
                    } else {
                        location = coords.results[0].geometry.location;
                        this.mapSettings.mapPosition = location;
                        if (this.mapSettings.zoomLevel == 1)
                            this.mapSettings.zoomLevel = 14;
                    }
                    this.mapSetMarker(location.lat, location.lng);
                    this.account.address.map = location;
                    this.updateAccount();
                },
                err => {
                    this.applicationService.disaplyApplicationInfo('ACCOUNT_UPDATE_FAILED', 'danger');
                    this.isViewerUpdating = false;
                }
            );
    }, 500);

    constructor(
        private route: ActivatedRoute,
        private accountsService: AccountsService,
        private applicationService: ApplicationService,
        private translationService: TranslateService,
        private sanitizer: DomSanitizer,
        private geoService: GeoService) { }

    ngOnInit() {
        this.sub = this.route
            .params
            .subscribe(params => {
                this.loadAccount(+params['id']);
            });

        _.delay(() => {
            this.applicationService.setAppBlurred(true);
        }, 100);

        this.loadGenders();
        this.setupViewerForm();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
        this.applicationService.setAppBlurred(false);
    }

    setupViewerForm() {
        this.accountBasicPropertyForm = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$')
            ]),
            name: new FormControl('', [
                Validators.required
            ]),
            gender: new FormControl('', [
                Validators.required
            ]),
            birthday: new FormControl('', [
                Validators.required
            ]),
            phone: new FormControl('', [
                Validators.required
            ])
        });
        this.accountBasicPropertyForm.valueChanges.subscribe(formData => {
            // only if from was modified
            if (!this.accountBasicPropertyForm.dirty)
                return;

            this.accountBasicPropertyForm.markAsPristine();
            this.updateAccount();
        });

        this.accountAddressForm = new FormGroup({
            street: new FormControl(''),
            cityZip: new FormControl(''),
            stateProvince: new FormControl(''),
            country: new FormControl(''),
        });
        this.accountAddressForm.valueChanges.subscribe(formData => {
            // only if from was modified
            if (!this.accountAddressForm.dirty)
                return;

            this.accountBasicPropertyForm.markAsPristine();
            this.updateAddress(formData);
        });
    }

    private selectAccount(id: number): void {
        this.account = _.find(this.accountsService.getAccounts(), account => {
            return (account.id == id);
        });
        if (this.account) {
            this.uploadURL = '/api/users/' + this.account.id + '/avatar';
            this.setAvatarUploaderBackground(this.account.avatar);
            this.mapSettings.mapPosition = this.account.address.map;
            if (this.mapSetMarker(this.account.address.map.lat, this.account.address.map.lng))
                this.mapSettings.zoomLevel = 14;

            this.showDialog();
        } else {
            this.applicationService.disaplyApplicationInfo('APPLICATION_ERROR', 'danger');
        }
    }

    private loadAccount(id: number): void {
        if (typeof this.accountsService.getAccounts() == 'undefined') {
            this.accountsService.loadAccounts([])
                .subscribe(
                success => {
                    if (!success)
                        this.applicationService.disaplyApplicationInfo('APPLICATION_ERROR', 'danger');

                    this.selectAccount(id);
                },
                err => { this.applicationService.disaplyApplicationInfo('APPLICATION_ERROR', 'danger'); }
                );
        } else {
            this.selectAccount(id);
        }
    }

    private setAvatarUploaderBackground(avatar) {
        // TODO: change this so we do not have to bypass security trust
        this.trustedAvatarBackgroundStyle = this.sanitizer.bypassSecurityTrustStyle("background: url('" + avatar + "') no-repeat center;");
    }

    private showDialog(): void {
        this.isViewerLoading = false;
        _.delay(() => {
            this.animateState = 'visible';
        }, 100);
    }

    private loadGenders(): void {
        this.genders = [{
            value: 'M',
            text: this.translationService.instant('MALE')
        }, {
            value: 'F',
            text: this.translationService.instant('FEMALE')
        }];
    }
    private avatarUploaded(avatarImage) {
        this.account.avatar = avatarImage;
        this.setAvatarUploaderBackground(avatarImage);
        this.applicationService.disaplyApplicationInfo('ACCOUNT_UPDATED_SUCCESSFULY', 'success');
    }
    private avatarUploadError(error) {
        switch (error.errorCode) {
            case 1:
                this.applicationService.disaplyApplicationInfo('INCORECT_UPLOADED_AVATAR_FILE', 'warning');
                break;
            case 2:
                this.applicationService.disaplyApplicationInfo('INCORECT_NUMBER_OF_UPLOADED_AVATAR_FILES', 'warning');
                break;
            case 4:
                this.applicationService.disaplyApplicationInfo('ERROR_WHILE_UPLOADING_AVATAR_FILE', 'danger');
                break;
            default:
                this.applicationService.disaplyApplicationInfo(error.message, 'danger');
                break;
        }
    }

    markerDragEnd($event: MouseEvent) {
        if (!this.allowForPickingAddressFromMap)
            return;

        this.updateAddressOnCoords($event.coords.lat, $event.coords.lng);
    }

    mapSetMarker(lat: number, lng: number): boolean {
        this.mapSettings.showMarker = (lat || lng);
        this.mapSettings.marker = { lat: lat, lng: lng };

        return this.mapSettings.showMarker;
    }
    mapClicked($event: MouseEvent) {
        if (!this.allowForPickingAddressFromMap)
            return;

        this.mapSetMarker($event.coords.lat, $event.coords.lng);
        this.updateAddressOnCoords($event.coords.lat, $event.coords.lng);
    }
    centerChange($event) {
        this.mapSettings.mapPosition = $event;
    }

    updateAddressOnCoords(lat: number, lng: number) {
        this.geoService.getAddressFromCoordinates(lat, lng)
            .subscribe(
                geoCode => {
                    if (geoCode.status != 'OK') {
                        this.applicationService.disaplyApplicationInfo('ERROR_FETCH_DATA_GOOGLE_MAPS', 'warning');
                        return;
                    }
                    var userAddress: any = {};

                    _.each(geoCode.results, (result: any) => {
                        _.each(result.address_components, (component: any) => {
                            if (!userAddress.street && _.indexOf(component.types, 'route') > -1) {
                                userAddress.street = component.long_name;
                            } else if (!userAddress.number && _.indexOf(component.types, 'street_number') > -1) {
                                userAddress.number = component.long_name;
                            } else if (!userAddress.city && _.indexOf(component.types, 'locality') > -1) {
                                userAddress.city = component.long_name;
                            } else if (!userAddress.zipCode && _.indexOf(component.types, 'postal_code') > -1 && _.indexOf(component.types, 'postal_code_prefix') == -1) {
                                userAddress.zipCode = component.long_name;
                            } else if (!userAddress.stateProvince && _.indexOf(component.types, 'administrative_area_level_1') > -1) {
                                userAddress.stateProvince = this.applicationService.ucwords(component.long_name);
                            } else if (!userAddress.country && _.indexOf(component.types, 'country') > -1) {
                                userAddress.country = component.long_name;
                            }
                        });
                    });

                    let accountAddress: Address = {
                        street: userAddress.street ? userAddress.street : '',
                        cityZip: userAddress.zipCode ? userAddress.zipCode : '',
                        stateProvince : userAddress.stateProvince ? userAddress.stateProvince : '',
                        country: userAddress.country ? userAddress.country : '',
                        map: {
                            lat: lat,
                            lng: lng
                        }
                    }
                    if (userAddress.number)
                        accountAddress.street += ' ' + userAddress.number;

                    if (userAddress.city)
                        accountAddress.cityZip += ' ' + userAddress.city;

                    this.account.address = accountAddress;
                    this.accountBasicPropertyForm.markAsPristine();

                    this.updateAccount();
                },
                err => {
                    this.applicationService.disaplyApplicationInfo('ERROR_FETCH_DATA_GOOGLE_MAPS', 'danger');
                }
            );
    }

}
