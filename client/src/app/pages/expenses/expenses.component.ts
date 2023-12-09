import { ChangeDetectorRef, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ExpensesService } from 'src/app/shared/expenses.service';
import { NbComponentStatus, NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';
import { SiteRegService } from 'src/app/shared/site-reg.service';
import { dateFormatingValue } from 'src/util/dataformating';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { TransactionService } from 'src/app/shared/transaction.service';
import { any } from 'webidl-conversions';
import { ExpensesModel } from 'src/app/model/expenses.model';
// import { SmartTableData } from '../../../@core/data/smart-table';

@Component({
  selector: 'app-expenses',
  templateUrl: '/expenses.component.html',
  styleUrls: ['/expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  public gridData: any = []
  public transactionobj: any
  public siteNameValueheader = localStorage.getItem('routingSiteName')
  public siteLocationNameheader = localStorage.getItem('routinglocation')
  public calender: any
  public calenderHide: boolean = true;
  public totalAmount: any;
  public TotalTransactionAmount: any =0 ;
  public amountAfterChange:any =[]
  public totalExpeses: any
  public siteNameValue: any = "";
  public locationValue: any = "";
  gajab = 
  [
    {"id":'1',"name":"anvi"}
  ]
  newDynamic: any = {};
  siteAmount: any
  public editData: boolean = false;
  public tabType = "Daily Expenses"
  enableEditIndex = null
  enableCalenderIndex = null
  public totalExpenses = 0
  public contentId = ""
  public buttonShow: boolean = false
  public employeeData = []
  public gridValueWithAmount: any = []
  public GLOBALID: any
  public fetchId: any;
  @ViewChild('htmlData') htmlData!: ElementRef;
  @ViewChild('dialogdelete') editCompanyModal: TemplateRef<any>;
  private editCompanyDialogRef: NbDialogRef<TemplateRef<any>>;
  public ExpensesFormModel: ExpensesModel = new ExpensesModel()
 
  source: LocalDataSource = new LocalDataSource();
  expenseSource: LocalDataSource = new LocalDataSource();
  transData: any;
  expenseData: any;
  isEdit: boolean = false;
  tempData: any;
  delIndex: any;
  constructor(public expensesService: ExpensesService,
    private dialogService: NbDialogService,
    private employeeService: EmployeeService,
    private router: Router,
    private toastrService: NbToastrService,
    private route: ActivatedRoute,
    private siteService: SiteRegService,
    private transactService: TransactionService,
    private cd: ChangeDetectorRef
  ) {
    // const data = this.service.getData();

  }

  ngOnInit() {
    this.expensesService.selectedSiteAmoount.next(0)
    this.fetchId = this.route.snapshot.paramMap.get('id');
    this.getExpensesDataByUkey()
    this.getTransactionByUkey()
   
   
   
  }

  getExpensesDataByUkey(){
    this.expensesService.getExpensesByUkey(localStorage.getItem("siteKeyId")).subscribe((res:any)=>{
      if (res) {
        this.tempData = res.data;
        this.gridData =  res.data.map((expense:any)=>{
          expense.expenses.map((d:any)=>{
           d["isEdit"] = true;
           })
 
           return expense
         });
        this.expenseData = this.gridData
        let data = this.gridData.filter((e) => {
          return (e.expensesType === "Daily Expenses")
       })
        this.amountAfterChange = data.map((y:any) => {
          y["expenseDate"] = y.date;
          y["approvedNameBy"] = this.getApproved(y.approvedBy);
          return y;
        }).sort((dateA: any, dateB: any) => new Date(dateB.date).valueOf() - new Date(dateA.date).valueOf())

     
       
      }
    })
  }

  ngAfterViewInit() {
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
  }


  gotoAddExpenses() {
    this.router.navigate(['/add-expense'])
  }

  showToast(status: NbComponentStatus, msg: any) {
    this.toastrService.show(status, msg, { status });
  }

  getEmployee() {
    this.employeeService.getEmployee().subscribe((data: any) => {
      this.employeeData = data
    })
  }

  getApproved(id: any) {
    let value: any = this.employeeData.filter((e: any) => {
      return e._id === id;
    })
    if (value.length > 0) {
      return value[0].fullName;
    }

    else {
      return ""
    }
  }


  openList(dialogamount: TemplateRef<any>) {
    this.dialogService.open(dialogamount, { context: 'this is some additional data passed to dialog' });
  }

  fetchNews(data: any) {
    if (data.tabTitle === "Daily Expenses") {
      this.amountAfterChange = this.gridData.filter((y: any) => {
        return (y.expensesType === "Daily Expenses")

      })
      this.getTransactionByQuesry();
      this.tabType = "Daily Expenses"
    }
    if (data.tabTitle === "Material On Site") {

      this.amountAfterChange = this.gridData.filter((y: any) => {
        return (y.expensesType === "Material On Site")

      })
      this.getTransactionByQuesry();
      this.tabType = "Material On Site"

    }
    if (data.tabTitle === "Material Out Site") {
      this.amountAfterChange = this.gridData.filter((y: any) => {
        return (y.expensesType === "Material Out Site")

      })
      this.getTransactionByQuesry();
      this.tabType = "Material Out Site"
    }
  }

  public Download(): void {
    let DATA: any;
    if (this.tabType === "Daily Expenses") {
      DATA = document.getElementById('htmlDataDE');
    }
    if (this.tabType === "Material On Site") {
      DATA = document.getElementById('htmlDataMOS');
    }
    if (this.tabType === "Material Out Site") {
      DATA = document.getElementById('htmlDataMOutS');
    }


    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('expenses.pdf');
    });


  }

  getTransactionByUkey(){
   this.transactService.gettransactionByUkey(localStorage.getItem("siteKeyId")).subscribe((res: any) => {
   if(res){
    this.transData = res.data;
   res.data.forEach((d:any)=>{
    this.TotalTransactionAmount =  this.TotalTransactionAmount + d.totalAmount;
    })
    this.getTransactionByQuesry();
   }
  });
  }

  getTransactionByQuesry() {
    let MOSTransaction = 0
    let MOutSTransaction = 0
    let DETransaction = 0
    if(this.transData?.length>0)
   this.transData.forEach((d: any) => {
      if (d.transactionType === "Material On Site") {
        MOSTransaction = Number(d.totalAmount) + Number(MOSTransaction)
      }
      if (d.transactionType === "Material Out Site") {
        MOutSTransaction = Number(d.totalAmount) + Number(MOutSTransaction)
      }
      if (d.transactionType === "Daily Expenses") {
        DETransaction = Number(d.totalAmount) + Number(DETransaction)
      }
    })

    this.transactionobj = {
      "dailyExpense": DETransaction,
      "MOSExpense": MOSTransaction,
      "MOutSExpense": MOutSTransaction,
    }
    let aTotalxpense = 0
    let MOSExpenses = 0
    let MOutExpenses = 0
    let DEExpenses = 0
    this.expenseData?.forEach((g: any) => {
      if (g.expensesType === "Material On Site") {
        MOSExpenses = Number(g.expenseAmount) + Number(MOSExpenses)
      }
      if (g.expensesType === "Material Out Site") {
        MOutExpenses = Number(g.expenseAmount) + Number(MOutExpenses)
      }
      if (g.expensesType === "Daily Expenses") {
        DEExpenses = Number(g.expenseAmount) + Number(DEExpenses)
      }
    })
    this.totalExpenses = aTotalxpense

    let DEsiteAmount = Number(DETransaction) - Number(DEExpenses)
    let MOSsiteAmount = Number(MOSTransaction) - Number(MOSExpenses)
    let MOutsiteAmount = Number(MOutSTransaction) - Number(MOutExpenses)
    let data = {
      "dailiyExpensesSiteAmount": DEsiteAmount,
      "MOSExpensesSiteAmount": MOSsiteAmount,
      "MOutSExpensesSiteAmount": MOutsiteAmount
    } 
    this.expensesService.selectedSiteAmoount.next(data);
   }

  

  cancel() {
    this.editData = false;
  }


  enableEditMethod(e: any, i: any) {
    this.editData = true;
    this.enableEditIndex = i;
  }

  enableCalenderMethod(e: any, i: any) {
    this.editData = true;
    this.enableEditIndex = i;
  }


  saveData(data: any) {
    this.editData = false;
    let lastIndex = data.expenses.length-1;
    let lastIndexItem = data.expenses[lastIndex];
    if(!lastIndexItem.productItem && !lastIndexItem.quantity){
      alert("Please add empty data");
      return;
    }
    else{
      this.expensesService.updateExpenses(data._id,data).subscribe(res => {
        this.showToast('success', 'Expenses Updated Successfully');
         data.expenses.map((d:any)=>{
          d["isEdit"] = true;
          return;
          })
        this.editData = false;
      })
    }
    
  }

  delete(data: any,index?:any) {
    this.GLOBALID = data._id;
    this.delIndex = index;
    this.editCompanyDialogRef = this.dialogService.open(this.editCompanyModal, { context: 'this is some additional data passed to dialog' });
    this.editCompanyDialogRef.onBackdropClick.subscribe((result: any) => {

    });
  }

  removeExpense() {
    this.expensesService.deleteEmployee(this.GLOBALID).subscribe((data) => {
      this.showToast('success', 'Expenses Deleted Successfully');
      // this.getExpenses()
      this.amountAfterChange.splice(this.delIndex,1);
      this.editData = false;
      this.fetchId = this.route.snapshot.paramMap.get('id');
      this.editCompanyDialogRef.close();
    }
    )

  }

  addRow(data: any) {
    let lastIndex = data.expenses.length-1;
    let lastIndexItem = data.expenses[lastIndex];

    if(!lastIndexItem.productItem && !lastIndexItem.quantity){
      alert("Please add empty data");
    }

    else{
    this.ExpensesFormModel.expenseAmount = 0
    this.newDynamic = { productItem: "", amount: "", quantity: "",isEdit:false };
    data.expenses.push(this.newDynamic);
    this.isEdit= true;
    }
    
  }

  onBlurEvent(data: any, index: any) {
    this.amountAfterChange[index].expenseAmount = 0;
    this.totalExpenses = 0
    data.expenses.forEach((e: any) => {
    this.amountAfterChange[index].expenseAmount = Number(e.amount) + Number(this.amountAfterChange[index].expenseAmount);
    this.siteAmount = this.amountAfterChange[index].totalAmount -  this.amountAfterChange[index].expenseAmount;
    })
  }
  

  remove(index: any, data: any) {
    this.totalExpenses = 0;
    if (data.expenses.length == 1) {
      return false;
    } else {
      data.expenses.splice(index, 1);
      this.isEdit = true;
      data.expenses.forEach((e: any) => {
        this.totalExpenses = Number(e.amount) + Number(this.totalExpenses);
        this.siteAmount = data.totalAmount - this.totalExpenses;
      })
      return true;
    }
  }

  updateCalednder(e: any, i: any) {
    this.calenderHide = false;
    this.enableCalenderIndex = i;
  }


  handler(data: any) {
    data.date = new Date(this.calender);
    this.expensesService.updateExpenses(data._id, data)
      .subscribe(res => {
        this.showToast('success', 'Expenses Updated Successfully');
        this.editData = false;
        this.calenderHide = true;
      })
  }

  cancelCalender() {
    this.calenderHide = true
  }

  checkValueSIgn(value) {
    return Math.sign(value)
  }

  removeRow(index, data:any) {
    // item.expenses
    data.expenses.splice(index, 1);

  }

  editBox(index:any,data:any){
    data.expenses[index].isEdit = !data.expenses[index].isEdit
    this.isEdit = !this.isEdit
  }
}
