import { Component, OnInit }            from '@angular/core';

import { User }                         from '../shared/interfaces/user-management.interface';
import { PhotostationService }          from './photostation.service';
import { ApplicationService }           from '../shared/services/application.service';

@Component({
    selector: 'photostation',
    styleUrls: [ 'photostation.styles.scss' ],
    templateUrl: 'photostation.template.html'
})
export class PhotostationComponent implements OnInit {
    isLoading: boolean = true;

    constructor(
        private photostationService: PhotostationService,
        private applicationService: ApplicationService) {}

    ngOnInit () {
        this.loadCurrentUser();
    }
    private getCurrentUser () : User {
        return this.photostationService.getCurrentUser();
    }
    private loadCurrentUser () : void {
        this.photostationService.loadCurrentUser().subscribe( user => {}, err => {}, () => { this.isLoading = false; });
    }
    private isAppBlurred() : boolean {
        return this.applicationService.isAppBlurred();
    }
}
