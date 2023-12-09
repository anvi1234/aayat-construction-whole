import { Component, OnInit} from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { DynamicGrid, labourGrid } from 'src/app/model/grid.model';
import { Task } from 'src/app/model/task.model';
import { CustomvalidationService } from 'src/app/shared/customValidator.service';
import { GalleryService } from 'src/app/shared/gallery.service';
import { SiteRegService } from 'src/app/shared/site-reg.service';
@Component({
    selector: 'app-add-task',
    templateUrl:'/add-task.component.html',
    styleUrls:['/add-task.component.scss']
  })
  export class AddTaskComponent implements OnInit{
       
       public model: any = {};
       public siteNameValue:any = "";
       public locationValue:any = "";
       public isShow: boolean = false;
       public dialogTitle = "Add Task";
       taskForm!: FormGroup;
       dynamicArray: Array<labourGrid> = [];
        newDynamic: any = {};
       public clickTitle ="Save"
       public fetchId:any;
        fileArr:any = [];
        imgArr:any = [];
        fileObj:any = [];
        public siteLocation =[{_id:"null",location:"null"}];
       public siteName =[{_id:"null",siteName:"null"}];
  submitted: boolean;

      constructor(
        private galleryService: GalleryService,
        private route: ActivatedRoute,
        private toastrService: NbToastrService,
        private router:Router,
        private siteService:SiteRegService,
        private formBuilder:FormBuilder,
        private customVal:CustomvalidationService
      ){
      this.formInitialization()
      }

      ngOnInit(): void {
        this.getSite()
        this.fetchId = this.route.snapshot.paramMap.get('id');
        if(this.fetchId){
          this.dialogTitle = "Edit Task",
          this.clickTitle = "Update"
          this.getTaskByID(this.fetchId);
        }
      }
      
      getSite(){
        this.siteService.getSite().subscribe((data:any)=>{
        this.siteLocation = data;
        this.siteName = data
        })
      }

    onFileChange(event:any) {
      const reader = new FileReader();
      const file = event.target.files;
      const fileListAsArray = Array.from(file);
      
     fileListAsArray.forEach((item, i) => {
       this.fileArr.push({ item });
    })

    this.fileArr.forEach((item:any) => {
      this.fileObj.push(item.item);
    })

    this.model['files'] =  this.fileObj;
    }


      saveData(){
        this.submitted = true;
        console.log("this.labour",this.labour.length);
        this.labour.markAllAsTouched()
        if (this.taskForm.invalid) { 
          return;
        }
        if(this.fetchId){
         
            this.galleryService.updateTask(this.taskForm.value,this.fetchId).subscribe(e=>{
              if(e){
               
                this.showToast('success','Task Updated Successfully');
                this.router.navigate(['task'])
              }
             else{
              // this.showToast('success','File Not Added')
             }
            })
        }
      
        else{
          this.galleryService.addTask(this.taskForm.value ,this.model['files']).subscribe(e=>{
            if(e){
             
              this.showToast('success','Task Added Successfully');
              this.router.navigate(['task'])
            }
           else{
            // this.showToast('success','File Not Added')
           }
          })
       }
        }
      
        showToast(status: NbComponentStatus,msg:any) {
          this.toastrService.show(status, msg, { status });
        }    

        getTaskByID(id:any){
          this.galleryService.getTaskById(id).subscribe(data => {
            this.taskForm.patchValue(data.file);
            // this.taskForm.patchValue(data.file) = data.file;
            // this.TaskFormModel.startDate = new Date(data.file.startDate)
            // this.TaskFormModel.endDate = new Date(data.file.endDate)
        })
    }

    addRow() {
     
      this.newDynamic = { name: "", contact: "" ,charge:"",work:[]};
      this.dynamicArray.push(this.newDynamic);
      // this.TaskFormModel.totalLabour = Number((this.dynamicArray.length)-1)
      return true;
    }
  
    deleteRow(index: any) {
      
      if (this.dynamicArray.length == 1) {
        // this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
        return false;
      } else {
        this.dynamicArray.splice(index, 1);
        
        return true;
      }
    }
  
 formInitialization(){
  this.taskForm = this.formBuilder.group({
    imageUrl: ['',Validators.required],
    startDate: ['',Validators.required],
    endDate:[''],
    taskName:['',Validators.required],
    siteName: [localStorage.getItem('routingSiteName'),Validators.required],
    location: [localStorage.getItem('routinglocation'),Validators.required],
    totalLabour:[''],
    uniqueSiteId:[localStorage.getItem('siteKeyId')],
    progressStatus:['',Validators.required],
    laboursArray: this.formBuilder.array([this.createLabours()],Validators.required)
  })
 }

 createLabours(){
  return this.formBuilder.group({
    name:[null,Validators.required],
    contact:[null,[Validators.required,this.customVal.phoneNumberValidator()]],
    charge:[null,Validators.required],
    work:[[]]
  })
 }

 get labour():FormArray{
  return <FormArray> this.taskForm.get('laboursArray');
}

get f(): { [key: string]: AbstractControl } {
  return this.taskForm.controls;
}

addLabourRow(){
  const lastItem = this.labour.at(this.labour.length - 1);
    if (lastItem.valid) {
      this.labour.push(this.createLabours());
    } else {
      
      this.labour.markAllAsTouched()
    }
}
getItem(index: number) {
  return this.labour.controls[index] as FormGroup;
}

getNameControl(index: number,controlName:any) {
  return this.getItem(index).get(controlName);
}

remove(index:any){
    this.labour.removeAt(index)
}
  }