import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  HostListener,
} from '@angular/core';
import {
  NbComponentStatus,
  NbDialogRef,
  NbDialogService,
  NbToastrService,
} from '@nebular/theme';
import { drawing } from 'src/app/model/drawing.model';
import { GalleryService } from 'src/app/shared/gallery.service';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { saveAs } from 'file-saver';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.scss'],
})
export class DrawingComponent implements OnInit {
  siteName: any;
  imageURRRl: any;
  deleteID: any;
  isExport: boolean = false;
  designation = localStorage.getItem('designation');
  drawingForm: drawing = new drawing();
  @ViewChild('dialogdrawing') drawingModal: TemplateRef<any>;
  private drawingDialogRef: NbDialogRef<TemplateRef<any>>;
  @ViewChild('dialogdelete') deleteModal: TemplateRef<any>;
  private deleteDialogRef: NbDialogRef<TemplateRef<any>>;
  public model: any = {};
  public drawingData: any = [];
  constructor(
    private dialogService: NbDialogService,
    private galleryService: GalleryService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.getDrawingData();
  }

  Search() {}
  addDrawing() {
    this.drawingDialogRef = this.dialogService.open(this.drawingModal, {
      context: 'this is some additional data passed to dialog',
    });
    this.drawingDialogRef.onBackdropClick.subscribe((result: any) => {});
  }

  // @HostListener('window:popstate', ['$event'])
  // onPopState(event) {
  //  this.drawingDialogRef.close()

  //   //Here you can handle your modal
  // }

  onFileChange(event: any) {
    const reader = new FileReader();
    const file = event.target.files[0];
    this.model['files'] = file;
  }

  submit() {
    this.galleryService
      .createDrawing(this.drawingForm, this.model['files'])
      .subscribe((e) => {
        if (e) {
          this.showToast('success', 'Drawing Added Successfully');
          this.drawingForm = new drawing();
          this.ngOnInit()
          this.drawingDialogRef.close();
        } else {
          this.showToast('success', 'File Not Added');
        }
      });
  }
  showToast(status: NbComponentStatus, msg: any) {
    this.toastrService.show(status, msg, { status });
  }

  getDrawingData() {
    this.galleryService.getDrawing().subscribe((e) => {
      this.drawingData = e;
    });
  }

  drawingTypeChange(data: any) {
    this.deleteID = data.target.value;
    this.imageURRRl = ""
    this.galleryService.getdrawingId(data.target.value).subscribe((e) => {
      this.isExport = true;
      const storage = getStorage();
      const starsRef = ref(storage, e.file.fireBaseUrl);
      getDownloadURL(starsRef).then((url) => {
        this.imageURRRl = url;
      });
    });
  }
  download() {
    fileSaver.saveAs(this.imageURRRl);
  }

  delete() {
    this.deleteDialogRef = this.dialogService.open(this.deleteModal, {
      context: 'this is some additional data passed to dialog',
    });
    this.deleteDialogRef.onBackdropClick.subscribe((result: any) => {});
  }

  removeDrawing() {
    this.galleryService.deleteDrawing(this.deleteID).subscribe((res)=>{
      this.showToast('success', 'Drawing Deleted Successfully');
      this.deleteDialogRef.close()
      this.ngOnInit()
    })

  }
}
