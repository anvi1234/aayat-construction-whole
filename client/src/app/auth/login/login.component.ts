import { Component, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/auth.service';
import { AlertController, Platform }  from "@ionic/angular";
import { Location } from "@angular/common";
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { SiteRegService } from 'src/app/shared/site-reg.service';
import { ExpensesService } from 'src/app/shared/expenses.service';
import { TransactionService } from 'src/app/shared/transaction.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  styleUrls: ['/login.component.scss'],
  templateUrl:'/login.component.html'
 })
export class LoginComponent {
  public innerWidth: any;
  public isError:boolean = false;
  public errorMessage =""
  
  constructor( private AuthSerivice :AuthenticationService,
    private router:Router,
    private platform : Platform,
    private location:Location,
    private alertController: AlertController,
    private siteService: SiteRegService,
    private expenseSerrvice: ExpensesService,
    private transactionSer: TransactionService,
    ){

    }

    ngOnInit(){
      

      this.innerWidth = window.innerWidth;
      var url = this.router['routerState'].snapshot.url;

         
      // if(url==="/"){
       
      //   this.backButtonAlert();
      // }

      // this.platform.ready().then(()=>{
    
      //   this.backButtonAlert()
         
      //   })
    }

    
  

  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      var url = this.router['routerState'].snapshot.url;
         
      if(url==="/"){
       
        this.backButtonAlert();
      }
     
       else {
        this.location.back();
      }

    
    });
  }

  async backButtonAlert() {
    const alert = await this.alertController.create({
      message: 'Do you want to close app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'Cancel',
        },
        {
          text: 'Close App',
          handler: () => {
            navigator['app'].existApp();
          },
        },
      ],
    });
    await alert.present();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
  this.innerWidth = window.innerWidth;

}
  model={
    email :"",
    password:"",
  }
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages:any =""
  onSubmit(form:NgForm){
    this.AuthSerivice.login(this.model).subscribe(
      res => {
        let data:any = res
        console.log("dataadforlogin",data)
        this.AuthSerivice.setToken(res['token']);
        localStorage.setItem("userid",data.user._id);
        localStorage.setItem("employee",data.user.fullName);
        localStorage.setItem("designation",data.user.designation);
        if(this.innerWidth <= 785){
          if(localStorage.getItem("designation") !="ADMIN"){
            localStorage.setItem("routingSiteName",data.user.siteName);
            localStorage.setItem("routinglocation",data.user.location);
            localStorage.setItem("siteKeyId",data.user.uniqueSiteId);
          }
            this.router.navigateByUrl("/mobile-view");
         
          
       }
        else{
          if(localStorage.getItem("designation") !="1"){
            localStorage.setItem("siteName",data.user.siteName);
            localStorage.setItem("location",data.user.location);
            
           this.router.navigateByUrl("/mobile-view")
          }
          else{
            
      this.getsite().then((e)=>{
        this.getTransactionByQuery(e)
        this.router.navigateByUrl("/dashboard")
      })
            
          }
      }
        
      },
      err =>{
        if(err.error.isStatus === "false"){
         this.isError= true;
         this.errorMessage = err.error.message

        }
        else{
          this.isError= false;
        }
      } 
       
     
    )
  }

  getsite() {
    return new Promise((resolve, reject) => {
      this.siteService.getSite().subscribe((res: any) => {
      let siteDetails = res;
        let active = siteDetails.filter((e)=>{
          return e.status === "Active"
         })
         let closed = siteDetails.filter((e)=>{
          return e.status === "Closed"
         })
         
         siteDetails = [...active,...closed];
         this.expenseSerrvice.totalSiteSubject.next(siteDetails)
        resolve(res);
      });
    });
  }

  getTransactionByQuery(data:any) {
    return new Promise((resolve,reject)=>{
      let transArray:any = []
      this.transactionSer.gettotaltransactionByQuery(data).subscribe((e:any)=>{
        transArray.push(e.data)
        this.expenseSerrvice.totalTransSUbject.next(transArray)
          resolve(e);
      })
    }).then((e)=>{
      return new Promise((resolve,reject)=>{
      let  expenseArray:any =[]
        this.expenseSerrvice.getTotalExpensesByQuery(data).subscribe((e:any)=>{
          console.log("expenses",e.data)
          expenseArray.push(e.data)
          this.expenseSerrvice.totalExpenseSubject.next(expenseArray)
            resolve(e);
        })

    }).then((data)=>{
     
      

   
   
 })
 
  })
}

 
}
