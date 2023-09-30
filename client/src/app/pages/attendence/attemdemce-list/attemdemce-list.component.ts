import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbComponentStatus, NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { EmployeeService } from 'src/app/shared/employee.service';
import { userid } from 'src/util/const';
import { dateFormatingValue } from 'src/util/dataformating';
import { getCookie } from 'src/util/util';

@Component({
  selector: 'app-attemdemce-list',
  templateUrl: './attemdemce-list.component.html',
  styleUrls: ['./attemdemce-list.component.scss']
})
export class AttemdemceListComponent implements OnInit {
public attendecneGridData:any = []
public GLOBALID :any
public siteName :any
p:number = 1
@ViewChild('dialogdelete') deleteAttendecneModal: TemplateRef<any>;
private deleteAttendecneDialogRef: NbDialogRef<TemplateRef<any>>;
source: LocalDataSource = new LocalDataSource();
  constructor(
    private empService :EmployeeService,
    private router : Router,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {
    this.getAttendecneByID(localStorage.getItem(userid))
  }

  public  attendence = {
    hideSubHeader: true,
    actions: {
      position:"left",
      // edit: {
      //     name: 'editAction',
      //     title: '<i class="nb-edit"></i>'
      // },
      custom: [
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
    
    gotoAddattendence(){
      this.router.navigate(['/add-attendence'])
    }

    getAttendecneByID(id:any){
      this.empService.getAttendById(id).subscribe((e:any)=>{
        let data = e.attendance;
        this.attendecneGridData = data.map((y:any)=>{
     
       if(y.date){
        y["date"] = this.changeFormatOfData(y.date);
        y["dateSort"] = this.changeFormatOfData(y.date);
       }

       if(y.status == "Absent"){
        y["date"] = this.changeFormatOfData(y.startDate) + " " + 'To' + " " + this.changeFormatOfData(y.endDate)
        y["dateSort"] = this.changeFormatOfData(y.startDate);
        
       }
       return y;
        })
        this.attendecneGridData = this.attendecneGridData.sort((dateA:any, dateB:any) => new Date(dateB.dateSort).valueOf() -  new Date(dateA.dateSort).valueOf())
       console.log("nnnnnnnn",this.attendecneGridData)
       
        this.source.load(this.attendecneGridData);
      })
    }

    changeFormatOfData(date){
      const today = new Date(date)
      return  today.getDate() + ' ' + today.toLocaleString('default', { month: 'short' })  + ' '+ today.getFullYear()  
    }
    onCustomEvent(e:any,dialogdelete: TemplateRef<any>){
       if(e.action=="deleteAction"){
       this.GLOBALID = e.data._id;
       this.deleteAttendecneDialogRef = this.dialogService.open(this.deleteAttendecneModal, { context: 'this is some additional data passed to dialog' });
       this.deleteAttendecneDialogRef.onBackdropClick.subscribe((result:any) => {
         
       });
      }
}

showToast(status: NbComponentStatus,msg:any) {
  this.toastrService.show(status, msg, { status });
}

    removeAttendecne(){
      this. empService.deleteAttendence(this.GLOBALID).subscribe((data) => {
        this.showToast('success','User Deleted Successfully');
        this.getAttendecneByID(localStorage.getItem(userid))
        this.deleteAttendecneDialogRef.close();
        }
      ) 
    }
    delete(i:any,type:any,data:any){
      if(type="delete"){
        this.GLOBALID = data._id;
        this.deleteAttendecneDialogRef = this.dialogService.open(this.deleteAttendecneModal, { context: 'this is some additional data passed to dialog' });
        this.deleteAttendecneDialogRef.onBackdropClick.subscribe((result:any) => {
          
        });
      }
    }

    Search(){
      if(this.siteName == ""
       
       ){
         this.ngOnInit()
       }
       else{
         this.attendecneGridData = this.attendecneGridData.filter((res:any)=>{
              return res.siteName.toLocaleLowerCase().match(this.siteName.toLocaleLowerCase())
         })
       }
     }
  }

 