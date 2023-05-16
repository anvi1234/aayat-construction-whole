import { Component,OnInit ,TemplateRef} from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbToastrService } from '@nebular/theme';
import { Gallery } from 'src/app/model/gallery.model';
import { GalleryService } from 'src/app/shared/gallery.service';
import { SiteRegService } from 'src/app/shared/site-reg.service';
import { environment } from 'src/environments/environment';
@Component({
    selector: 'add-gallery',
    templateUrl:'/add-gallery.component.html',
    styleUrls:['/add-gallery.component.scss']
  })
  export class AddGalleryComponent {
    public myFiles:any=[];
    fileArr:any = [];
    imgArr:any = [];
     isShow:boolean = false;
    fileObj:any = [];
    public siteNameValue:any = "";
    public locationValue:any = "";
    public siteLocation =[{_id:"null",location:"null"}];
    public siteName:any =[{_id:"null",siteName:"null"}]
    public enviroments = environment.apiBaseUrl;
    public GalleryFormModel:Gallery = new Gallery();
    public model: any = {};
    filesToUpload:any = [];
    constructor(
      private galleryService: GalleryService,
      private route: ActivatedRoute,
      private toastrService: NbToastrService,
      private router:Router,
      private siteService :SiteRegService,
      private storage:AngularFireStorage
    ){
      if(
        localStorage.getItem('routingSiteName')||
        localStorage.getItem('routinglocation')
      ){
        this.isShow = true;
     this.GalleryFormModel.location = localStorage.getItem('routinglocation')
     this.GalleryFormModel.siteName =  localStorage.getItem('routingSiteName')
      }

      if(
        localStorage.getItem('siteName') || localStorage.getItem('location')
      ){
        this.isShow = true;
        this.GalleryFormModel.location =  localStorage.getItem('location')
        this.GalleryFormModel.siteName =  localStorage.getItem('siteName')
      }
     
    }

    ngOnInit(){
      this.getSite()
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
        this.galleryService.createGallery(this.GalleryFormModel,this.model['files'])
          .subscribe((e)=>{
            if(e){
              this.router.navigate(['gallery'])
            }
            else{
                this.showToast('success','File Not Added')
               }
            console.log("ggg",e)
          })
    }
      showToast(status: NbComponentStatus,msg:any) {
        this.toastrService.show(status, msg, { status });
      }   
      
      getSite(){
        this.siteService.getSite().subscribe((data:any)=>{
        this.siteLocation = data;
        this.siteName = data;
        })
      }
    
       
  }