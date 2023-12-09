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
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';


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
    transactionForm!: FormGroup;
      newDynamic: any = {};  
      public totalAmount =0
      public fetchId:any;
      public dynamicError ={
            productItem : false,
            amount:false
      }
    public month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  submitted: boolean;
    constructor(private transactionService: TransactionService,
      private route: ActivatedRoute,
      private siteService :SiteRegService,
      private toastrService: NbToastrService,
      private router:Router,
      private employeeService: EmployeeService,
      private formBuilder:FormBuilder,
      private expensesService : ExpensesService){
      this.formInitialization()
     }
    ngOnInit(): void {  
      this.getuser()
      this.getSite()
      this.fetchId = this.route.snapshot.paramMap.get('id');
      if(this.fetchId){
        this.dialogTiltle = "Edit Transcation",
        this.clickTitle = "Update",
        this.getTransactionByID(this.fetchId);
      } 
        const d = new Date();
        this.transactionForm.get('month')?.setValue(this.month[d.getMonth()]);
        this.transactionForm.get('year')?.setValue(d.getFullYear());
     
     }  
  

    saveData(type:any){
        this.submitted = true;
        if (this.transactionForm.invalid) {
          return;
        }
       if(type=="Save"){
        this.saveData1();
     
      }
      if(type=="Update"){
          this.updateTransaction(this.fetchId)
      }
    
    }
  
    saveData1(){
      // this.TransactionFormModel.uniqueSiteId = String(localStorage.getItem('siteKeyId'))
      // this.TransactionFormModel.transDate = this.convert(new Date())
      this.transactionService.createTransaction(this.transactionForm.value).subscribe((e)=>{
        if(e){
         
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
          this.transactionForm.patchValue(data.user);
          this.transactionForm.get('date')?.setValue(this.convert(new Date(data.user.date)) );
          if(data.user.transactionType != "Daily Expenses"){
            this.partDetails = true
          }
          else{
            this.partDetails =false
          }
        
        });
      }

      updateTransaction(id:any){
        this.transactionService.updateTransaction(id,this.transactionForm.value)
        .subscribe(res => {
         this.showToast('success','Transaction Updated Successfully');
         this.router.navigate(['transaction']);
      })
    }


    showToast(status: NbComponentStatus,msg:any) {
      this.toastrService.show(status, msg, { status });
    }
  
  
    getSite(){
      this.siteService.dataForFilter.subscribe((data:any)=>{
      this.siteLocation = data;
      this.siteName = data;
      })
    }

    expenseTypeChange(data:any){
      let value = data.target.value;
      if(value === "Daily Expenses"){
        this.partDetails = false
      }
      else{
        this.partDetails = true
      }

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
formInitialization(){
    this.transactionForm = this.formBuilder.group({
    superVisorName:['',Validators.required],
    month:['',Validators.required],
    year:['',Validators.required],
    date:['',Validators.required],
    totalAmount:['',Validators.required],
    location:[localStorage.getItem('routinglocation')],
    siteName:[localStorage.getItem('routingSiteName')],
    work:[''],        
    recievedBy:['',Validators.required],
    givenBy:['',Validators.required],
    transactionType:['',Validators.required],
    partyDetailsAccount:[''],
    billNo:[''],
    partyDetailsName:[''],
    transDate :[''],
    remark:[''],
    uniqueSiteId: [localStorage.getItem('siteKeyId')],
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.transactionForm.controls;
  }
}
