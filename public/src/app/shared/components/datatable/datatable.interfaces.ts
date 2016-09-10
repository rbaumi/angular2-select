import { SafeStyle }                         from '@angular/platform-browser';

export interface Column {
    text: string;
    align?: string;
    width?: string;
    sortable?: boolean;
    index: string;
    renderer?: Function;

    // to be set in datatable.component
    safeStylesHead?: SafeStyle;
    safeStylesBody?: SafeStyle;
}
