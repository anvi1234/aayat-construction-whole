import { Component,OnInit ,TemplateRef, ViewChild} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbComponentStatus, NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';
import { dateFormatingValue } from 'src/util/dataformating';
import { CalendarOptions } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { HostListener } from '@angular/core';
// import { SmartTableData } from '../../../@core/data/smart-table';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-employee',
  templateUrl:'/employee.component.html',
  styleUrls:['/employee.component.scss']
})
export class EmployeeComponent implements OnInit{
  public gridData:any =[]
  p:number = 1
  ul = document.getElementById("siteTableBody");
  liSelected:any;
  index = -1;
  selectedRow = 0
  public siteName :any
  public NoOfDayPresent :any;
  currentDate = new Date();
  public Designation = [
    {id:1,name:"Admin"},
    {id:2,name:"Supervisor"},
    {id:3,name:"Mechanics"},
    {id:4,name:"Electrician"},
    {id:5,name:"Plumber"},
    {id:6,name:"Driver"},
    {id:7,name:"Office Staff"},

  ]
  totalpayment:any = {}
  public employeeData :any = []
  public month:any
  public specificEmp :any = []
  public aatendecneObj :any = {}
  public EMPLOYEEID :any
  public currentYear = new Date().getFullYear()
  public monthCountArray:any = []
  public GLOBALID:any
  public fetchId :any
  public attendecneGridData:any = []
  calendarOptions: CalendarOptions;
  displayEvent: any;
  @ViewChild(EmployeeComponent) ucCalendar:  EmployeeComponent;
  @ViewChild('approvalAttendence') approvedAttendecneModal: TemplateRef<any>;
  private approvedAttendecneDialogRef: NbDialogRef<TemplateRef<any>>;
  @ViewChild('dialogdelete') editCompanyModal: TemplateRef<any>;
  private editCompanyDialogRef: NbDialogRef<TemplateRef<any>>;
  @ViewChild('dialogviewAttendence') ViewAttendecneModal: TemplateRef<any>;
  private ViewAttendecnDialogRef: NbDialogRef<TemplateRef<any>>;
  @ViewChild('dialogrecord') ViewRecordModal: TemplateRef<any>;
  private ViewRecordDialogRef: NbDialogRef<TemplateRef<any>>;
  @ViewChild('payslip') paySlipModal: TemplateRef<any>;
  private paySlipDialogRef: NbDialogRef<TemplateRef<any>>;
  @ViewChild('payslipValue') paySlipValueModal: TemplateRef<any>;
  private paySlipValueDialogRef: NbDialogRef<TemplateRef<any>>

 public AttendecneMonth =  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

   public  settings = {
  
    actions: {
        position:"left",
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
            name: 'viewAction',
            title: '<i class="nb-compose"  title="Attendence" data-placement="top"  data-toggle="tooltip"></i>'
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
      fullName: {
          title: 'Employee Name',
          type: 'html',
          editable: 'false',
          filter: true,
        },
      
        designation: {
          title: 'Designation',
          type: 'html',
          editable: 'false',
          filter: true,
        },
        password: {
          title: 'Password',
          type: 'html',
          editable: 'false',
          filter: true,
        },
        siteName: {
          title: 'Site Name',
          type: 'html',
          editable: 'false',
          filter: true,
        },
      location: {
          title: 'Location',
          type: 'html',
          editable: 'false',
          filter: true,
        },
       mobileNo: {
          title: 'Phone No',
          type: 'html',
          editable: 'false',
          filter: true,
        }, 
        basicPay: {
          title: 'Basic Pay',
          type: 'html',
          editable: 'false',
          filter: true,
        },
       adharNo: {
          title: 'ID Proof',
          type: 'html',
          editable: 'false',
          filter: true,
        },
       email: {
          title: 'Email ID',
          type: 'html',
          editable: 'false',
          filter: true,
        },
        address: {
            title: 'Address',
            type: 'html',
            editable: 'false',
            filter: true,
          },
      }
    }



   

    public  attendence = {
      hideSubHeader: true,
      actions: {
          position:"left",
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
          perPage:15,
        },
       columns: {
        employee: {
            title: 'Employee Name',
            type: 'html',
            editable: 'false',
            filter: true,
          },
        
          siteName: {
            title: 'Site Name',
            type: 'html',
            editable: 'false',
            filter: true,
          },
        location: {
            title: 'Location',
            type: 'html',
            editable: 'false',
            filter: true,
          },
       
         date: {
            title: 'Date',
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
 
     source: LocalDataSource = new LocalDataSource();
     attendencesource: LocalDataSource = new LocalDataSource();
  filteredData: any;
      constructor(private employeeService:EmployeeService,
        private dialogService: NbDialogService,
        private router : Router,
        private toastrService: NbToastrService,
        private ActivatedRoute : ActivatedRoute
        ) {
        
       
      }
      @HostListener('window:popstate', ['$event'])
          onPopState(event) {
           this.ViewAttendecnDialogRef?.close()
           this.ViewRecordDialogRef?.close()
           this.approvedAttendecneDialogRef?.close()
           this.paySlipDialogRef?.close()
           this.paySlipValueDialogRef?.close()
            //Here you can handle your modal
          }

      ngOnInit(){
          this.fetchId = this.ActivatedRoute.snapshot.paramMap.get('id');
         
        this.getEmployee()
      }
    //   onDeleteConfirm(event): void {
    //     if (window.confirm('Are you sure you want to delete?')) {
    //       event.confirm.resolve();
    //     } else {
    //       event.confirm.reject();
    //     }
    //   }

    onCustomEvent(e:any,dialogdelete: TemplateRef<any>,dialogviewAttendence: TemplateRef<any>){
           if(e.action=="viewAction"){
          this.GLOBALID = e.data._id
            this.attendecneGridData = []
            this.ViewAttendecnDialogRef = this.dialogService.open(this.ViewAttendecneModal, { context: 'this is some additional data passed to dialog' });
            this.ViewAttendecnDialogRef.onBackdropClick.subscribe((result:any) => {
              
            });
          
            this.getAttendecneByID(e.data._id)
           }
           if(e.action=="editAction"){
            this.GLOBALID = e.data._id;
          
              this.router.navigate([`edit-user/${e.data._id}`])
           }
           if(e.action=="deleteAction"){
            this.GLOBALID = e.data._id;
            this.editCompanyDialogRef = this.dialogService.open(this.editCompanyModal, { context: 'this is some additional data passed to dialog' });
            this.editCompanyDialogRef.onBackdropClick.subscribe((result:any) => {
              
            });
           }
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
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ' ' + className;
    }
  };

    getEmployee(){
      if(this.fetchId){
        this.employeeService.getEmployeeById(this.fetchId).subscribe((e:any)=>{
         this.specificEmp.push(e["user"])
         this.filteredData = this.specificEmp
          this.gridData =  this.specificEmp
        })
      }

      else{
        this.employeeService.getEmployee().subscribe((e:any)=>{
          this.gridData= e.map((y:any)=>{ 
            y.designation =  this.getEmployeeDes(y.designation);
              return y;
          })
          this.filteredData = this.gridData;
        })
      }
      
    }

    getEmployeeDes(desId:any){
      let nameValue = this.Designation.filter((e:any)=>{
        return e.id == desId;
       })
       return nameValue[0].name
   }
   open(dialog: TemplateRef<any>) {
      this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
    }

    removeEmployee() {
      this.employeeService.deleteEmployee(this.GLOBALID).subscribe((data) => {
          this.showToast('success','User Deleted Successfully');
        this.getEmployee()
        this.editCompanyDialogRef.close();
          }
        ) 
    }  

    gotoAddEmployee(){
      this.router.navigate(['/add-user'])
    } 

    showToast(status: NbComponentStatus,msg:any) {
      this.toastrService.show(status, msg, { status });
    }

    getAttendecneByID(id:any){
      this.attendecneGridData = []
        //Api call to get data from php file
        this.employeeService.getAttendById(id).subscribe((e:any)=>{
          let data = e.user;
          this.EMPLOYEEID = data
         if(data.length>0){
          this.attendecneGridData = data.map((y:any)=>{
            y["title"] = y.siteName + y.location
            if(y.date){
              y["date"] = y.date
           }
            if(y.startDate || y.endDate){
           y["start"] = y.startDate;
           y["end"] = y.endDate
         }
      
        return y;
         })
       this.countAttendence(this.attendecneGridData )
         }
         if(this.attendecneGridData.length>0){
          this.calendarOptions = {
            dateClick: this.handleDateClick.bind(this), // bind is important!
            plugins: [ dayGridPlugin ],  
            initialView: 'dayGridMonth',
            headerToolbar: {
              left: 'prev,next',
              center: 'title',
              right: 'dayGridDay,dayGridWeek,dayGridMonth'
            }, 
            selectable: true,  
        
            events:this.attendecneGridData
            };
    }
         else{
          this.attendecneGridData = []
          this.calendarOptions = {
            plugins: [ dayGridPlugin ],  
            initialView: 'dayGridMonth',
            headerToolbar: {
              left: 'prev,next',
              center: 'title',
              right: 'dayGridDay,dayGridWeek,dayGridMonth'
            }, 
            selectable: true,  
            events:this.attendecneGridData
            };
         }
      })
  }

  handleDateClick(arg:any) {
    this.approvedAttendecneDialogRef = this.dialogService.open(this.approvedAttendecneModal, { context: 'this is some additional data passed to dialog' });
    this.approvedAttendecneDialogRef.onBackdropClick.subscribe((result:any) => {
      
    });

    
   let value  = this.EMPLOYEEID.filter((e:any)=>{
    if (e.date) {
      return  e.date === arg.dateStr;
    } 
    if (e.startDate || e.endDate) {
      return  e.startDate <= arg.dateStr &&  e.endDate >= arg.dateStr;
    } 
    else{
      return false
    }
   
  })
 
  this.EMPLOYEEID = value
  if(this.EMPLOYEEID[0].status === "Present"){
    this.EMPLOYEEID[0].date = arg.dateStr
  }
  }

countAttendence(data:any){
  this.monthCountArray = new Array(12).fill(0); 
    data.forEach((e:any) => {
      if(new Date(e.date).getFullYear() === new Date().getFullYear() && e.approvalStatus === "Approved" && e.status ===   "Present"){
        this.monthCountArray[new Date(e.date).getMonth()] += 1 }
      }
        );
    }

recordCheck(){
  this.ViewAttendecnDialogRef.close();
  this.ViewRecordDialogRef = this.dialogService.open(this.ViewRecordModal, { context: 'this is some additional data passed to dialog' });
  this.ViewRecordDialogRef.onBackdropClick.subscribe((result:any) => {
    
  });
 }

 submitApproval(type:any){
  if(this.EMPLOYEEID[0].status === "Present"){
    if(type === "Approved"){
      this.EMPLOYEEID[0].approvalStatus = type;
      this.EMPLOYEEID[0].color = "green"
    }
    if(type === "Rejected"){
      this.EMPLOYEEID[0].approvalStatus = type;
      this.EMPLOYEEID[0].color = "orange"
    }
  } 

  if(this.EMPLOYEEID[0].status === "Absent"){
    if(type === "Approved"){
      this.EMPLOYEEID[0].approvalStatus = type;
      this.EMPLOYEEID[0].color = "#6699cc"
    }

    if(type === "Rejected"){
      this.EMPLOYEEID[0].approvalStatus = type;
      this.EMPLOYEEID[0].color = "orange"
    }
  }
  this.employeeService.updateAttendecne(this.EMPLOYEEID[0]._id,this.EMPLOYEEID[0])
  .subscribe(res => {
   this.showToast('success','User Updated Successfully');
   this.approvedAttendecneDialogRef.close()
   this.getAttendecneByID(this.GLOBALID)
   this.router.navigate(['user']);
})
 }

 paysilip(){ 
 this.ViewRecordDialogRef.close()
  this.paySlipDialogRef = this.dialogService.open(this.paySlipModal, { context: 'this is some additional data passed to dialog' });
  this.paySlipDialogRef.onBackdropClick.subscribe((result:any) => {
 });
 }

 selectedMonth(data:any){
  this.paySlipDialogRef.close()
    this.paySlipValueDialogRef = this.dialogService.open(this.paySlipValueModal, { context: 'this is some additional data passed to dialog' });
    this.paySlipValueDialogRef.onBackdropClick.subscribe((result:any) => {
   });
  let index = this.AttendecneMonth.indexOf(data)

  let b = this.monthCountArray[index]
   this.daysInMonth(index+1,new Date().getFullYear())
  let absent =  this.daysInMonth(index+1,new Date().getFullYear()) - Number(b)
  this.aatendecneObj = {
    present : b,
    abscent :absent,
    noOfDay :this.daysInMonth(index+1,new Date().getFullYear())

  }
  this.getEmployeeByID(this.GLOBALID);
 }

 daysInMonth (month:any, year:any) {
  return new Date(year, month, 0).getDate();
}

getEmployeeByID(id:any){
  this.employeeService.getEmployeeById(id).subscribe(data => {
    this.employeeData = data.user;
    let perDaySalary =  this.employeeData.basicPay / this.aatendecneObj.noOfDay;
     let toalpayment:any = this.employeeData.basicPay
    let absentofMonth:any = (perDaySalary * this.aatendecneObj.abscent).toFixed(2) 
  let netSalary = perDaySalary * this.aatendecneObj.present
     this.totalpayment ={
      totalPayment: toalpayment,
      LWP : absentofMonth,
      netSalary:netSalary
    }
    
    setTimeout(this.Download, 3000);
  });

  
}


public Download(): void {
  let DATA: any;
  DATA = document.getElementById('salarySlip')
 
  html2canvas(DATA).then((canvas) => {
    let fileWidth = 208;
    let fileHeight = (canvas.height * fileWidth) / canvas.width;
    const FILEURI = canvas.toDataURL('image/png');
    let PDF = new jsPDF('l', 'mm', 'a4');
    var yPos = 30
    var xPos = 30
    PDF.addImage(FILEURI, 'PNG', yPos,xPos, fileWidth, fileHeight);
    PDF.save('salarySlip.pdf');
  });
}

Search(){
  this.gridData =  this.filteredData.filter(item =>
    Object.keys(item).some(key => 
      item[key].toString().toLowerCase().includes(this.siteName.toLowerCase())
    )
  );
 }

 delete(i:any,type:any,data:any){
  if(type === "edit")
  {
    this.GLOBALID = data._id;
          
    this.router.navigate([`edit-user/${data._id}`])
  }
  if(type === "view")
  {
    this.router.navigateByUrl(`/attendence-dashboard/${data._id}`)
    // this.GLOBALID = data._id
    // this.attendecneGridData = []
    // this.ViewAttendecnDialogRef = this.dialogService.open(this.ViewAttendecneModal, { context: 'this is some additional data passed to dialog' });
    // this.ViewAttendecnDialogRef.onBackdropClick.subscribe((result:any) => {
      
    // });
  }
  if(type === "delete")
  {
    this.GLOBALID = data._id;
    this.editCompanyDialogRef = this.dialogService.open(this.editCompanyModal, { context: 'this is some additional data passed to dialog' });
    this.editCompanyDialogRef.onBackdropClick.subscribe((result:any) => {
      
    });
  }
 }
}


