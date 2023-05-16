import { Component,OnInit ,TemplateRef} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ExpensesService } from 'src/app/shared/expenses.service';
import { NbComponentStatus, NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { ExpensesModel } from 'src/app/model/expenses.model';
import { getCookie } from 'src/util/util';
import { userid } from 'src/util/const';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'admin-site-expenses',
  templateUrl:'/siteexpenses.component.html',
  styleUrls:['/siteexpenses.component.scss']
})
export class AdminSiteExpensesComponent {
    public gridData =[]
    public dialog:any;
    public employeeData =[]
    public ExpensesFormModel:ExpensesModel = new ExpensesModel()
    public monthDayList=[
      {full:"January",short:"Jan",day:"Sun"},
      {full:"February",short:"Feb",day:"Mon"},
      {full:"March",short:"Mar",day:"Tue"},
      {full:"April",short:"Apr",day:"Wed"},
      {full:"May",short:"May",day:"Thr"},
      {full:"June",short:"Jun",day:"Fri"},
      {full:"July",short:"Jul",day:"Sat"},
      {full:"Augest",short:"Aug",day:"Sun"},
      {full:"September",short:"Sep",day:""},
      {full:"October",short:"Oct",day:""},
      {full:"November",short:"Nov",day:""},
      {full:"December",short:"Dec",day:""},
  ]
     public  settings = {
    
      actions: {
          position:"right",
          // edit: {
          //     name: 'editAction',
          //     title: '<i class="nb-edit"></i>'
          // },
          custom: [
            {
                name: 'viewAction',
                title: '<i class="nb-lightbulb"></i>'
              },
            {
              name: 'approvedAction',
              title: '<i class="nb-checkmark"></i>'
            },
           
            {
              name: 'rejectAction',
              title: '<i class="nb-close"></i>'
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
          work: {
            title: 'Work',
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
          totalAmount: {
            title: 'Total Amount',
            type: 'html',
            editable: 'false',
            filter: true,
          },
          year: {
            title: 'Year',
            type: 'html',
            editable: 'false',
            filter: true,
          },
          month: {
            title: 'Month',
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
        }
      }
  
      public expenseColumn = {
        hideSubHeader: true,
        actions: {
            position:"right",
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
        expenseSource:LocalDataSource = new LocalDataSource();
        constructor(private expenseService: ExpensesService,
          private dialogService: NbDialogService,
          private employeeService:EmployeeService,
          private router : Router,
          private toastrService: NbToastrService
         
          ) {
          // const data = this.service.getData();
         
        }
      
        ngOnInit(){
          this.getEmployee()
          this.getExpenses()
        }
      //   onDeleteConfirm(event): void {
      //     if (window.confirm('Are you sure you want to delete?')) {
      //       event.confirm.resolve();
      //     } else {
      //       event.confirm.reject();
      //     }
      //   }
  
      onCustomEvent(e:any,dialog: TemplateRef<any>,dialog1: TemplateRef<any>,dialog2: TemplateRef<any>){
             if(e.action=="viewAction"){
            this.expenseSource.load(e.data.expenses);
            // this.dialog = dialog;
            this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
             
             }
             if(e.action=="approvedAction"){
                this.dialogService.open(dialog1, { context: 'this is some additional data passed to dialog' });
                    this.ExpensesFormModel = e.data
                    this.ExpensesFormModel.approvedBy=getCookie(userid),
                    this.ExpensesFormModel.status ="Approved",
                    this.ExpensesFormModel.rejectedBy=""
                
             }
             if(e.action=="rejectAction"){
               
                this.dialogService.open(dialog2, { context: 'this is some additional data passed to dialog' });
                this.ExpensesFormModel = e.data
                this.ExpensesFormModel.rejectedBy=getCookie(userid),
                this.ExpensesFormModel.status ="Rejected",
                this.ExpensesFormModel.approvedBy=""
                
            }
      }
  
      getExpenses(){
        // this.expenseService.getExpenses().subscribe((e:any)=>{
        //   this.gridData= e.map((y:any)=>{
        //       y["expenseDate"] = this.dateFormating(y.date);
        //       y["approvedNameBy"] = this.getApproved(y.approvedBy);
        //       return y;
        //   })
        //   this.source.load(this.gridData);
        // })
      }
      pading(n:any){
        if(n>9)
          return n;
        else
         return "0"+n
      }
      dateFormating(da:any){
        let df=new Date(da);
       return `${this.pading(df.getDate())}-${this.monthDayList[df.getMonth()].short}-${df.getFullYear()}`
      }
  
      open(dialog: TemplateRef<any>) {
        this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
      }
  
  gotoAddExpenses(){
        this.router.navigate(['/add-expense'])
      } 
  
      showToast(status: NbComponentStatus,msg:any) {
        this.toastrService.show(status, msg, { status });
      }

     approvedData(){
        this.expenseService.updateExpenses(this.ExpensesFormModel._id,this.ExpensesFormModel)
        .subscribe(res => {
         this.showToast('success','Expenses Approved Successfully');
         this.getExpenses()
     })
    }

     rejected(){
        this.expenseService.updateExpenses(this.ExpensesFormModel._id, this.ExpensesFormModel)
        .subscribe(res => {
         this.showToast('success','Expenses Rejected Successfully');
         this.getExpenses()
     })
    }

    getApproved(id:any){
      let value:any =   this.employeeData.filter((e:any)=>{
         return e._id===id;
       })
       console.log(value)
         if(value.length>0){
           return value[0].fullName;
         }
 
         else{
           return ""
         }
  }

  getEmployee(){
    this.employeeService.getEmployee().subscribe((data:any)=>{
      this.employeeData= data
 })
    }
  }
  
