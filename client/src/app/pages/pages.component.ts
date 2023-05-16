import { Component } from '@angular/core';

import { MENU_ITEMS } from '../nav/menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  templateUrl:'pages.component.html'
 })
export class PagesComponent {

 public  menu = MENU_ITEMS;
}
