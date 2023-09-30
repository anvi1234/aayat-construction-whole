import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbComponentStatus, NbDialogRef, NbToastrService } from '@nebular/theme';
import { Attendence } from 'src/app/model/employee.model';
import { EmployeeService } from 'src/app/shared/employee.service';
import { MessageService } from 'src/app/shared/message.service';
import { SiteRegService } from 'src/app/shared/site-reg.service';
import { userid } from 'src/util/const';
import { getCookie } from 'src/util/util';
import { AttendenceValidation } from 'src/validator/employee';
import { getMessaging, onMessage, getToken, MessagePayload } from 'firebase/messaging';

@Component({
  selector: 'app-attendence',
  templateUrl: './attendence.component.html',
  styleUrls: ['./attendence.component.scss']
})
export class AttendenceComponent implements OnInit {
  public siteLocation =[{_id:"null",location:"null"}];
  public disabled :boolean = false
  minDate 
  public leaveShow :boolean = true;
  msg = getMessaging();
  message: MessagePayload | undefined;
  public employeeName:any = []
  public isShow: boolean = false;
  public checkINdisabled :boolean = false
  public isCheckInDisabled :boolean = false;
  public empName:any = "";
  public siteName:any =[{_id:"null",siteName:"null"}];
  today= new Date();
  todaysDataTime = '';
  public siteNameValue:any = "";
  public locationValue:any = "";

  public EAttendenceFormModel:Attendence = new Attendence()
  error = AttendenceValidation(this.EAttendenceFormModel, "init")
  constructor(private router:Router,
    private empService :EmployeeService,
    private toastrService: NbToastrService,
    private siteService :SiteRegService,
    private employeeService : EmployeeService,
    private messageService : MessageService

   ) {
    setInterval(() => {
      this.todaysDataTime  = this.formatAMPM(new Date)}, 1);
    };
   
     formatAMPM(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var second = date.getSeconds();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      second = second<10 ? '0'+second :  second;
      var strTime =  hours + ':' + minutes + ':' +second+ '' + ampm;
      return strTime;
    }
    

  ngOnInit(): void {
    this.EAttendenceFormModel.date = new Date()
  
    if(localStorage.getItem('designation') ==="ADMIN"){
      console.log("designation",localStorage.getItem('designation'))
      this.isCheckInDisabled = false;
      this.isShow = false
   }
    if(
      (localStorage.getItem('siteName')||
      localStorage.getItem('location')) && localStorage.getItem('designation') !="ADMIN"
     ){
      this.isShow = true
      this.EAttendenceFormModel.location = localStorage.getItem('location')
      this.EAttendenceFormModel.siteName =  localStorage.getItem('siteName')
      this.EAttendenceFormModel.employeeName =   getCookie(userid) 
      this.empName = localStorage.getItem('employee')
      this.getDataById()
    
   }
     this.getSite()
     this.getEmployee()
    
  }


  getSite(){
    this.siteService.getSite().subscribe((data:any)=>{
    this.siteLocation = data;
    this.siteName = data;
    })
  }
  
  
  checkIn(){
    
   this.disabled = true
  
   this.EAttendenceFormModel.date = this.convert(this.EAttendenceFormModel.date)
   this.EAttendenceFormModel.approvalStatus = "Not-Approved"
    this.EAttendenceFormModel.status = "Present" ;
    this.EAttendenceFormModel.color = "blue" ;
    this.error =  AttendenceValidation(this.EAttendenceFormModel, "")
   
    if(!this.error.location && !this.error.siteName){
      this.empService.createAttendence(this.EAttendenceFormModel).subscribe((e:any)=>{
        if(e){
          console.log(e);
        let value = this.employeeName.filter((name:any)=>{
              return name._id === e.user.employeeName
          });
          
            this.messageService.getPush().subscribe((res:any)=>{
              if(res.length === 1){
                let notificationData =   { 
                "notification": {
                  "title": "Attendence", 
                   "body": `${value[0].fullName}, has marked attendence today`,
                   "click_action":value[0]._id,
                   "id": value[0]._id,
                   
                   "image":"https://is3-ssl.mzstatic.com/image/thumb/Purple71/v4/55/22/2d/55222de9-12ee-3a3c-2b29-9c0e74e3c953/source/512x512bb.jpg"
                   },
                   "webpush": {
                    "fcm_options": {
                      "link":`https://www.aayat-construction.in/user/${value[0]._id}`
                    }
                  },
                   
                   "to" :  res[0].key
                  }


                 
                  this.employeeService.sendNotification(notificationData).subscribe((e)=>{
                    if(e){
                    }  
             })
              }
          })
         
            
           
          // let notificationData = { 
          //   "notification": {
          //    "title": "Attendence", 
          //    "body": `${value[0].fullName}, has marked attendence today`,
          //    "onClick":"http://localhost:4200/user"
          //   },
          //   "to" : localStorage.getItem("Messagetoken")
          //  }


         
         
           
            this.empService.attendenceLength.next(e.user)
            if(window.innerWidth<= 785){
              if(localStorage.getItem('designation') ==="ADMIN"){
                this.router.navigateByUrl("mobile-view")
                this.showToast('success','Attendence marked successfully');
              }
              else{
                this.router.navigateByUrl("attendence")
                this.showToast('success','We will meet you Tomorrow');
              }
            }
            
           else{
            this.router.navigateByUrl("dashboard")
           }
           
          }
         else{
          this.showToast('success','Site Details Not Added')
         }
      })
    }
 
  }
  
   convert(str:any) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  
  showToast(status: NbComponentStatus,msg:any) {
  this.toastrService.show(status, msg, { status });
  }

  getDataById(){
    this.empService.getAttendById(localStorage.getItem('userid')).subscribe((e:any)=>{
          let data = e.user;
          let dateData = data.filter((e:any)=>{
                return e.date;
               })

               this.minDate = data[dateData.length-1].date;

          data.filter((y:any)=>{
           let  date = new Date()
            
            if(new Date(y.date).getFullYear() == new Date().getFullYear() && new Date(y.date).getDate() == new Date().getDate()&& new Date(y.date).getMonth() == new Date().getMonth()){
  
                this.isCheckInDisabled = true;
            }
            else{
              this.isCheckInDisabled = false;
            }
          })

    })
  }

  leaveToggle(){
    this.EAttendenceFormModel = new Attendence()
    this.EAttendenceFormModel.employeeName =   getCookie(userid)
    this.EAttendenceFormModel.location = this.locationValue 
    this.EAttendenceFormModel.siteName =  this.siteNameValue
    this.leaveShow = !this.leaveShow
  }

  submitLeave(){
    this.EAttendenceFormModel.startDate = this.convert(this.EAttendenceFormModel.startDate)
    this.EAttendenceFormModel.endDate = this.convert(this.EAttendenceFormModel.endDate)
    this.EAttendenceFormModel.approvalStatus = "Not-Approved"
    this.EAttendenceFormModel.status = "Absent" ;
    this.EAttendenceFormModel.color = "red" ;
    this.error =  AttendenceValidation(this.EAttendenceFormModel, "")
    if(!this.error.siteName && !this.error.location){
    this.empService.createAttendence(this.EAttendenceFormModel).subscribe((e:any)=>{
    if(e){
        this.showToast('success','Your Leave Submit Succesfully');
        this.router.navigateByUrl("/attendence")
        this.empService.attendenceLength.next(e.user)
       }
     else{
      this.showToast('success','Site Details Not Added')
     }
  })
}
  }

  getEmployee(){
    this.employeeService.getEmployee().subscribe((e:any)=>{
      this.employeeName = e;
     
    })
  }

  siteNameChange(data:any){
    let value =   this.siteName.filter((e:any)=>{
          if(e.siteName === data){
            return e
          }
     });

     this.EAttendenceFormModel.uniqueSiteId = value[0].uniqueSiteId
     this.EAttendenceFormModel.location = value[0].location
}
}
