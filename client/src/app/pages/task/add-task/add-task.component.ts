import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { DynamicGrid, labourGrid } from 'src/app/model/grid.model';
import { Task } from 'src/app/model/task.model';
import { GalleryService } from 'src/app/shared/gallery.service';
import { SiteRegService } from 'src/app/shared/site-reg.service';
@Component({
    selector: 'app-add-task',
    templateUrl:'/add-task.component.html',
    styleUrls:['/add-task.component.scss']
  })
  export class AddTaskComponent implements OnInit{
       public TaskFormModel: Task = new Task();
       public model: any = {};
       public siteNameValue:any = "";
       public locationValue:any = "";
       public isShow: boolean = false;
       public dialogTitle = "Add Task";
       dynamicArray: Array<labourGrid> = [];
        newDynamic: any = {};
       public clickTitle ="Save"
       public fetchId:any;
        fileArr:any = [];
        imgArr:any = [];
        fileObj:any = [];
        public siteLocation =[{_id:"null",location:"null"}];
       public siteName =[{_id:"null",siteName:"null"}];

      constructor(
        private galleryService: GalleryService,
        private route: ActivatedRoute,
        private toastrService: NbToastrService,
        private router:Router,
        private siteService:SiteRegService
      ){

      }

      ngOnInit(): void {
        if(
          localStorage.getItem('routingSiteName') || localStorage.getItem('routinglocation')
        ){
          this.isShow = true;
          this.TaskFormModel.location =  localStorage.getItem('routinglocation')
          this.TaskFormModel.siteName =  localStorage.getItem('routingSiteName')
        }
        if(
          localStorage.getItem('siteName') || localStorage.getItem('location')
        ){
          this.isShow = true;
          this.TaskFormModel.location =  localStorage.getItem('location')
          this.TaskFormModel.siteName =  localStorage.getItem('siteName')
        }
      
        this. getSite()
        this.fetchId = this.route.snapshot.paramMap.get('id');
        if(this.fetchId){
          this.dialogTitle = "Edit Task",
          this.clickTitle = "Update"
          this.getTaskByID(this.fetchId);
        }

        this.newDynamic = { name: "", contact: "",charge: "",work:[]};
        this.dynamicArray.push(this.newDynamic);
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
        
        if(this.fetchId){
         
            this.galleryService.updateTask(this.TaskFormModel,this.fetchId).subscribe(e=>{
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
         
          this.galleryService.addTask(this.TaskFormModel , this.dynamicArray,this.model['files']).subscribe(e=>{
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
            this.TaskFormModel = data.file;
            this.TaskFormModel.startDate = new Date(data.file.startDate)
            this.TaskFormModel.endDate = new Date(data.file.endDate)
        })
    }

    addRow() {
     
      this.newDynamic = { name: "", contact: "" ,charge:"",work:[]};
      this.dynamicArray.push(this.newDynamic);
      this.TaskFormModel.totalLabour = Number((this.dynamicArray.length)-1)
      console.log("bbbbbbb", )
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
  

  }