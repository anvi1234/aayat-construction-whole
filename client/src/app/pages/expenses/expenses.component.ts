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
  public TotalTransactionAmount: any;
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
  public settings = {

    actions: {
      position: "left",
      // edit: {
      //     name: 'editAction',
      //     title: '<i class="nb-edit"></i>'
      // },
      custom: [

        {
          name: 'editAction',
          title: '<i class="nb-edit" title="Edit" data-placement="top"  data-toggle="tooltip"></i>'
        },
        {
          name: 'viewAction',
          title: '<i class="nb-lightbulb" title="view" data-placement="top"  data-toggle="tooltip"></i>'
        },
        {
          name: 'deleteAction',
          title: '<i class="nb-trash" title="Delete" data-placement="top"  data-toggle="tooltip"></i>'
        }
      ],
      add: false,
      edit: false,
      delete: false
    },

    pager: {
      display: true,
      perPage: 15,
    },
    columns: {
      siteName: {
        title: 'Site Name',
        type: 'html',
        editable: 'false',
        filter: true,
      },

      location: {
        title: 'Site Location',
        type: 'html',
        editable: 'false',
        filter: true,
      },

      superVisorName: {
        title: 'Super Visor Name',
        type: 'html',
        editable: 'false',
        filter: true,
      },
      expensesType: {
        title: 'Expenses Type',
        type: 'html',
        editable: 'false',
        filter: true,
      },

      totalAmount: {
        title: 'Total Amount',
        type: 'html',
        editable: 'false',
        filter: true,
      },
      expenseAmount: {
        title: 'Total Expenses Amount',
        type: 'html',
        editable: 'false',
        filter: true,
      },
      siteAmount: {
        title: 'Site Remaining Amount',
        type: 'html',
        editable: 'false',
        filter: true,
      },

      expenseDate: {
        title: 'Date',
        type: 'html',
        editable: 'false',
        filter: true,
        width: '100px'
      },
      approvedNameBy: {
        title: 'Approved By',
        type: 'html',
        editable: 'false',
        filter: true,
      },
      status: {
        title: 'Status',
        type: 'html',
        editable: 'false',
        filter: true,
      },
      partyDetailsName: {
        title: 'Party Name',
        type: 'html',
        editable: 'false',
        filter: true,
      },
      partyDetailsAccount: {
        title: 'Party Account Detail',
        type: 'html',
        editable: 'false',
        filter: true,
      },
    }
  }

  public expenseColumn = {
    hideSubHeader: true,

    actions: {
      position: "left",
      // edit: {
      //     name: 'editAction',
      //     title: '<i class="nb-edit"></i>'
      // },

      add: false,
      edit: false,
      delete: false
    },

    pager: {
      display: true,
      perPage: 15,
    },
    columns: {
      productItem: {
        title: 'Product',
        type: 'html',
        editable: 'false',
        filter: true,
      },

      quantity: {
        title: 'Quantity',
        type: 'html',
        editable: 'false',
        filter: true,
      },
      amount: {
        title: 'Amount',
        type: 'html',
        editable: 'false',
        filter: true,
      },
    }
  }
  source: LocalDataSource = new LocalDataSource();
  expenseSource: LocalDataSource = new LocalDataSource();
  constructor(private expensesService: ExpensesService,
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
    this.expensesService.totalExpenseSubject.subscribe((res: any) => {
      if (res) {
        this.gridData = res;
        let data = res.filter((e) => {
          return (e.uniqueSiteId === this.fetchId && e.expensesType === "Daily Expenses")
       })
        this.amountAfterChange = data.map((y) => {
          y["expenseDate"] = y.date;
          y["approvedNameBy"] = this.getApproved(y.approvedBy);
          return y;
        }).sort((dateA: any, dateB: any) => new Date(dateB.date).valueOf() - new Date(dateA.date).valueOf())
      }
    })

    

  }

  ngAfterViewInit() {

    // this.expensesService.totalExpenseSubject.subscribe((res:any)=>{

    //   this.gridData = res.map((y: any) => {
    //     // y["expenseDate"] = dateFormatingValue(y.date);
    //     y["expenseDate"] = y.date;
    //     y["approvedNameBy"] = this.getApproved(y.approvedBy);
    //     return y;
    //   }).sort((dateA:any, dateB:any) => new Date(dateB.date).valueOf() -  new Date(dateA.date).valueOf())
    //   this.gridValueWithAmount = this.gridData.filter((y: any) => {
    //     return (y.uniqueSiteId == String(localStorage.getItem("siteKeyId")) && y.expensesType === "Daily Expenses")
    // })

    // console.log("sjhgfsjdfsd", this.gridValueWithAmount)
    // this.cd.detectChanges();

    // })
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
        return (y.uniqueSiteId == localStorage.getItem("siteKeyId") && y.expensesType === "Daily Expenses")

      })
      this.getTransactionByQuesry(localStorage.getItem("siteKeyId"));
      this.tabType = "Daily Expenses"
    }
    if (data.tabTitle === "Material On Site") {

      this.amountAfterChange = this.gridData.filter((y: any) => {
        return (y.uniqueSiteId == localStorage.getItem("siteKeyId") && y.expensesType === "Material On Site")

      })
      this.getTransactionByQuesry(localStorage.getItem("siteKeyId"));
      this.tabType = "Material On Site"

    }
    if (data.tabTitle === "Material Out Site") {
      this.amountAfterChange = this.gridData.filter((y: any) => {
        return (y.uniqueSiteId == localStorage.getItem("siteKeyId") && y.expensesType === "Material Out Site")

      })
      this.getTransactionByQuesry(localStorage.getItem("siteKeyId"));
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

  getTransactionByQuesry(id: any) {
    this.TotalTransactionAmount = 0
    this.transactService.TransactionData.subscribe((res: any) => {
      let data = res.filter((e) => {
        return e.uniqueSiteId == id;
      })
      let aTransaction = 0
      let MOSTransaction = 0
      let MOutSTransaction = 0
      let DETransaction = 0
      data.forEach((d: any) => {

        if (d.transactionType === "Material On Site") {
          MOSTransaction = Number(d.totalAmount) + Number(MOSTransaction)
        }
        if (d.transactionType === "Material Out Site") {
          MOutSTransaction = Number(d.totalAmount) + Number(MOutSTransaction)
        }
        if (d.transactionType === "Daily Expenses") {
          DETransaction = Number(d.totalAmount) + Number(DETransaction)
        }

      });

      this.transactionobj = {
        "dailyExpense": DETransaction,
        "MOSExpense": MOSTransaction,
        "MOutSExpense": MOutSTransaction,
      }
      this.expensesService.totalExpenseSubject.subscribe((res: any) => {
        if (res) {
          let expenseData = res.filter((e) => {
            return e.uniqueSiteId == id;
          })
          let aTotalxpense = 0
          let MOSExpenses = 0
          let MOutExpenses = 0
          let DEExpenses = 0
          expenseData.forEach((g: any) => {
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

      })

    })

  }

  cancel() {
    this.editData = false;
  }

  enableEditMethod(e: any, i: any) {
    this.editData = true;
    this.enableEditIndex = i;
    console.log(i, e, "event");
  }

  enableCalenderMethod(e: any, i: any) {
    this.editData = true;
    this.enableEditIndex = i;
    console.log(i, e);
  }


  saveData(data: any) {
    this.editData = false;
    data.expenseAmount = this.totalExpenses
    let value = this.gridValueWithAmount.filter((filteredData: any) => {
      if (new Date(filteredData.date) >= new Date(data.date)
        // && new Date(filteredData.date).getMonth()>=new Date(data.date).getMonth()
        //  && new Date(filteredData.date).getDate() >= new Date(data.date).getDate()
      ) {
        return filteredData;
      }
    })


    let updatedData = value.reverse().map((y: any, i: number) => {
      y["totalAmount"] = ((i === 0) ? data.totalAmount : value[i - 1].siteAmount);
      y["siteAmount"] = y.totalAmount - y.expenseAmount
      return y
    })

    this.expensesService.updateMultipleExpenses(updatedData)

      .subscribe(res => {
        this.showToast('success', 'Expenses Updated Successfully');
        this.editData = false;
      })
  }

  delete(data: any) {
    this.GLOBALID = data._id;
    this.editCompanyDialogRef = this.dialogService.open(this.editCompanyModal, { context: 'this is some additional data passed to dialog' });
    this.editCompanyDialogRef.onBackdropClick.subscribe((result: any) => {

    });
  }

  removeExpense() {
    this.expensesService.deleteEmployee(this.GLOBALID).subscribe((data) => {
      this.showToast('success', 'Expenses Deleted Successfully');
      // this.getExpenses()
      this.editData = false;
      this.fetchId = this.route.snapshot.paramMap.get('id');
      this.editCompanyDialogRef.close();
    }
    )

  }

  addRow(index: any, data: any) {

    this.ExpensesFormModel.expenseAmount = 0
    this.newDynamic = { productItem: "", amount: "", quantity: "" };
    this.gridValueWithAmount[index].expenses.push(this.newDynamic);
    this.editData = true;
    this.enableEditIndex = index;

  }

  onBlurEvent(data: any, index: any) {
    this.totalExpenses = 0

    this.gridValueWithAmount[index].expenses.forEach((e: any) => {
      this.totalExpenses = Number(e.amount) + Number(this.totalExpenses);


      this.siteAmount = data.totalAmount - this.totalExpenses;

    })
  }

  remove(index: any, data: any) {
    this.totalExpenses = 0
    if (this.gridValueWithAmount[index].expenses.length == 1) {
      // this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
      return false;
    } else {
      this.gridValueWithAmount[index].expenses.splice(index, 1);
      this.gridValueWithAmount[index].expenses.forEach((e: any) => {
        this.totalExpenses = Number(e.amount) + Number(this.totalExpenses);
        this.siteAmount = data.totalAmount - this.totalExpenses;
      })
      return true;
    }
  }

  updateCalednder(e: any, i: any) {

    this.calenderHide = false;
    this.enableCalenderIndex = i;
    console.log(i, e);
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

  removeRow(index, item) {
    // item.expenses

    console.log("item", item, index)
    // this.data.splice(index, 1);

  }
}
