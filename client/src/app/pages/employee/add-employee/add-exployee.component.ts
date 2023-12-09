import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee.model';
import { EmployeeValidation } from 'src/validator/employee';
import { EmployeeService } from 'src/app/shared/employee.service';
import { SiteRegService } from 'src/app/shared/site-reg.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomvalidationService } from 'src/app/shared/customValidator.service';



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
  public Designation = [
    {id:1,name:"Admin"},
    {id:2,name:"Supervisor"},
    {id:3,name:"Mechanics"},
    {id:4,name:"Electrician"},
    {id:5,name:"Plumber"},
    {id:6,name:"Driver"},
    {id:7,name:"Office Staff"},

  ]
  empRegisterationForm!: FormGroup;
    public fetchId:any;
  uniqueSiteId: any;
  submitted: boolean;
  constructor(private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
    private siteService:  SiteRegService,
    private formBuilder:FormBuilder,
    private customVal : CustomvalidationService,

    private router:Router){
      this.formInitialization()
}

  ngOnInit(): void {  
    this.fetchId = this.route.snapshot.paramMap.get('id');
    this.getSite()
    if(this.fetchId){
      this.dialogTiltle = "Edit User",
      this.clickTitle = "Update",
      this.passwordShow = false,
      // this.error.password = false
      this.getEmployeeByID(this.fetchId);
    }
   
 }

 saveData(type:any){  
  this.submitted = true;
  if (this.empRegisterationForm.invalid) {
    return;
  }
  else{
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
    this.employeeService.createEmployee(this.empRegisterationForm.value).subscribe((e)=>{
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
        this.empRegisterationForm.patchValue(data.user);
        // this.EmployeeFormModel.designation = this.getEmployeeDes(data.user.designation);
     });
    }

    // getEmployeeDes(desId:any){
    //    let nameValue = this.Designation.filter((e:any)=>{
    //      return e.id == desId;
    //     })
    //     return nameValue[0].name
    // }

    // getEmployeeDesID(desName:any){
    //    let idValue = this.Designation.filter((e:any)=>{
    //      return e.name === desName;
    //     })
    //     return idValue[0].id
    // }
  
    updateEmployeeByID(id:any){
      this.employeeService.updateEmployee(id,this.empRegisterationForm.value)
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
      this.siteName = data;
    })
  }

  siteNameChange(data:any){
    let name = data.target.value
      let value = this.siteName.filter((e:any)=>{
            if(e.siteName === name){
              return e
            }
       });
      this.empRegisterationForm.get('uniqueSiteId')?.setValue(value[0].uniqueSiteId)
       this.empRegisterationForm.get('location')?.setValue(value[0].location);
  }

  formInitialization(){
      this.empRegisterationForm = this.formBuilder.group({
        siteName:['',Validators.required],
        location:[''],
        fullName :['',Validators.required],
        designation:['',Validators.required],
        mobileNo:['',[Validators.required, this.customVal.phoneNumberValidator()]],
        adharNo:['',this.customVal.adharNumberValidator()],
        address:['',Validators.required],
        email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        password:['',Validators.required],
        basicPay:['',Validators.required],
        bankName:['',Validators.required],
        accNo:['',Validators.required],
        ifsccode:['',Validators.required],
        uniqueSiteId:[this.uniqueSiteId],
      })
  }


  get f(): { [key: string]: AbstractControl } {
    return this.empRegisterationForm.controls;
  }

}