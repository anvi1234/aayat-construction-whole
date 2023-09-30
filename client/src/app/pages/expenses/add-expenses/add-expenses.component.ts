import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ExpensesModel } from 'src/app/model/expenses.model';
import { DynamicGrid } from 'src/app/model/grid.model';
import { ExpensesService } from 'src/app/shared/expenses.service';
import { ActivatedRoute } from '@angular/router';
import { NbComponentStatus, NbDialogRef, NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { ExpensesValidation } from 'src/validator/expenses';
import { SiteRegService } from 'src/app/shared/site-reg.service';
import * as XLSX from 'xlsx';
import { TransactionService } from 'src/app/shared/transaction.service';
import { EmployeeService } from 'src/app/shared/employee.service';


@Component({
  selector: 'app-add-expenses',
  templateUrl: '/add-expenses.component.html',
  styleUrls: ['/add-expenses.component.scss']
})
export class AddExpensesComponent implements OnInit {
  public ngModelDate = new Date();
  isRequired : boolean = false;
  public disabed : boolean = false;
  public productDis  : boolean = false;
  public totalExAmount = 0;
  public totalTransAmount = 0
  public expensesDetailsValue :any =[]
  public transactionDetailsValue :any =[]
  public partDetails: boolean = false;
  public isTotalAmount: boolean = false;
  public productDetails: boolean = false;
  public clickTitle = "Save";
  public isShow: boolean = false;
  public dialogTiltle = "Add Expenses";
  public siteLocation = [{ _id: "null", location: "null" }];
  public siteName: any = [{ _id: "null", siteName: "null" }]

  public ExpensesFormModel: ExpensesModel = new ExpensesModel()
  error = ExpensesValidation(this.ExpensesFormModel, "init")
  dynamicArray: Array<DynamicGrid> = [];
  newDynamic: any = {};
  public totalAmount = 0
  public fetchId: any;
  public siteNameValue:any = "";
  public locationValue:any = "";
  public dynamicError = {
    productItem: false,
    amount: false
  }
  public month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  constructor(private expenseService: ExpensesService,
    private route: ActivatedRoute,
    private siteService: SiteRegService,
    private toastrService: NbToastrService,
    private router: Router,
    private employeeService : EmployeeService,
    private transactService  : TransactionService) {

  }
  ngOnInit(): void {
    this.isTotalAmount = true;
        if(
          localStorage.getItem('routingSiteName')||
          localStorage.getItem('routinglocation')
        ){
          this.isShow = true;
       this.ExpensesFormModel.location = localStorage.getItem('routinglocation')
       this.ExpensesFormModel.siteName =  localStorage.getItem('routingSiteName')
       this.ExpensesFormModel.uniqueSiteId = String(localStorage.getItem('siteKeyId'))
        }
        this.employeeService.getEmployee().subscribe((e:any)=>{
         let data = e.filter((y:any)=>{
          return y.uniqueSiteId ===  this.ExpensesFormModel.siteName  && y.location ===  this.ExpensesFormModel.location 
           })
         this.ExpensesFormModel.superVisorName = data[0]?.fullName
        })
     this.getSite();
    this.fetchId = this.route.snapshot.paramMap.get('id');
    if (this.fetchId) {
      this.dialogTiltle = "Edit Expenses",
      this.clickTitle = "Update",
        this.isTotalAmount = true
      this.getExpenseByID(this.fetchId);
    }

   this.newDynamic = { productItem: "", amount: "", quantity: "" };
    this.dynamicArray.push(this.newDynamic);
    const d = new Date();
    this.ExpensesFormModel.month = this.month[d.getMonth()];
    this.ExpensesFormModel.year = d.getFullYear();
}

  addRow() {
    if(this.dynamicArray.length === 1 && (this.dynamicArray[0].productItem === '' || !
    this.dynamicArray[0].amount)){
 alert("Please Add At Least One Item");
    }

    else if(this.dynamicArray.length >1){
      let lastIndex = this.dynamicArray.length - 1;
        let lastIndexData = this.dynamicArray[lastIndex]
        if(!lastIndexData.productItem && !lastIndexData.amount){
          alert("Please fill empty amount");
        }
    }
    else{
      this.isRequired = false
    this.ExpensesFormModel.expenseAmount = 0
    this.newDynamic = { productItem: "", amount: "", quantity: "" };
    this.dynamicArray.push(this.newDynamic);
    this.dynamicArray.forEach((e) => {
    this.ExpensesFormModel.expenseAmount = Number(e.amount) + Number(this.ExpensesFormModel.expenseAmount);
    this.ExpensesFormModel.siteAmount = this.ExpensesFormModel.totalAmount - this.ExpensesFormModel.expenseAmount;
    })
}
    return true;
  }

  deleteRow(index: any) {
    this.ExpensesFormModel.expenseAmount = 0
    if (this.dynamicArray.length == 1) {
      // this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
      return false;
    } else {
      this.dynamicArray.splice(index, 1);
      this.dynamicArray.forEach((e) => {
        this.ExpensesFormModel.expenseAmount = Number(e.amount) + Number(this.ExpensesFormModel.expenseAmount)
      })
      return true;
    }
  }

  saveData(type: any) {
    if (this.ExpensesFormModel.totalAmount == 0) {
      this.error.totalAmount = true
      this.isShow = false;

    }
    if (this.dynamicArray.length == 1) {
      this.dynamicArray.filter((e) => {
        if (e.productItem == "") {
          alert("Please Add At Least One Item");
        }
        return e;
      })
    }
    else if(this.dynamicArray.length >1){
      let lastIndex = this.dynamicArray.length - 1;
        let lastIndexData = this.dynamicArray[lastIndex]
        if(!lastIndexData.productItem && !lastIndexData.amount){
          alert("Please fill empty amount");
        }
        return;
    }
    this.error = ExpensesValidation(this.ExpensesFormModel, "")
    if (
      !this.error.siteName &&
      !this.error.location &&
      !this.error.superVisorName &&
      !this.error.expensesType

    ) {
      if (type == "Save") {
        if (this.dynamicArray.length > 0) {
          this.ExpensesFormModel.expenses = this.dynamicArray;
          this.ExpensesFormModel.updatedSiteAmount =   this.ExpensesFormModel.siteAmount
          this.ExpensesFormModel.updatedTotalAmount =   this.ExpensesFormModel.totalAmount
          this.saveData1();
        }
      }
      if (type == "Update") {
        this.updateExpenses(this.fetchId)
      }
    }
  }

  saveData1() {
    this.disabed = true
    this.expenseService.createExpenses(this.ExpensesFormModel).subscribe((e) => {
      if (e) {
        this.showToast('success', 'Expenses Added Successfully');
        this.expenseService.selectedIdAfterSavingData.subscribe((e)=>{
          this.router.navigate([`expenses`])
        })
      }
      else {
        this.showToast('success', 'Expenses Not Added')
      }

    })
  }

  expenseTypeChange(data: any) {
    this.ExpensesFormModel.totalAmount = 0
    this.expenseService.selectedSiteAmoount.subscribe((e) => {
      if(e){
      this.isTotalAmount = true;
      if (data === "Material On Site") {
        this.ExpensesFormModel.totalAmount = e.MOSExpensesSiteAmount;
        
          this.ExpensesFormModel.siteAmount =   this.ExpensesFormModel.totalAmount - this.ExpensesFormModel.expenseAmount  
        
        this.partDetails = true;
      }  
      if (data === "Daily Expenses") {
        this.ExpensesFormModel.totalAmount = e.dailiyExpensesSiteAmount;
       
          this.ExpensesFormModel.siteAmount =   this.ExpensesFormModel.totalAmount - this.ExpensesFormModel.expenseAmount  
        
        this.partDetails = false;
        this.error.partyDetailsAccount = false;
        this.error.partyDetailsName = false
      }  
      if (data === "Material Out Site") {
        this.ExpensesFormModel.totalAmount = e.MOutSExpensesSiteAmount;
       
          this.ExpensesFormModel.siteAmount =   this.ExpensesFormModel.totalAmount - this.ExpensesFormModel.expenseAmount  
        
        this.partDetails = false;
        this.error.partyDetailsAccount = false;
        this.error.partyDetailsName = false
      }  
    }
    })
  }

  getExpenseByID(id: any) {
    this.expenseService.getExpensesById(id).subscribe(data => {
      this.ExpensesFormModel = data.user;
      if (data.user.expenses.length > 0) {
        this.dynamicArray = data.user.expenses;
      }
    });
  }

  updateExpenses(id: any) {
    this.expenseService.updateExpenses(id, this.ExpensesFormModel)
      .subscribe(res => {
        this.showToast('success', 'Expenses Updated Successfully');
        this.router.navigate(['expenses']);
      })
  }

  showToast(status: NbComponentStatus, msg: any) {
    this.toastrService.show(status, msg, { status });
  }

  siteTypeChange(data: any) {
    console.log("data", this.ExpensesFormModel.siteName)
  }

  getSite() {
    this.siteService.getSite().subscribe((data: any) => {
      this.siteLocation = data;
      this.siteName = data;
    })
  }

  valuechange(data: any) {
    if (this.ExpensesFormModel.totalAmount == 0) {
      this.isTotalAmount = false
    }
    else {
      this.isTotalAmount = true
    }
  }

  siteLocationChange(data: any) {
    this.getExpensesByQuery(data)
  
}


getExpensesByQuery(data:any){
  this.expenseService.getExpensesByQuery(localStorage.getItem("siteKeyId")).subscribe((e: any) => {
    this.expensesDetailsValue = e.expenses;
    this.transactService.gettransactionByQuery(localStorage.getItem("siteKeyId")).subscribe((e: any) => {
        this.transactionDetailsValue = e.transaction
        this.transactionDetailsValue.forEach((d:any)=>{
                  this.totalTransAmount = Number(d.totalAmount) +  Number(this.totalTransAmount)
            })
            let siteAmount =  Number( this.totalTransAmount) -   Number( this.totalExAmount)
            this.ExpensesFormModel.totalAmount =  siteAmount
    })
    this.expensesDetailsValue.forEach((g:any)=>{
    this.totalExAmount = Number(g.expenseAmount) +  this.totalExAmount 
})
  
      this.isTotalAmount = true;
  
})
}

  onBlurEvent(data: any) {
    let a = 0
    this.dynamicArray.forEach((e:any)=>{
     a = Number(e.amount) + Number(a)
    })
    this.ExpensesFormModel.expenseAmount = a;
   this.ExpensesFormModel.siteAmount = this.ExpensesFormModel.totalAmount - this.ExpensesFormModel.expenseAmount;
 }

  onFileChange(event: any) {
    this.productDis = true;
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.dynamicArray = XLSX.utils.sheet_to_json(ws); 
    

      this.dynamicArray.forEach((y)=>{
        this.ExpensesFormModel.expenseAmount = Number(y.amount) + Number(this.ExpensesFormModel.expenseAmount);
        this.ExpensesFormModel.siteAmount = this.ExpensesFormModel.totalAmount - this.ExpensesFormModel.expenseAmount;
      })
    };
 }

 getDataofTransactionbycompNAme(){

 }
}


