import { Injectable } from '@angular/core';

import { MenuItem } from './menu-item';

@Injectable()
export class MenuService {
    private _items: Array<MenuItem> = [];
    constructor() { }

    getItems(): Array<MenuItem> {
        this._items = [];
        var menuItem;

        menuItem = new MenuItem();
        menuItem.i18n = "MENU_HOME";
        menuItem.description = "Go to home page";
        menuItem.icon = "fa-home";
        menuItem.route = '/photostation';
        this._items.push(menuItem);

        menuItem = new MenuItem();
        menuItem.i18n = "MENU_OPTIONS";
        menuItem.description = "Application settings";
        menuItem.icon = "fa-gear";
        menuItem.route = '/photostation/settings';
        this._items.push(menuItem);

        menuItem = new MenuItem();
        menuItem.isDivider = true;
        this._items.push(menuItem);

        menuItem = new MenuItem();
        menuItem.i18n = "MENU_ALBUMS";
        menuItem.description = "Browse photo albums";
        menuItem.icon = "fa-picture-o";
        menuItem.route = '/photostation/albums';
        this._items.push(menuItem);

        return this._items;
    }

}
