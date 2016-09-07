"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () {
        this.demoForm = new forms_1.FormGroup({
            person: new forms_1.FormControl('NATALIA')
        });
    };
    AppComponent.prototype.setMessage = function (msg) {
        this.message = msg;
        this.clearMessage();
    };
    AppComponent.prototype.clearMessage = function () {
        var _this = this;
        if (this.messageClearTimeout)
            clearTimeout(this.messageClearTimeout);
        this.messageClearTimeout = setTimeout(function () { _this.message = null; }, 2000);
    };
    AppComponent.prototype.onSelectionChange = function (selector, value) {
        this.setMessage('Selector ' + selector + ' value has changed to: ' + value);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            styles: ["\n        div.selector-container {\n            width:200px;\n            margin:20px;\n            float:left;\n        }\n        div.notifications {\n            position: fixed;\n            bottom:0;\n            padding:40px;\n        }\n        div.error {\n            color: red;\n        }\n    "],
            template: "\n    <div>\n        <h2>angular2-select</h2>\n        <div class=\"selector-container\">\n            <h4>Simple selector:</h4>\n            <bm-ng2-select\n                placeholder=\"Select a country\"\n                (selectionChanged)=\"onSelectionChange('Country', $event);\">\n                <bm-ng2-option value=\"PL\">Poland</bm-ng2-option>\n                <bm-ng2-option value=\"US\" disabled=\"true\">USA</bm-ng2-option>\n                <bm-ng2-option value=\"DK\" selected=\"true\">Denmark</bm-ng2-option>\n                <bm-ng2-option value=\"FR\">France</bm-ng2-option>\n            </bm-ng2-select>\n        </div>\n        <div class=\"selector-container\">\n            <form [formGroup]=\"demoForm\">\n                <h4>As formControl element:</h4>\n                <bm-ng2-select\n                    formControlName=\"person\"\n                    placeholder=\"Select person\"\n                    required=true\n                    (selectionChanged)=\"onSelectionChange('Name', $event);\">\n                    <bm-ng2-option value=\"ANNA\">Anna</bm-ng2-option>\n                    <bm-ng2-option value=\"NATALIA\">Natalia</bm-ng2-option>\n                    <bm-ng2-option value=\"KASIA\">Kasia</bm-ng2-option>\n                </bm-ng2-select>\n            </form>\n            <div class=\"error\" *ngIf=\"!demoForm.controls.person.valid\">\n                This field is required\n            </div>\n        </div>\n        <div class=\"notifications\">\n            Notifications: {{ message }}\n        </div>\n    </div>\n  ",
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
