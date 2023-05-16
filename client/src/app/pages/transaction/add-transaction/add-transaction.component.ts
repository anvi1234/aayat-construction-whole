import { Component, OnInit } from '@angular/core';
import { DynamicGrid } from 'src/app/model/grid.model';
import { ActivatedRoute } from '@angular/router';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { TransactionModel } from 'src/app/model/transaction.model';
import { TransactionValidation } from 'src/validator/transaction';
import { TransactionService } from 'src/app/shared/transaction.service';
import { SiteRegService } from 'src/app/shared/site-reg.service';
import { ExpensesService } from 'src/app/shared/expenses.service';
import { EmployeeService } from 'src/app/shared/employee.service';


@Component({
  selector: 'app-add-transaction',
  styleUrls: ['add-transaction.component.scss'],
  templateUrl:'add-transcation.component.html'
 })
export class AddTransactionComponent {
   public isShow :boolean = false;
    public  ngModelDate = new Date();
    public partDetails :boolean = false;
    public productDetails:boolean = false;
   public employeeData :any
    public clickTitle ="Save";
    public siteLocation =[{_id:"null",location:"null"}];
    public siteName:any =[{_id:"null",siteName:"null"}]
    public dialogTiltle ="Add Transcation";
    public TransactionFormModel:TransactionModel = new TransactionModel()
    error = TransactionValidation(this.TransactionFormModel, "init")
    dynamicArray: Array<DynamicGrid> = [];  
      newDynamic: any = {};  
      public totalAmount =0
      public fetchId:any;
      public dynamicError ={
            productItem : false,
            amount:false
      }
    public month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    constructor(private transactionService: TransactionService,
      private route: ActivatedRoute,
      private siteService :SiteRegService,
      private toastrService: NbToastrService,
      private router:Router,
      private employeeService: EmployeeService,
      private expensesService : ExpensesService){
      
     }
    ngOnInit(): void {  
     
      if (localStorage.getItem('routingSiteName') ||
        localStorage.getItem('routinglocation')){
        this.isShow = true
        this.TransactionFormModel.location = localStorage.getItem('routinglocation');
        this.TransactionFormModel.siteName = localStorage.getItem('routingSiteName');
      }
   
    
      this.getuser()
      this.getSite()
      this.fetchId = this.route.snapshot.paramMap.get('id');
      if(this.fetchId){
        this.dialogTiltle = "Edit Transcation",
        this.clickTitle = "Update",
        this.getTransactionByID(this.fetchId);
      } 
        const d = new Date();
        this.TransactionFormModel.month= this.month[d.getMonth()]; 
        this.TransactionFormModel.year =d.getFullYear();
     }  
  

    saveData(type:any){
      this.error = TransactionValidation(this.TransactionFormModel, "")
      this.TransactionFormModel.date = this.convert(this.TransactionFormModel.date)
      if(
         !this.error.location &&
         !this.error.siteName  &&
         !this.error.superVisorName &&
         !this.error.transactionType
            ){
       if(type=="Save"){
        this.saveData1();
     
      }
      if(type=="Update"){
          this.updateTransaction(this.fetchId)
      }
    }
    }
  
    saveData1(){
      this.TransactionFormModel.uniqueSiteId = String(localStorage.getItem('siteKeyId'))
      this.TransactionFormModel.transDate = this.convert(new Date())
      this.transactionService.createTransaction(this.TransactionFormModel).subscribe((e)=>{
        if(e){
          this.changedExpensesAccTransaction(e);
          this.showToast('success','Transaction Added Successfully');
          this.router.navigate(['transaction'])
        }
       else{
        this.showToast('success','Transaction Not Added')
       }
       
      })
    }
    getTransactionByID(id:any){
        this.transactionService.getTransactionById(id).subscribe(data => {
          this.TransactionFormModel = data.user;
          this.TransactionFormModel.date = this.convert(new Date(data.user.date)) 
          if(data.user.transactionType ! = "Daily Expenses"){
            this.partDetails =false
          }
          else{
            this.partDetails =true
          }
        
        });
      }
    
      updateTransaction(id:any){
      
        this.TransactionFormModel.totalAmount = Number(this.TransactionFormModel.totalAmount)
        // this.changedExpensesAccTransactionUpdation(this.TransactionFormModel)
        this.TransactionFormModel.transDate = this.convert(new Date())
        this.transactionService.updateTransaction(id,this.TransactionFormModel)
        .subscribe(res => {
          // this.changedExpensesAccTransactionUpdation(res)
         this.showToast('success','Transaction Updated Successfully');
         this.router.navigate(['transaction']);
      })
    }
    showToast(status: NbComponentStatus,msg:any) {
      this.toastrService.show(status, msg, { status });
    }
  
    siteTypeChange(data:any){
          console.log("data",this.TransactionFormModel.siteName)
    }

  

    getSite(){
      this.siteService.dataForFilter.subscribe((data:any)=>{
      this.siteLocation = data;
      this.siteName = data;
      })
    }

    expenseTypeChange(data:any){
      if(data === "Daily Expenses"){
        this.partDetails = false
      }
      else{
        this.partDetails = true
      }

    }

    changedExpensesAccTransaction(transactData:any){

      console.log("trasactiondataafterchange",transactData)
    //   this.expensesService.getExpenses().subscribe((e: any) => {
    //        let data1 = e.filter((data:any)=>{
    //              if(data.siteName === transactData.siteName && data.location === transactData.location && 
    //           //   (new Date(data.date).getFullYear()<=new Date(transactData.transDate).getFullYear() 
    //           //  && new Date(data.date).getMonth()<=new Date(transactData.transDate).getMonth()
    //           //   && new Date(data.date).getDate()<=new Date(transactData.transDate).getDate()
    //           //  )
    //              new Date(data.date) <= new Date(transactData.transDate)
    //            && data.expensesType ===  transactData.transactionType
    //            && (data.totalAmount<0 || data.totalAmount == 0  ))
             
    //          {
    //                return data;
    //            }
    //       })

    //  let a = data1.map((y:any,i:any)=>{
    //       y["totalAmount"] = ( i === 0)?Number(data1[0].totalAmount+transactData.totalAmount) : data1[i-1].siteAmount;
    //       y["siteAmount"] = y.totalAmount - y.expenseAmount ;
    //       return y
    // });
    // console.log("datatttt",a)
    //  this.expensesService.updateMultipleExpenses(a).subscribe((e)=>{
    //    })
    //    })
    }
   
  convert(str:any) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }


  getuser(){
    this.employeeService.getEmployee().subscribe((e:any)=>{
      this.employeeData = e;
    })
  }

}
