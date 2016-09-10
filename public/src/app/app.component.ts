import { Component,
         ViewContainerRef }             from '@angular/core';
import { TranslateService }             from 'ng2-translate/ng2-translate';
import { ApplicationService }           from './shared/services/application.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.template.html'
})
export class AppComponent {
    private getApplicationInfo(): Array<Object> {
        return this.applicationService.getApplicationInfo();
    }
    constructor(
        translate: TranslateService,
        private applicationService: ApplicationService) {

        // get user language from common service
        let userLang = this.applicationService.getUserLang();

        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use(userLang);
    }
}
