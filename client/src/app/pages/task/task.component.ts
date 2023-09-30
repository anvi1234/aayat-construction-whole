import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { Gallery } from 'src/app/model/gallery.model';
import { Task } from 'src/app/model/task.model';
import { GalleryService } from 'src/app/shared/gallery.service';
import { SiteRegService } from 'src/app/shared/site-reg.service';
import { CalendarOptions } from '@fullcalendar/angular';
import { labourGrid } from 'src/app/model/grid.model';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import * as fileSaver from 'file-saver';


@Component({
  selector: 'app-task',
  templateUrl: '/task.component.html',
  styleUrls: ['/task.component.scss']
})
export class TaskComponent {
  public gridData: any;
  public calenderIndexing :any
  public siteNameForHeader: any
  public locationNameForHeader: any
  public totaalPaymentOfWorker = 0
  public totalPaymentPending = 0
  public totalPaymentPaid = 0
  public calenderFrom: any
  public calenderHide: boolean = true;
  public fromDate: any
  public updatedWork: any
  public toDate: any
  public wholeDataShow: any
  public advancePayment: any
  public editData: boolean = false;
  public totalWorkey: any
  public totalWork: any
  enableEditIndex = null
  enableCalenderIndex = null
  public enableCalender: any
  public totalAmountPerDay: any
  public selectedLabourWorkForUpdate: any
  public selectedDate: any
  public siteNameValue: any = "";
  public locationValue: any = "";
  public workerShow: boolean = false;
  public calenderView: boolean = false;
  public galleryData = []
  public siteLocation = [{ _id: "null", location: "null" }];
  public completedStatus: any;
  public onTrackStatus: any;
  public delayedStatus: any;
  public workersArray: any = []
  public fetchId: any;
  public overTime: any
  public attendecne: any
  public GLOBALID: any;
  public imageGallery: any;
  urlOFFirebae:any = []
  dynamicArray: Array<labourGrid> = [];
  newDynamic: any = {};
  public GalleryFormModel: Task = new Task();
  @ViewChild('dialogcalenderStatement') ViewRecordModal: TemplateRef<any>;
  private ViewRecordDialogRef: NbDialogRef<TemplateRef<any>>;
  @ViewChild('dialogdelete') deleteModal: TemplateRef<any>;
  private deleteDialogRef: NbDialogRef<TemplateRef<any>>;
  @ViewChild('dialogRecordView') attendecneRecordModal: TemplateRef<any>;
  private attendecneRecordDialogRef: NbDialogRef<TemplateRef<any>>;
  @ViewChild('dialogPaymentView') paymentRecordModal: TemplateRef<any>;
  private paymentRecordDialogRef: NbDialogRef<TemplateRef<any>>;
  @ViewChild('dialogviewImage') viewCompanyModal: TemplateRef<any>;
  private viewCompanyDialogRef: NbDialogRef<TemplateRef<any>>;

  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  public monthDayList = [
    { full: "January", short: "Jan", day: "Sun" },
    { full: "February", short: "Feb", day: "Mon" },
    { full: "March", short: "Mar", day: "Tue" },
    { full: "April", short: "Apr", day: "Wed" },
    { full: "May", short: "May", day: "Thr" },
    { full: "June", short: "Jun", day: "Fri" },
    { full: "July", short: "Jul", day: "Sat" },
    { full: "Augest", short: "Aug", day: "Sun" },
    { full: "September", short: "Sep", day: "" },
    { full: "October", short: "Oct", day: "" },
    { full: "November", short: "Nov", day: "" },
    { full: "December", short: "Dec", day: "" },
  ]


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      { title: 'event 1', date: '2020-06-27' },
      { title: 'event 2', date: '2020-06-30' }
    ]
  };

  public siteName =

    [{ _id: "null", siteName: "null" }];

  public settings = {
    hideSubHeader: true,
    actions: {
      position: "right",
      // edit: {
      //     name: 'editAction',
      //     title: '<i class="nb-edit"></i>'
      // },
      custom: [

        {
          name: 'editAction',
          title: '<i class="nb-edit"></i>'
        },
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
      startdate: {
        title: 'Start Date',
        type: 'html',
        editable: 'false',
        filter: true,
      },
      taskName: {
        title: 'Task Name',
        type: 'html',
        editable: 'false',
        filter: true,
      },

      enddate: {
        title: 'End Date',
        type: 'html',
        editable: 'false',
        filter: true,
      },
      progressStatus: {
        title: 'Progress',
        type: 'html',
        editable: 'false',
        filter: true,
      },
    }
  }


  source: LocalDataSource = new LocalDataSource();
  constructor(
    private dialogService: NbDialogService,
    private galleryService: GalleryService,
    private router: Router,
    private siteService: SiteRegService,
    private toastrService: NbToastrService,
    private route: ActivatedRoute,
  ) {
    // const data = this.service.getData();

  }

  ngOnInit() {
    // this.getSite();
    this.getTaskDataValue()

  }
  //   onDeleteConfirm(event): void {
  //     if (window.confirm('Are you sure you want to delete?')) {
  //       event.confirm.resolve();
  //     } else {
  //       event.confirm.reject();
  //     }
  //   }

  onCustomEvent(e: any, dialogview: TemplateRef<any>, dialogdelete: TemplateRef<any>) {
    if (e.action == "editAction") {
      this.GLOBALID = e.data._id;
      this.router.navigate([`/edit-task/${this.GLOBALID}`])
    }
    if (e.action == "viewAction") {
      this.GLOBALID = e.data._id;
      this.dialogService.open(dialogview, { context: 'this is some additional data passed to dialog' });
      this.getFileByID(this.GLOBALID);
    }

    if (e.action == "deleteAction") {
      this.GLOBALID = e.data._id;
      this.dialogService.open(dialogdelete, { context: 'this is some additional data passed to dialog' });
    }
  }



  getTaskDataValue() {
    return new Promise((resolve, reject) => {
      this.galleryService.getTask().subscribe((e: any) => {

        let data = e.reverse()
        data = e.map((y: any) => {
          y["startdate"] = this.dateFormating(y.startDate);
          y["enddate"] = this.dateFormating(y.endDate);
          y.laboursArray.map((d:any)=>{
            d["actionBtn"] = true;
            return d;
          })
          return y;
        });
        if (
          localStorage.getItem('routingSiteName') ||
          localStorage.getItem('routinglocation')
        ) {
          this.siteNameForHeader = localStorage.getItem('routingSiteName')
          this.locationNameForHeader = localStorage.getItem('routinglocation')
          this.gridData = data.filter((e: any) => {
            return e.uniqueSiteId === localStorage.getItem("siteKeyId")
          })

          console.log("griddata",this.gridData)
        }
        resolve(data)

      })
    
    })
  }


  getWorkerPayment(data: any) {
    data.forEach((e: any) => {
      this.totaalPaymentOfWorker = Number(this.totaalPaymentOfWorker) + Number(e.amountPerDay)
    })


    data.forEach((e: any) => {
      if (e.payment === "Paid") {
        this.totalPaymentPaid = Number(this.totalPaymentPaid) + Number(e.amountPerDay)
      }
    })

    data.forEach((e: any) => {
      if (e.payment === "NotPaid") {
        this.totalPaymentPending = (Number(this.totalPaymentPending) + Number(e.amountPerDay)) - Number(e.advancePay)
      }
    })

  }



  setStatus(data: any) {
    this.completedStatus = data.filter((e: any) => {
      return parseInt(e.progressStatus) === 100;
    }).length
    this.onTrackStatus = data.filter((e: any) => {
      return parseInt(e.progressStatus) > 50;
    }).length

    this.delayedStatus = data.filter((e: any) => {
      return parseInt(e.progressStatus) < 50;
    }).length

  }

  pading(n: any) {
    if (n > 9)
      return n;
    else
      return "0" + n
  }
  dateFormating(da: any) {
    let df = new Date(da);
    return `${this.pading(df.getDate())}-${this.monthDayList[df.getMonth()].short}-${df.getFullYear()}`
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
  }

  removeTask() {
    this.galleryService.deleteTask(this.GLOBALID).subscribe((data) => {
      this.showToast('success', 'Task Deleted Successfully');
      this.getTaskDataValue()
      this. deleteDialogRef.close()
    }
    )
  }

  getFileByID(id: any) {
    this.galleryService.getTaskById(id).subscribe(data => {
      this.imageGallery = data.file.avatar
      this.GalleryFormModel = data.file;
      this.workersArray = data.file.laboursArray
    });
  }

  gotoAddExpenses() {
    this.router.navigate(['/add-gallery'])
  }

  showToast(status: NbComponentStatus, msg: any) {
    this.toastrService.show(status, msg, { status });
  }

  download(pdfUrl: any) {
    window.open(pdfUrl + '#page=' + 1, '_blank', '',);
  }

  getSite() {
    this.siteService.getSite().subscribe((data: any) => {
      this.siteLocation = data;
      this.siteName = data
    })
  }

  addTask() {
    this.router.navigate(["add-task"])
  }

  showWorkers() {
    this.getFileByID(this.GLOBALID);
    this.workerShow = !this.workerShow
  }

  viewCaledner(index1: any,index2:any, item: any, wholeItem: any) {

    console.log("datattttttttt",index1,index2)
    this.selectedLabourWorkForUpdate = item
    this.gridData[index1].laboursArray[index2].actionBtn = false
    this.GalleryFormModel = wholeItem
    this.GLOBALID = wholeItem._id
    this.calenderView = !this.calenderView
    this.enableCalender = index2;
  }

  removeCalender(index1: any,index2:any, item: any, wholeItem: any){
    this.gridData[index1].laboursArray[index2].actionBtn = true
  }
  handleDateClick(arg: any) {
    this.selectedDate = new Date(arg.target.value)
    this.ViewRecordDialogRef = this.dialogService.open(this.ViewRecordModal, { context: 'this is some additional data passed to dialog' });
    this.ViewRecordDialogRef.onBackdropClick.subscribe((result: any) => {
    });
  }

  enableEditMethod(e: any, i: any, item: any) {
    this.editData = true;
    this.enableEditIndex = i;
    console.log(i, item);
  }

  submitWork() {
    this.advancePayment = this.advancePayment ?this.advancePayment:0
    let data: any = this.GalleryFormModel.laboursArray.filter((e: any) => {
      return e._id === this.selectedLabourWorkForUpdate._id
    })
    let chargePerHour = Number(data[0].charge) / 8;

    if (this.overTime && (this.attendecne === "P" || this.attendecne === "p")) {
      this.totalAmountPerDay = Number(data[0].charge) + (Number(chargePerHour) * Number(this.overTime))
    }
    if (this.attendecne === "A" || this.attendecne === "a") {
      this.totalAmountPerDay = 0
    }
    if (!this.overTime) {
      this.totalAmountPerDay = Number(data[0].charge)
    }
    data[0].work.push({
      date: this.selectedDate,
      overTime: this.overTime,
      amountPerDay: this.totalAmountPerDay,
      attendence: this.attendecne,
      advancePay: this.advancePayment,
      payment: "NotPaid"

    })
    this.galleryService.updateTask(this.GalleryFormModel, this.GLOBALID).subscribe(e => {
      if (e) {

        this.showToast('success', 'Task Updated Successfully');
        this.router.navigate(['task'])
        this.calenderView = false
        this.ViewRecordDialogRef.close();
      }
      else {
        // this.showToast('success','File Not Added')
      }
    })
  }

  delete(data: any) {
    // this.GLOBALID = data._id;
    this.deleteDialogRef = this.dialogService.open(this.deleteModal, { context: 'this is some additional data passed to dialog' });
    this.deleteDialogRef.onBackdropClick.subscribe((result: any) => {

    });
    this.GLOBALID = data._id
  }



  viewRecord(data: any, wholeData: any) {
    this.updatedWork = data
    this.GalleryFormModel = wholeData
    this.GLOBALID = wholeData._id
    this.attendecneRecordDialogRef = this.dialogService.open(this.attendecneRecordModal, { context: 'this is some additional data passed to dialog' });
    this.attendecneRecordDialogRef.onBackdropClick.subscribe((result: any) => {
    });

    this.totalWork = data.work.map((e: any) => {
      e["date"] = this.dateFormating(new Date(e.date))
      return e
    })
    this.getWorkerPayment(this.totalWork);
    this.totalWork.sort((dateA: any, dateB: any) => new Date(dateB.date).valueOf() - new Date(dateA.date).valueOf())
    this.totalWorkey = ['date', 'overTime', 'amountPerDay', 'attendence', 'advancePay', 'payment'];
  }

  saveData(data: any) {
    this.galleryService.updateTask(data, data._id).subscribe(e => {
      if (e) {
        this.getTaskDataValue()
        this.editData = false
      }
    })
  }


  submitPayment() {
    var ResulProduct = this.totalWork.filter((e: any) => {
      var date = new Date(e.date);
      if (date >= new Date(this.fromDate) && date <= new Date(this.toDate)) {
        e["payment"] = "Paid"
      };
      return e;
    })
    this.updatedWork.work = ResulProduct
    let dataMaodel: any = this.GalleryFormModel.laboursArray.filter((item: any) => item._id !== this.updatedWork._id);
    dataMaodel.push(this.updatedWork)
    this.GalleryFormModel.laboursArray = dataMaodel
    this.galleryService.updateTask(this.GalleryFormModel, this.GLOBALID).subscribe(e => {
      if (e) {
        this.showToast('success', 'Task Updated Successfully');

        this.calenderView = false
        this.paymentRecordDialogRef.close();
      }
      else {
        // this.showToast('success','File Not Added')
      }
    })
  }

  showPayment() {
    this.paymentRecordDialogRef = this.dialogService.open(this.paymentRecordModal, { context: 'this is some additional data passed to dialog' });
    this.paymentRecordDialogRef.onBackdropClick.subscribe((result: any) => {
    });
  }

  addRow(index: any, data: any) {
    this.newDynamic = { name: "", contact: "", charge: "", work: [] };
    this.gridData[index].laboursArray.push(this.newDynamic);
    this.editData = true;
    this.enableEditIndex = index;

  }

  updateCalednder(e: any, i: any) {
    this.calenderHide = false;
    this.enableCalenderIndex = i;
    console.log(i, e);
  }

  handler(data: any) {
    var date = new Date(this.calenderFrom)
    date.setDate(date.getDate() + 1)
    data.endDate = date;
    this.galleryService.updateTask(data, data._id).subscribe(e => {
      if (e) {
        this.getTaskDataValue()
        this.editData = false
        this.calenderHide = true
      }
    })
  }

  viewImage(data:any){
  
    this.dialogService.open(this.viewCompanyModal, { context: 'this is some additional data passed to dialog' });
    this.urlOFFirebae = []
    data["avatar"].forEach((data: any) => {
       const storage = getStorage();
        const starsRef = ref(storage, data);
        getDownloadURL(starsRef)
          .then((url: any) => {
            this.urlOFFirebae.push(url)
          })
      
    })
  
  }
  

  getExtensionOfFile(data:any){
    const[fname,lastname] = data.split('?');
 return fname.slice((Math.max(0, fname.lastIndexOf(".")) || Infinity) + 1);
}
}