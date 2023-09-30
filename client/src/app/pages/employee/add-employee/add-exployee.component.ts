import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee.model';
import { EmployeeValidation } from 'src/validator/employee';
import { EmployeeService } from 'src/app/shared/employee.service';
import { SiteRegService } from 'src/app/shared/site-reg.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-add-employee',
  templateUrl:'/add-employee.component.html',
  styleUrls:['/add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit{
  public  ngModelDate = new Date();
  public partDetails :boolean = false;
  public productDetails:boolean = false;
  public clickTitle ="Save";
  public dialogTiltle ="Add User"
  public passwordShow:boolean = true;
  public siteName :any;
  public siteLocation :any
  public EmployeeFormModel:Employee = new Employee()
  public Designation = [
    {id:1,name:"Admin"},
    {id:2,name:"Supervisor"},
    {id:3,name:"Mechanics"},
    {id:4,name:"Electrician"},
    {id:5,name:"Plumber"},
    {id:6,name:"Driver"},
    {id:7,name:"Office Staff"},

  ]
  error = EmployeeValidation(this.EmployeeFormModel, "init")
    public fetchId:any;
  constructor(private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
    private siteService:  SiteRegService,
    private router:Router){
}

  ngOnInit(): void {  
    this.fetchId = this.route.snapshot.paramMap.get('id');
    this.getSite()
    if(this.fetchId){
      this.dialogTiltle = "Edit User",
      this.clickTitle = "Update",
      this.passwordShow = false,
      this.error.password = false
      this.getEmployeeByID(this.fetchId);
    }
   
 }

 saveData(type:any){
      this.EmployeeFormModel.designation = String(this.getEmployeeDesID(this.EmployeeFormModel.designation))
    this.error = EmployeeValidation(this.EmployeeFormModel, "")
    if(
        !this.error.siteName &&
        !this.error.location &&
        !this.error.fullName &&
        !this.error.designation  &&
        !this.error.mobileNo  &&
        !this.error.adharNo &&
        !this.error.address &&
        !this.error.email &&
        !this.error.password &&
        !this.error.adharNoLength &&
        !this.error.mobileNoLength
       ){
     if(type=="Save"){
        this.saveData1()
    }
    if(type=="Update"){
        this.updateEmployeeByID(this.fetchId)
    }
}
  }

  getDesignationid(name:any){

  }

  saveData1(){
    this.employeeService.createEmployee(this.EmployeeFormModel).subscribe((e)=>{
      if(e){
        this.showToast('success','User Added Successfully');
        this.router.navigate(['user'])
      }
     else{
      this.showToast('success','User Not Added')
     }
     
    })
  }


  getEmployeeByID(id:any){
      this.employeeService.getEmployeeById(id).subscribe(data => {
        this.EmployeeFormModel = data.user;
        this.EmployeeFormModel.designation = this.getEmployeeDes(data.user.designation);
     });
    }

    getEmployeeDes(desId:any){
       let nameValue = this.Designation.filter((e:any)=>{
         return e.id == desId;
        })
        return nameValue[0].name
    }

    getEmployeeDesID(desName:any){
       let idValue = this.Designation.filter((e:any)=>{
         return e.name === desName;
        })
        return idValue[0].id
    }
  
    updateEmployeeByID(id:any){
      this.employeeService.updateEmployee(id,this.EmployeeFormModel)
      .subscribe(res => {
       this.showToast('success','User Updated Successfully');
       this.router.navigate(['user']);
    })
  }

  showToast(status: NbComponentStatus,msg:any) {
    this.toastrService.show(status, msg, { status });
  }

  getSite() {
    this.siteService.getSite().subscribe((data: any) => {
      this.siteLocation = data;
      this.siteName = data;
    })
  }

  siteNameChange(data:any){
      let value =   this.siteName.filter((e:any)=>{
            if(e.siteName === data){
              return e
            }
       });

       this.EmployeeFormModel.uniqueSiteId = value[0].uniqueSiteId
       this.EmployeeFormModel.location = value[0].location
  }

}