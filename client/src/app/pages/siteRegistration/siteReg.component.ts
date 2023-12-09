import { Component, HostListener, OnInit, Optional, TemplateRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { GalleryService } from 'src/app/shared/gallery.service';
import { SiteRegService } from 'src/app/shared/site-reg.service';
import { dateFormatingValue } from 'src/util/dataformating';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import * as fileSaver from 'file-saver';
interface Item {
  [key: string]: any;
}

@Component({
  selector: 'app-site',
  templateUrl: '/siteReg.component.html',
  styleUrls: ['/siteReg.component.scss']
})

export class SiteRegComponent implements OnInit {
  public isActive: boolean = false
  public gridData: any = []
  ul = document.getElementById("siteTableBody");
  liSelected: any;
  index = -1;
  selectedRow = 0
  public styleOne: boolean = false
  public byIndexingChangeColor = -1
  public style
  public isActiveClass: boolean = false
  p: number = 1
  public siteName: any
  public galleryData: any;
  public frebAseURLDATA = []
  public urlOFFirebae: any = []
  public GLOBALID: any;
  @ViewChild('dialogdelete') editCompanyModal: TemplateRef<any>;
  private editCompanyDialogRef: NbDialogRef<TemplateRef<any>>;
  @ViewChild('dialogviewImage') viewCompanyModal: TemplateRef<any>;
  private viewCompanyDialogRef: NbDialogRef<TemplateRef<any>>;
  public imageGallery: any = []
  public fetchd: any;
  public settings = {

    actions: {
      position: "left",

      custom: [
        {
          name: 'deleteAction',
          title: '<i class="nb-trash"  title="Delete" data-toggle="tooltip"></i>',

        },
        {
          name: 'transactionAction',
          title: '<i class="nb-star" title="Transaction" data-toggle="tooltip"></i>',

        },
        {
          name: 'editAction',
          title: '<i class="nb-edit" title="Edit" data-placement="top"  data-toggle="tooltip"></i>'
        },
        {
          name: 'taskAction',
          title: '<i class="nb-arrow-retweet" title="Task" data-placement="top" data-toggle="tooltip"></i>'
        },
        {
          name: 'expenseAction',
          title: '<i class="nb-compose" title="Expenses" data-placement="top" data-toggle="tooltip"></i>'
        },
        {
          name: 'galleryAction',
          title: '<i class="nb-snowy-circled red"  title="Gallery" data-placement="top" data-toggle="tooltip"></i>'
        },
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
      status: {
        title: 'Status',
        type: 'html',
        editable: 'false',
        filter: true,
      },
      poNo: {
        title: 'P.O Number',
        type: 'html',
        editable: 'false',
        filter: true,
      },
      billNo: {
        title: 'Bill Number',
        type: 'html',
        editable: 'false',
        filter: true,
      },
      date: {
        title: 'Registered Date',
        type: 'html',
        editable: 'false',
        filter: true,
      },

    }
  }


  source: LocalDataSource = new LocalDataSource();
  filteredData: any;

  constructor(private siteService: SiteRegService,
    private dialogService: NbDialogService,
    private galleryService: GalleryService,
    private router: Router,
    private toastrService: NbToastrService,
    private sanitizer: DomSanitizer


  ) {


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

  removeClass(el: any, className: any) {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  };

  addClass(el: any, className: any) {
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ' ' + className;
    }
  };



  ngOnInit() {
    this.siteService.selectedData.next(null);
    this.getSite()
  }

  getSite() {
    this.siteService.getSite().subscribe((e: any) => { 
      this.gridData = e;
      let active = this.gridData.filter((e) => {
        return e.status === "Active"
      })
      let hold = this.gridData.filter((e) => {
        return e.status === "Hold"
      })
      let closed = this.gridData.filter((e) => {
        return e.status === "Closed"
      })

      this.gridData = [...active,...hold, ...closed]
      this.filteredData = this.gridData
     
      this.siteService.dataForFilter.next(this.gridData)
      this.source.load(this.gridData);
    })
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
  }

  removeEmployee() {
    this.siteService.deleteSite(this.GLOBALID).subscribe((data) => {
      this.showToast('success', 'Site Detailed Deleted Successfully');
      this.editCompanyDialogRef.close();
      this.getSite()
    }
    )
  }

  gotoAddEmployee() {
    this.router.navigate(['/add-site'])
  }

  showToast(status: NbComponentStatus, msg: any) {
    this.toastrService.show(status, msg, { status });
  }

  onUserRowSelect(data: any) {
    this.router.navigate([`/expenses/${data.data._id}`])
    this.siteService.selectedData.next(data.data);

  }

  getAllImagesRelatedToThisId(data: any) {
    this.galleryService.getGalleryByQuery(data).subscribe((e: any) => {
      this.imageGallery = e.file;
      this.imageGallery = this.imageGallery.sort((dateA: any, dateB: any) => new Date(dateB.uploaded).valueOf() - new Date(dateA.uploaded).valueOf())
      this.getUrl(this.imageGallery)
    })
  }

  getUrl(urlData: any) {
    this.urlOFFirebae = []
    urlData.forEach((data: any) => {
      data.fireBaseUrl.forEach((image: any) => {
        const storage = getStorage();
        const starsRef = ref(storage, image);
        getDownloadURL(starsRef)
          .then((url: any) => {
            this.urlOFFirebae.push(url)
          })
      })
    })
  }

  gotoAddToDayPhoto(dialogviewImage: TemplateRef<any>) {
    this.router.navigate([`/add-gallery/${this.GLOBALID}`])
    this.siteService.selectedData.next(this.galleryData);
    this.viewCompanyDialogRef.close()
    //  this.dialogRef.close()
  }

  public getSantizeUrl(url: string) {
    console.log(url, this.sanitizer.bypassSecurityTrustUrl(url))
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  getExtensionOfFile(data: any) {
    const [fname, lastname] = data.split('?');
    return fname.slice((Math.max(0, fname.lastIndexOf(".")) || Infinity) + 1);
  }

  download(image: any) {
    fileSaver.saveAs(image)
  }

  Search() {
   this.gridData =  this.filteredData.filter(item =>
      Object.keys(item).some(key => 
        item[key].toString().toLowerCase().includes(this.siteName.toLowerCase())
      )
    );
  }

  
  changeWithAction(i: any, type: any, data: any) {
    if (type === "edit") {
      this.router.navigate([`edit-site/${data._id}`])
      localStorage.setItem('routingSiteName', data.siteName);
      localStorage.setItem('routinglocation', data.location);
      localStorage.setItem('siteKeyId', data.uniqueSiteId);
    }
    if (type === "trans") {

      this.router.navigate([`/transaction/${data.uniqueSiteId}`])
      localStorage.setItem('routingSiteName', data.siteName);
      localStorage.setItem('siteKeyId', data.uniqueSiteId);
      localStorage.setItem('routinglocation', data.location)
      this.siteService.selectedData.next(data);
    }
    if (type === "image") {

      this.getAllImagesRelatedToThisId(data)
      this.galleryData = data;
      this.GLOBALID = data._id
      this.viewCompanyDialogRef = this.dialogService.open(this.viewCompanyModal, { context: 'this is some additional data passed to dialog' });
      this.viewCompanyDialogRef.onBackdropClick.subscribe((result: any) => {
      })
    }
    if (type === "expense") {
      this.router.navigate([`/expenses/${data.uniqueSiteId}`])
      localStorage.setItem('routingSiteName', data.siteName);
      localStorage.setItem('siteKeyId', data.uniqueSiteId);
      localStorage.setItem('routinglocation', data.location);
     
      this.siteService.selectedData.next(data);
    }
    if (type === "task") {
      this.router.navigate([`/task/${data.uniqueSiteId}`])
      this.siteService.selectedData.next(data);
      localStorage.setItem('routingSiteName', data.siteName);
      localStorage.setItem('routinglocation', data.location);
      localStorage.setItem('siteKeyId', data.uniqueSiteId);
    }
    if (type === "delete") {

      this.GLOBALID = data._id;
      this.editCompanyDialogRef = this.dialogService.open(this.editCompanyModal, { context: 'this is some additional data passed to dialog' });
      this.editCompanyDialogRef.onBackdropClick.subscribe((result: any) => {
      });
    }
  }

}