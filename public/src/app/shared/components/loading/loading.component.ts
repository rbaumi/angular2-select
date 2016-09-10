import { Component, Input }             from '@angular/core';

/**
 * Components that presents loading on the page. This component is shared as we want to unify loading
 * message all over the app.
 */
@Component({
    selector: 'loading',
    template: `
        <div class="loader" *ngIf="isVisible">
            <div class="content">
                <img src="/assets/img/logo/logo-micro.png">
                <div class="text">
                    {{ 'LOADING' | translate }}
                </div>
            </div>
            <md-progress-bar mode="indeterminate"></md-progress-bar>
        </div>
    `,
    styles: [`
        :host {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        div.loader {
            width: 240px;
            border: solid 2px #B2DFDB;
            border-radius: 5px 5px 0 0;
            border-bottom: none;
            margin: auto;
            background-color: #DEDEDE;
            background-image: repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.2) 35px, rgba(255,255,255,.2) 70px);
            color: #333;
            font-weight: 500;
        }
        div.loader div.content {
            padding: 10px;
            line-height: 45px;
        }
        div.text {
            padding-left: 50px;
            text-align: center;
        }
        img {
            width: 40px;
            float: left;
        }
    `]
})
export class LoadingComponent {
    /**
     * @param isVisible boolean variable that keeps the current state of loading component
     * This decides if component is visible / hidden.
     */
    @Input() isVisible: boolean;
}
