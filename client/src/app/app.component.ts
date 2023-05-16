import { Component, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { onBackgroundMessage } from 'firebase/messaging/sw';
import { environment } from '../environments/environment';
import { EmployeeService } from './shared/employee.service';
import { MessageService } from './shared/message.service';
import { AlertController, IonRouterOutlet, Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';




import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { ExpensesService } from './shared/expenses.service';
import { TransactionService } from './shared/transaction.service';
const isPushNotificationsAvailable =
  Capacitor.isPluginAvailable('PushNotifications');

declare global {
  interface self {
    registration: any;
  }
}
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  innerWidth: any;
  message: any = null;
   @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet: IonRouterOutlet;

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private messagingService: MessageService,
    private platform: Platform,
    private location: Location,
    private alertController: AlertController,
    private expenseSer : ExpensesService,
    private transSer :  TransactionService
  ) {
   
 if(localStorage.getItem("userid") || localStorage.getItem("employee")){
  this.innerWidth = window.innerWidth;
  if(this.innerWidth <= 785){
    this.router.navigateByUrl("/mobile-view");
 }
  else{
    this.router.navigateByUrl("/dashboard")
  }
 }
    if (isPushNotificationsAvailable) {
      this.initPushNotifications();
    }

    this.initializeApp();
  
  }

  initializeApp() {
    this.platform.ready().then(() => {
      
    });


    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      console.log('Back press handler!');
      if (this.location.isCurrentPathEqualTo('/mobile-view') || this.location.isCurrentPathEqualTo('/')) {

        // Show Exit Alert!
        console.log('Show Exit Alert!');
        this.showExitConfirm();
        processNextHandler();
      } else {

        // Navigate to back page
        console.log('Navigate to back page');
        this.location.back();

      }

    });

    this.platform.backButton.subscribeWithPriority(5, () => {
      console.log('Handler called to force close!');
      this.alertController.getTop().then(r => {
        if (r) {
          navigator['app'].exitApp();
        }
      }).catch(e => {
        console.log(e);
      })
    });

  }

  showExitConfirm() {
    this.alertController.create({
      header: 'App termination',
      message: 'Do you want to close the app?',
      backdropDismiss: false,
      buttons: [{
        text: 'Stay',
        role: 'cancel',
        handler: () => {
          console.log('Application exit prevented!');
        }
      }, {
        text: 'Exit',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    })
      .then(alert => {
        alert.present();
      });
  }





  title = 'af-notification';

  ngOnInit(): void {
    this.expenseSer.getExpenses()
    this.transSer.getTransaction()
    this.requestPermission();
    this.listen();

    // this. listen2()
  }

  

  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: environment.firebase.vapidKey })
      .then((currentToken) => {
        if (currentToken) {
          if (localStorage.getItem('designation') === 'ADMIN') {
            localStorage.setItem('Messagetoken', currentToken);
            console.log('Hurraaa!!! we got the token.....');
            let data = {
              key: currentToken,
            };
            this.messagingService.getPush().subscribe((res: any) => {
              if (res.length === 1) {
                this.messagingService
                  .updatePush(res[0]._id, data)
                  .subscribe((res) => {});
              } else {
                this.messagingService.createPush(data).subscribe((res) => {});
              }
            });
          }
        } else {
          console.log(
            'No registration token available. Request permission to generate one.'
          );
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  }

  listen() {
    const messaging = getMessaging();

    onMessage(messaging, (payload: any) => {
      console.log('gggggggg');
      this.message = payload;
      let noteTitle = payload.notification.title;
      let noteOptions = {
        body: payload.notification.body,
        icon: 'typewriter.jpg', //this is my image in my public folder
      };

      console.log('title ', noteTitle, ' ', payload.notification.body);
      //var notification = //examples include this, seems not needed
      new Notification(noteTitle, noteOptions); //This can be used to generate a local notification, without an incoming message. noteOptions has to be an object

      // navigator.serviceWorker
      //     .register('/firebase-messaging-sw.js')
      //     .then((swReg) => {

      //       console.log("fffffffffffff",swReg)

      // firebase.messaging().useServiceWorker(swReg);
      // askForPermissioToReceiveNotifications();
      // })
      // .catch(function (error) {
      //     console.error('Service Worker Error', error);
      //     window.alert("Service Worker Error" + error);
      // })
      //  self.addEventListener('notificationclick', function(event) {
      //         console.log("event",event)
      //  })
    });
  }


  
  initPushNotifications() {
    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      if (localStorage.getItem('designation') === 'ADMIN') {
        localStorage.setItem('Messagetoken', token.value);
        let data = {
          key: token.value,
        };
        this.messagingService.getPush().subscribe((res: any) => {
          if (res.length === 1) {
            this.messagingService
              .updatePush(res[0]._id, data)
              .subscribe((res) => {});
          } else {
            this.messagingService.createPush(data).subscribe((res) => {});
          }
        });
      }
    });

    PushNotifications.addListener('registrationError', (error: any) => {});

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        const data = notification.notification.id;
       
        this.router.navigateByUrl(`/user/${data}`);
      }
    );
  }
}
