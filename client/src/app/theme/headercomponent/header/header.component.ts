import { Component, OnDestroy, OnInit, Optional, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NbComponentStatus, NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { Attendence } from 'src/app/model/employee.model';
import { AttendenceComponent } from 'src/app/pages/attendence/attendence.component';
import { AuthenticationService } from 'src/app/shared/auth.service';
import { EmployeeService } from 'src/app/shared/employee.service';
import { SiteRegService } from 'src/app/shared/site-reg.service';


@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent  {
  public clearValue :any;
  public innerWidth :any
  public logoutShow :boolean = true
  public sideBarToggle:boolean = true;
  public dropdownShow :boolean = false;
  designation : any
  public employee :any
  constructor(private authService:AuthenticationService,
    private dialogService: NbDialogService,
    private router:Router,
    private empService :EmployeeService,
    private toastrService: NbToastrService,
    private siteService :SiteRegService,
   
    
    ){

    }

    public Designation = [
      {id:1,name:"Admin"},
      {id:2,name:"Supervisor"},
      {id:3,name:"Mechanics"},
      {id:4,name:"Electrician"},
      {id:5,name:"Plumber"},
      {id:6,name:"Driver"},
      {id:7,name:"Office Staff"},
  
    ]

  ngOnInit(){
   this.employee =  localStorage.getItem("employee")
   let value =  this.Designation.filter((e:any)=>{
          return e.id == localStorage.getItem("designation");
   })
   this.designation = value[0].name;
    this.innerWidth = window.innerWidth;
    if(this.innerWidth <= 785){
      this.logoutShow = false
    }
    else{
      this.logoutShow = true
    }
   }

logout(){
  this.authService.deleteToken();
  window.localStorage.clear();
  window.sessionStorage.clear();
  var url = this.router['routerState'].snapshot.url;
    this.router.navigate(['']);

}

toggleShow(){
this.authService.sideBar.next(this.sideBarToggle = !this.sideBarToggle)
} 

optionValue(){
  console.log("gggggggggggggggg")
  this.dropdownShow = ! this.dropdownShow
}

}