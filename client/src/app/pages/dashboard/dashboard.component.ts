import { Component, OnInit, TemplateRef } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { ExpensesService } from 'src/app/shared/expenses.service';
import { SiteRegService } from 'src/app/shared/site-reg.service';
import { TransactionService } from 'src/app/shared/transaction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: '/dashboard.component.html',
  styleUrls: ['/dashboard.component.scss'],
})
export class DashboardComponent {
  p1:number = 1
  p2:number = 1
  today = new Date();
  public siteName1 :any
  public siteName2 :any
  public transctionAMM: any;
  public totalSite: any;
  public totalEmployee: any;
  public expensSUbscription;
  public transSUbscription;
  wholeDataOfProject: any[] = [];
   expenseArray:any = []
   transArray:any = []
  totalTrans = 0;
  totalEx = 0;
  siteDetails: any;
  todaysDataTime = '';

  constructor(
    private siteService: SiteRegService,
    private expenseSerrvice: ExpensesService,
    private transactionSer: TransactionService,
    private empSer: EmployeeService
  ) {
    setInterval(() => {
      this.todaysDataTime =
        this.today.toDateString() +
        'T' +
        (new Date().getHours() +
          ':' +
          new Date().getMinutes() +
          ':' +
          new Date().getSeconds());
    }, 1);
  }

  ngOnInit() {
    Promise.all([
      this.getEmployee(),
      this.getExpenses(),
      this.getTransaction(),
    ]).then((data: any) => {
      this.transactionSer.sitesWholeData.subscribe((value:any)=>{
        this.wholeDataOfProject = []
        if( value ){
          this.wholeDataOfProject = value  
        }
  //       else{
  //         data[0].forEach((e:any)=>
  //         {
  //           this.getTransactionByQuery(e);
  //           this.wholeDataOfProject = this.transArray.map((item, i) =>
  //    Object.assign({}, item, this.expenseArray[i])
  //  );
  //  let active = this.wholeDataOfProject.filter((e)=>{
  //    return e.status === "Active"
  //   })
  //   let closed = this.wholeDataOfProject.filter((e)=>{
  //    return e.status === "Closed"
  //   })
    
  //   this.wholeDataOfProject = [...active,...closed];

  //  this.transactionSer.sitesWholeData.next(this.wholeDataOfProject);
  //         })
  //       }
      })
  });

  this.expenseSerrvice.totalSiteSubject.subscribe((res)=>{
    console.log("ressite",res)

  })
  this.expenseSerrvice.totalTransSUbject.subscribe((res)=>{
    console.log("transressite",res)

  })
  this.expenseSerrvice.totalExpenseSubject.subscribe((res)=>{
    console.log("exeressite",res)

  })
  }

  ngOnDestroy(){
   
  }
  


  getEmployee() {
    return new Promise((resolve, reject) => {
      this.empSer.getEmployee().subscribe((res: any) => {
        this.totalEmployee = res.length;
        resolve(this.totalEmployee);
      });
    });
  }

  getTransaction() {
    // return new Promise((resolve, reject) => {
    //   this.transactionSer.getTransaction().subscribe((res: any) => {
    //     res.forEach((amount: any) => {
    //       this.totalTrans = this.totalTrans + amount.totalAmount;
    //     });
    //     resolve(res);
    //   });
    // });
  }

  getExpenses() {
    // return new Promise((resolve, reject) => {
    //   this.expenseSerrvice.getExpenses().subscribe((res: any) => {
    //     res.forEach((amount: any) => {
    //       this.totalEx = this.totalEx + amount.expenseAmount;
    //     });
    //     resolve(res);
    //   });
    // });
  }

  getTransactionByQuery(data:any) {
    return new Promise((resolve,reject)=>{
      this.transactionSer.gettotaltransactionByQuery(data).subscribe((e:any)=>{
        console.log("transaction",e.data)
        this.transArray.push(e.data)
          resolve(e);
      })
    }).then((e)=>{
      return new Promise((resolve,reject)=>{
        this.expenseSerrvice.getTotalExpensesByQuery(data).subscribe((e:any)=>{
          console.log("expenses",e.data)
          this.expenseArray.push(e.data)
            resolve(e);
        })

    }).then((data)=>{
     
      

   
   
 })
 
  })
}


Search1(){
  if(this.siteName1 == ""
   
   ){
     this.ngOnInit()
   }
   else{
     this.wholeDataOfProject = this.wholeDataOfProject.filter((res:any)=>{
          return res.siteName.toLocaleLowerCase().match(this.siteName1.toLocaleLowerCase())
     })
   }
 }
 Search2(){
  if(this.siteName2 == ""
   
   ){
     this.ngOnInit()
   }
   else{
     this.siteDetails = this.siteDetails.filter((res:any)=>{
          return res.siteName.toLocaleLowerCase().match(this.siteName2.toLocaleLowerCase())
     })
   }
 }

  
  
}
