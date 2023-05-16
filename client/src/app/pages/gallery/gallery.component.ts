import { Component,OnInit ,TemplateRef, ViewChild} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ExpensesService } from 'src/app/shared/expenses.service';
import { NbComponentStatus, NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';
import { GalleryService } from 'src/app/shared/gallery.service';
import { Gallery } from 'src/app/model/gallery.model';
import { SiteRegService } from 'src/app/shared/site-reg.service';
// import { SmartTableData } from '../../../@core/data/smart-table';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

@Component({
  selector: 'app-gallery',
  templateUrl:'/gallery.component.html',
  styleUrls:['/gallery.component.scss']
})
export class GalleryComponent implements OnInit{
  public gridData =[]
  public galleryData =[]
 public imageGallery = []
 public fetchId: any;
  public GLOBALID:any
  public imageURRRl:any
  public siteNameValue:any = "";
  public locationValue:any = "";
  public GalleryFormModel:Gallery = new Gallery();
  @ViewChild('dialogdelete') editCompanyModal: TemplateRef<any>;
  private editCompanyDialogRef: NbDialogRef<TemplateRef<any>>;
  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
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
       date: {
          title: 'Uploaded Date',
          type: 'html',
          editable: 'false',
          filter: true,
        },
       
      }
    }

  
     source: LocalDataSource = new LocalDataSource();
      expenseSource:LocalDataSource = new LocalDataSource();
      constructor(private expensesService:ExpensesService,
        private dialogService: NbDialogService,
        private employeeService:EmployeeService,
        private galleryService: GalleryService,
        private router : Router,
        private toastrService: NbToastrService,
        private route: ActivatedRoute,
        private siteService: SiteRegService,
        ) {
        // const data = this.service.getData();
       
      }
    
      ngOnInit(){
        this.getUrl()
        this.getGalleryData();
        this.fetchId = this.route.snapshot.paramMap.get('id');
       }
    //   onDeleteConfirm(event): void {
    //     if (window.confirm('Are you sure you want to delete?')) {
    //       event.confirm.resolve();
    //     } else {
    //       event.confirm.reject();
    //     }
    //   }

    onCustomEvent(e:any,dialogdelete: TemplateRef<any>,dialogView: TemplateRef<any>){
           if(e.action=="viewAction"){
            this.GLOBALID = e.data._id;
            this.dialogService.open(dialogView, { context: 'this is some additional data passed to dialog' });
            this.getFileByID(this.GLOBALID)
         
           
           }
         
           if(e.action=="deleteAction"){
            this.GLOBALID = e.data._id;
            this.editCompanyDialogRef = this.dialogService.open(this.editCompanyModal, { context: 'this is some additional data passed to dialog' });
            this.editCompanyDialogRef.onBackdropClick.subscribe((result: any) => {
      
            });
           }
    }

    getGalleryData(){
      if(
        localStorage.getItem('routingSiteName')||
        localStorage.getItem('routinglocation')
       ){
        let data = {
          siteName:localStorage.getItem('routingSiteName'),
          location: localStorage.getItem('routinglocation')
        }
            this.galleryService.getGalleryByQuery(data).subscribe((res:any)=>{
                  this.gridData = res.file
              console.log("ggggggggggggg",res)
              this.source.load(this.gridData);
            })
       }
      if(localStorage.getItem('siteName') || localStorage.getItem('location')){}
        
      let data = {
        siteName:localStorage.getItem('siteName'),
        location: localStorage.getItem('location')
      }
      this.galleryService.getGalleryByQuery(data).subscribe((res:any)=>{
        this.gridData = res.file
    console.log("ggggggggggggg",res)
    this.source.load(this.gridData);
  })
    
      
     
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

    removeFile() {
        this.galleryService.deleteFile(this.GLOBALID).subscribe((data) => {
         this.showToast('success','File Deleted Successfully');
        this.getGalleryData()
        this.editCompanyDialogRef.close();
          }
        ) 
      }   

      getFileByID(id:any){
        this.galleryService.getGalleryById(id).subscribe(data => {
             this.GalleryFormModel = data.file;
            this.imageGallery =  data.file.avatar
        });
      }
    gotoAddExpenses(){
      this.router.navigate(['/add-gallery'])
    } 

    showToast(status: NbComponentStatus,msg:any) {
      this.toastrService.show(status, msg, { status });
    }

  download(pdfUrl:any) {
     window.open(pdfUrl + '#page=' +1, '_blank', '',);
    }
  
    getUrl() {
    const storage = getStorage();
     const starsRef = ref(storage, 'test/1656850501840_new16.jpg');
     getDownloadURL(starsRef)
     .then((url) => {
      this.imageURRRl = url
      console.log("gggggggggggurl",url)
       // Insert url into an <img> tag to "download"
     })
  }
  }
