import { Component }                    from '@angular/core';

@Component({
    selector: 'resources',
    templateUrl: 'resources.template.html',
    styleUrls: ['resources.styles.scss'],
})
export class ResourcesComponent {
    private resources = {
        settings: {
            columns: [{
                text: 'Name',
                sortable: true,
                align: 'center',
                index: 'name',
                width: '20%'
            }, {
                text: 'Description',
                sortable: true,
                index: 'desc',
            }],
            data: [{
                id: 1,
                name: 'dupa',
                desc: 'fajna dupka'
            }, {
                id: 12,
                name: 'asshole'
            }]
        }
    }

    constructor() {}

}
