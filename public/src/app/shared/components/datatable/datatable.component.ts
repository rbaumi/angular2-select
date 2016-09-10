import { Component,
    Input,
    Output,
    EventEmitter,
    OnInit }                            from '@angular/core';
import { DomSanitizer,
    SafeStyle }                         from '@angular/platform-browser';
import { Column }                       from './datatable.interfaces';

@Component({
    selector: 'datatable',
    templateUrl: './datatable.template.html',
    styleUrls: [
        'datatable.styles.scss'
    ]
})
export class DatatableComponent implements OnInit {
    @Input() columns: Column[];
    @Input() data: any[];

    constructor(private sanitizer: DomSanitizer) {}

    ngOnInit() {
        this.columns.forEach(column => {
            let width = '';

            if (column.width) {
                width = "width:" + column.width + ";";
                column.safeStylesHead = this.sanitizer.bypassSecurityTrustStyle(width);
            }

            if (['left', 'center', 'right'].indexOf(column.align) > -1)
                column.safeStylesBody = this.sanitizer.bypassSecurityTrustStyle(width + "text-align:" + column.align);
        });
    }
}
