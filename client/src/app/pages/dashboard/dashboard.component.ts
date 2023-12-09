import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { ExpensesService } from 'src/app/shared/expenses.service';
import { SiteRegService } from 'src/app/shared/site-reg.service';
import { TransactionService } from 'src/app/shared/transaction.service';
import { ChartComponent } from "ng-apexcharts";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

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
  public transData :any;
  public expenseData:any;
  public expensSUbscription;
  public transSUbscription;
  wholeDataOfProject: any[] = [];
   expenseArray:any = []
   transArray:any = []
  totalTrans = 0;
  totalEx = 0;
  siteDetails: any;
  todaysDataTime = '';
  filteredSite: any;
  

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
      this.getSite(),
     
     
    ]).then((data: any) => {
      this.getTransactionByQuery()
      // console.log("dattttt")
      // this.getTransactionByQuery()
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
    return new Promise((resolve, reject) => {
      this.totalTrans = 0;
     this.transactionSer.getTransaction().subscribe((res:any)=>{
      if(res){
        this.transData = res;
        res.forEach((amount:any)=>{
          this.totalTrans = this.totalTrans + amount.totalAmount;
        })
      }
      resolve(res);
     });   
  });
  }

  getExpenses() {
    return new Promise((resolve, reject) => {
      this.totalEx = 0
      this.expenseSerrvice.getExpenses().subscribe((res: any) => {
        this.expenseData = res;
        res?.forEach((amount: any) => {
          console.log("totalExpense",amount.expenseAmount)
          this.totalEx = this.totalEx + amount.expenseAmount;
        });
        resolve(res);
      });
    });
  }

  getSite() {
    return new Promise((resolve, reject) => {
      this.siteService.getSite().subscribe((res: any) => {
        this.siteDetails = res;
        this.filteredSite = res;
        this.totalSite = res.length;
        resolve(res);
      });
    });
  }

  getTransactionByQuery() {
        this.siteDetails?.forEach((e:any)=>{
          this.expenseData?.forEach((expense:any)=>{
            if(expense.uniqueSiteId.includes(e.uniqueSiteId)){
              e["expenseAmount"] = (e.expenseAmount ? e.expenseAmount : 0) + expense.expenseAmount
            }
          })
          this.transData?.forEach((trans:any)=>{
            if(trans.uniqueSiteId.includes(e.uniqueSiteId)){
              e["transAmount"] =  (e.transAmount ? e.transAmount : 0) + trans.totalAmount
            }
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
  this.siteDetails =  this.filteredSite.filter(item =>
  Object.keys(item).some(key => 
    item[key].toString().toLowerCase().includes(this.siteName2.toLowerCase())
  )
);
  }
  
}
