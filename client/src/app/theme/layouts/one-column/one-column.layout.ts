import { Component, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuItem, NbMenuService, NbSidebarService } from '@nebular/theme';
import { AuthenticationService } from 'src/app/shared/auth.service';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
  <nb-layout windowMode>
  <nb-layout-header fixed>
    <ngx-header></ngx-header>
  </nb-layout-header>

  <nb-sidebar tag="left"  class="menu-sidebar" responsive>
    <ng-content select="nb-menu"></ng-content>
  </nb-sidebar>

  <nb-layout-column>
    <ng-content select="router-outlet"></ng-content>
  </nb-layout-column>

  <nb-layout-footer *ngIf="isFooter" fixed>
    <ngx-footer></ngx-footer>
  </nb-layout-footer>
</nb-layout>
  `,
})
export class OneColumnLayoutComponent {
  public sideBarShow :boolean = true;
  public isFooter :boolean = true
 constructor(private authService:AuthenticationService,
  private sidebarService: NbSidebarService,
  private menuService: NbMenuService,
  private router : Router){

 }

 ngOnInit(){
   this.authService.sideBar.subscribe((res)=>{
         this.sideBarShow = res;
         this.sidebarService.toggle(false, 'left');
   })

   if(this.router.url.includes("/mobile-view")){
  this.isFooter = false
   }
 }


 
}
