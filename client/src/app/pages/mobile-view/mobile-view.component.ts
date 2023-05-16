import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonRouterOutlet, Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-mobile-view',
  templateUrl: './mobile-view.component.html',
  styleUrls: ['./mobile-view.component.scss'],
})
export class MobileViewComponent implements OnInit {
  public adminToggle: boolean = false;
  public supToggle: boolean = false;
  public otherToggle: boolean = false;
  constructor(private router: Router,
    private platform: Platform,
    private location: Location,
    private alertController: AlertController) {
      App.addListener('backButton', () =>
      {
        if (this.location.isCurrentPathEqualTo('/mobile-view') || this.location.isCurrentPathEqualTo(''))
        {
          navigator['app'].exitApp();
        } 
        else
        {
          this.location.back();
        }
      });
  
    }

  ngOnInit(): void {
    if (localStorage.getItem('designation') === 'ADMIN') {
      this.adminToggle = true;
      this.otherToggle = false;
      this.supToggle = false;
    } else if (
      localStorage.getItem('designation') === 'SUPERVISIOR' ||
      localStorage.getItem('designation') === 'ELECTRICIAN'
    ) {
      this.adminToggle = false;
      this.otherToggle = false;
      this.supToggle = true;
    } else if (
      localStorage.getItem('designation') === 'DRIVER' ||
      localStorage.getItem('designation') === 'OFFICE  ASSISTENT'
    ) {
      this.adminToggle = false;
      this.otherToggle = true;
      this.supToggle = false;
    }
  
  
  }

  site() {
    this.router.navigateByUrl('/site');
  }

  user() {
    this.router.navigateByUrl('/user');
  }

  addAttendecne() {
    this.router.navigateByUrl('/add-attendence');
  }

  attendence() {
    this.router.navigateByUrl('/attendence');
  }

  expenses() {
    this.router.navigateByUrl('/expenses');
  }
  gallery() {
    this.router.navigateByUrl('/gallery');
  }
  task() {
    this.router.navigateByUrl('/task');
  }
  drawing() {
    this.router.navigateByUrl('/drawing');
  }
  transaction() {
    this.router.navigateByUrl('/transaction');
  }







}
