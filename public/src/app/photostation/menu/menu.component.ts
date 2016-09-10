import { Component, OnInit }            from '@angular/core';
import { MenuService }                  from './menu.service';
import { MenuItem }                     from './menu-item';

@Component({
    selector: 'menu',
    templateUrl: 'menu.template.html',
    styleUrls: ['menu.styles.scss'],
    providers: [
        MenuService
    ]
})
export class MenuComponent implements OnInit {
    public menuItems : Array<MenuItem> = [];

    constructor(private _menuService : MenuService) { }

    ngOnInit() {
        this.menuItems = this._menuService.getItems();
    }

}
