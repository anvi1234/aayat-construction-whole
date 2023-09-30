import { Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbComponentStatus, NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from 'src/app/shared/transaction.service';
import { SiteRegService } from 'src/app/shared/site-reg.service';
import { ExpensesService } from 'src/app/shared/expenses.service';
// import { SmartTableData } from '../../../@core/data/smart-table';


@Component({
  selector: 'app-transaction',
  styleUrls: ['transaction.component.scss'],
  templateUrl: 'transaction.component.html'
})
export class TransactionComponent {
  p:number = 1
  ul = document.getElementById("siteTableBody");
  liSelected:any;
  index = -1;
 selectedRow = 0
  public siteName :any
  public gridData:any = []
  public employeeData = []
  public fetchId: any;
  public GLOBALID: any
  public monthDayList = [
    { full: "January", short: "Jan", day: "Sun" },
    { full: "February", short: "Feb", day: "Mon" },
    { full: "March", short: "Mar", day: "Tue" },
    { full: "April", short: "Apr", day: "Wed" },
    { full: "May", short: "May", day: "Thr" },
    { full: "June", short: "Jun", day: "Fri" },
    { full: "July", short: "Jul", day: "Sat" },
    { full: "Augest", short: "Aug", day: "Sun" },
    { full: "September", short: "Sep", day: "" },
    { full: "October", short: "Oct", day: "" },
    { full: "November", short: "Nov", day: "" },
    { full: "December", short: "Dec", day: "" },
  ]
  @ViewChild('dialogdelete') editCompanyModal: TemplateRef<any>;
  private editCompanyDialogRef: NbDialogRef<TemplateRef<any>>;
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
          title: '<i class="nb-edit"></i>'
        },
        {
          name: 'deleteAction',
          title: '<i class="nb-trash"></i>'
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
      transactionType: {
        title: 'Expenses Type',
        type: 'html',
        editable: 'false',
        filter: true,
      },
      transactionDate: {
        title: 'Transaction Date',
        type: 'html',
        editable: 'false',
        filter: true,
        width: '100px'
      },
      
      superVisorName: {
        title: 'Super Visor Name',
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

      location: {
        title: 'Site Location',
        type: 'html',
        editable: 'false',
        filter: true,
      },
     remark: {
        title: 'Remark',
        type: 'html',
        editable: 'false',
        filter: true,
      },
     
      // work: {
      //   title: 'Work',
      //   type: 'html',
      //   editable: 'false',
      //   filter: true,
      // },
     
      partyDetailsAccount: {
        title: 'Party Details',
        type: 'html',
        editable: 'false',
        filter: true,
      },
      billNo: {
        title: 'Bill No',
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
   
      givenBy: {
        title: 'Transact By',
        type: 'html',
        editable: 'false',
        filter: true,
      },
      recievedBy: {
        title: 'Reciever',
        type: 'html',
        editable: 'false',
        filter: true,
      },
     
    }
  }


  source: LocalDataSource = new LocalDataSource();

  constructor(
    private dialogService: NbDialogService,
    private transactionService: TransactionService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
    private siteService: SiteRegService,
   
  ) {
    // const data = this.service.getData();

  }

  ngOnInit() {

    this.getTransaction();
    this.fetchId = this.route.snapshot.paramMap.get('id');
  }
  
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

    var len = document.getElementsByTagName('tr').length - 1;
    if (event.key === "ArrowDown") {
      this.index++;
      //down 
      if (this.liSelected) {
        this.removeClass(this.liSelected, 'selected');
       let next = document.getElementsByTagName('tr')[this.index];
       console.log("next",next,this.liSelected)
        if (typeof next !== undefined && this.index <= len) {
  
          this.liSelected = next;
        } else {
          this.index = 0;
          this.liSelected = document.getElementsByTagName('tr')[0];
        }
        this.addClass(this.liSelected, 'selected');
        console.log(this.index);
      } else {
        this.index = 0;
  
        this.liSelected = document.getElementsByTagName('tr')[0];
        this.addClass(this.liSelected, 'selected');
      }
    } else if (event.key === "ArrowUp") {
  
      //up
      if (this.liSelected) {
        this.removeClass(this.liSelected, 'selected');
        this.index--;
        let next = document.getElementsByTagName('tr')[this.index];
        if (typeof next !== undefined && this.index >= 0) {
          this.liSelected = next;
        } else {
          this.index = len;
          this.liSelected = document.getElementsByTagName('tr')[len];
        }
        this.addClass(this.liSelected, 'selected');
      } else {
        this.index = 0;
        this.liSelected = document.getElementsByTagName('tr')[len];
        this.addClass(this.liSelected, 'selected');
      }
    }
  }
  removeClass(el:any, className:any) {
    
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  };
  
   addClass(el:any, className:any) {
    console.log("==================",el)
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ' ' + className;
    }
  };
  onCustomEvent(e: any, dialogdelete: TemplateRef<any>) {

    if (e.action == "editAction") {
      this.router.navigate([`edit-transaction/${e.data._id}`])
    }
    if (e.action == "deleteAction") {
      this.GLOBALID = e.data._id;
      this.editCompanyDialogRef = this.dialogService.open(this.editCompanyModal, { context: 'this is some additional data passed to dialog' });
      this.editCompanyDialogRef.onBackdropClick.subscribe((result: any) => {

      });
    }
  }

  getTransaction() {
    this.transactionService.getTransaction().subscribe((res: any) => {
      let data = res.filter((e) => {
        return e.uniqueSiteId == localStorage.getItem("siteKeyId");
      })
      this.gridData = data.map((y: any) => {
        y["transactionDate"] = this.dateFormating(y.date);
        return y;
      })
      this.gridData = this.gridData.sort((dateA: any, dateB: any) => new Date(dateB.date).valueOf() - new Date(dateA.date).valueOf())
      // this.source.load(this.gridData);
    })
}

  pading(n: any) {
    if (n > 9)
      return n;
    else
      return "0" + n
  }
  dateFormating(da: any) {
    let df = new Date(da);
    return `${this.pading(df.getDate())}-${this.monthDayList[df.getMonth()].short}-${df.getFullYear()}`
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
  }

  removeExpense() {
    this.transactionService.deleteTransaction(this.GLOBALID).subscribe((data) => {
      this.showToast('success', 'Transaction Deleted Successfully');
      this.getTransaction()
      this.editCompanyDialogRef.close();
    }
    )

  }
  gotoAddTransaction() {
    this.router.navigate(['/add-transaction'])
  }

  showToast(status: NbComponentStatus, msg: any) {
    this.toastrService.show(status, msg, { status });
  }

  Search(){
    if(this.siteName == ""
     
     ){
       this.ngOnInit()
     }
     else{
       this.gridData = this.gridData.filter((res:any)=>{
            return res.siteName.toLocaleLowerCase().match(this.siteName.toLocaleLowerCase())
       })
     }
   }
 
   delete(i:any,type,data){
    if(type === "edit")
    {
      
     
      this.router.navigate([`edit-transaction/${data._id}`])
    }

    if(type === "delete")
    {
    
      this.GLOBALID = data._id;
      this.editCompanyDialogRef = this.dialogService.open(this.editCompanyModal, { context: 'this is some additional data passed to dialog' });
      this.editCompanyDialogRef.onBackdropClick.subscribe((result: any) => {

      });
    }

   }
}
