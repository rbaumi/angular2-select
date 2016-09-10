import { Injectable }                   from '@angular/core';
import { StandardResponse }             from '../interfaces/api-response.interface';

// Variable is taken from application config and passed to the view
// It is set as as global variable in template index.phtml
declare var GOOGLE_API_KEY: string;

@Injectable()
export class ApplicationService {

    private applicationInfo: Array<Object> = [];
    private isMainRouterBurred: boolean = false;
    private auxData: any;

    constructor() { }

    public setAuxData(data: any): void {
        this.auxData = data;
    }
    public getAuxData(): any {
        return this.auxData;
    }
    public clearAuxData(): void {
        this.setAuxData(null);
    }
    public isAppBlurred(): boolean {
        return this.isMainRouterBurred;
    }
    public setAppBlurred(blur: boolean): void {
        this.isMainRouterBurred = blur;
    }
    public clearApplicationInfo(): void {
        this.applicationInfo = [];
    }
    public getApplicationInfo(): Array<Object> {
        return this.applicationInfo;
    }
    public disaplyApplicationInfo(message: string, type?: string): void {
        let iconCls: string;

        switch (type) {
            case 'danger': iconCls = 'fa-exclamation-triangle'; break;
            case 'warning': iconCls = 'fa-exclamation-triangle'; break;
            case 'info': iconCls = 'fa-exclamation-circle'; break;
            default: iconCls = 'fa-check'; break;
        }
        this.applicationInfo = [{ msg: message, type: type ? type : 'success', closable: true, icon: iconCls }]
    }

    public isNoSuccess(resultJson: StandardResponse): boolean {
        return (typeof resultJson == 'object' && typeof resultJson.success == 'boolean' && !resultJson.success);
    }

    public getUserLang(): string {
        // use navigator lang if available
        let userLang = navigator.language.split('-')[0];
        return /(pl|en)/gi.test(userLang) ? userLang : 'en';
    }
    ucwords(str: string) {
        return (str + '').replace(/^([a-z])|\s+([a-z])/g, function($1) {
            return $1.toUpperCase();
        });
    }
}
