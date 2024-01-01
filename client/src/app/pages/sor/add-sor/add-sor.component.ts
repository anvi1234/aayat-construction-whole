import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SORGrid } from 'src/app/model/grid.model';
import { SorService } from 'src/app/shared/sor.service';
import {
  NbComponentStatus,
  NbDialogRef,
  NbDialogService,
  NbToastrService,
} from '@nebular/theme';
import { Router } from '@angular/router';
import { Subscribe } from '@firebase/util';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-sor',
  templateUrl: './add-sor.component.html',
  styleUrls: ['./add-sor.component.scss'],
})
export class AddSorComponent implements OnInit {
  blankString = '';
  UPDATE_ID: any;
  combineAmount: any;
  sampleSorData: any = [];
  cgst = 9;
  sgst = 9;
  isSelect: boolean = true;
  totalAmount: any;
  gstAmount: any;
  sgstAmount: any;
  siteName: String;
  nameOfConstruction =
    'MEASUREMENTS  SHEET AT RAMKRISHNA FILLING STATION,LUCKNOW';
  nameOfWork = 'CIVIL AND MECHANICAL WORK';
  @ViewChild('dialogsorName') sorModal: TemplateRef<any>;
  private sorDialogRef: NbDialogRef<TemplateRef<any>>;
  @ViewChild('dialogcgst') cgstModal: TemplateRef<any>;
  private cgstDialogRef: NbDialogRef<TemplateRef<any>>;
  @ViewChild('dialogsgst') sgstModal: TemplateRef<any>;
  private sgstDialogRef: NbDialogRef<TemplateRef<any>>;
  dynamicArray: Array<SORGrid> = [];
  constructor(
    private sorService: SorService,
    private dialogService: NbDialogService,
    private router: Router
  ) {}
  headerData: any = [
    {
      h1: 'S.No.',
      h2: 'ServiceNo',
      h3: 'Job Description',
      h4: 'No.',
      h5: 'L',
      h6: 'B',
      h7: 'H/D/CO-EFF',
      h8: 'Qty',
      h9: 'Unit',
      h10: 'Sor Rate',
      h11: 'Amount',
    },
  ];
  data: any = [];
  siteNameBillSubscribe$:Subscription
  ngOnInit(): void {
    this.getSOR();
    this.siteNameBillSubscribe$ = this.sorService.sitenameforBill.subscribe((res: any) => {
      if (res) {
        console.log("res",res);
        (this.siteName = res.siteName),
          (this.nameOfConstruction = res.nameOfConstruction);
        this.nameOfWork = res.nameOfWork;
        (this.totalAmount = res.totalAmount),
          (this.gstAmount = res.gstAmount),
          (this.sgstAmount = res.sgstAmount),
          (this.combineAmount = res.combineAmount),
          (this.cgst = res.cgst.replace('%', ''));
        this.sgst = res.sgst.replace('%', '');
        this.isSelect = false;
        this.UPDATE_ID = res._id;
      }
      else{
        this.isSelect = true;
      }
    });

  }
  change(index1: any, index2: any, data: any) {
    let array: any = [];
    let number = 0;
    let value = this.data[index1].subArray[index2];
    console.log('nnn', Number(value.count2));
    let a =
      (Number(value.NO) === 0 ? 1 : Number(value.NO)) *
      (Number(value.L) === 0 ? 1 : Number(value.L)) *
      (Number(value.B) === 0 ? 1 : Number(value.B)) *
      (Number(value.HDCOFE) === 0 ? 1 : Number(value.HDCOFE));
    this.data[index1].subArray[index2].QTY = a.toFixed(2);
    this.data[index1].subArray.forEach((e: any) => {
      number = number + Number(e.QTY);
    });
    this.data[index1].QTY = number;
    this.data[index1].AMOUNT = (number * this.data[index1].SORRATE).toFixed(2);
  }

  addRow() {
    this.data.push({
      SNO: '',
      SERVICENO: '',
      JOBDESCRIPTION: '',
      NO: '',
      L: '',
      B: '',
      HDCOFE: '',
      QTY: '',
      UNIT: '',
      SORRATE: '',
      AMOUNT: '',
      subArray: [],
    });
  }

  addSubRowRow(index1) {
    this.data[index1].subArray.push({
      SNO: '',
      SERVICENO: '',
      JOBDESCRIPTION: '',
      NO: '',
      L: '',
      B: '',
      HDCOFE: '',
      QTY: '',
      UNIT: '',
      SORRATE: '',
      AMOUNT: '',
    });
  }

  deletesubRow(index1, index2) {
    this.data[index1].subArray.splice(index2, 1);
  }

  deleteRow(index1) {
    this.data.splice(index1, 1);
  }

  getSOR() {
    this.sorService.getSampleSOR().subscribe((res) => {
      this.sampleSorData = res;
    });
  }

  saveandNext() {
    this.sorDialogRef = this.dialogService.open(this.sorModal, {
      context: 'this is some additional data passed to dialog',
    });
    this.sorDialogRef.onBackdropClick.subscribe((result: any) => {});

    this.siteName = this.nameOfConstruction.toLowerCase();
  }

  generateAmount() {

    let number = 0;

    this.data.forEach((e) => {
      number = number + e.AMOUNT;
    });

    this.totalAmount = Math.round(number);

    this.gstAmount = ((Number(this.totalAmount) * this.cgst) / 100).toFixed(2);
    this.sgstAmount = ((Number(this.totalAmount) * this.sgst) / 100).toFixed(2);
    this.combineAmount = (
      Number(this.totalAmount) +
      Number(this.gstAmount) +
      Number(this.sgstAmount)
    ).toFixed(2);
  }

  save() {
    let obj = {
      siteName: this.siteName,
      nameOfConstruction: this.nameOfConstruction,
      nameOfWork: this.nameOfWork,
      totalAmount: this.totalAmount,
      gstAmount: this.gstAmount,
      sgstAmount: this.sgstAmount,
      combineAmount: this.combineAmount,
      cgst: 'CGST' + this.cgst + '%',
      sgst: 'SGST' + this.sgst + '%',
      data: this.data,
    };

    this.sorService.createSorRegSite(obj).subscribe((res) => {
      if (res.message === 'success') {
        this.sorService.sorDataForBill.next(res.sor);
        this.router.navigateByUrl('/generate-sor-invoice');
        this.sorDialogRef.close();
      }
    });
    console.log('value', this.data, this.siteName);
  }

  changeCGST() {
    this.cgstDialogRef = this.dialogService.open(this.cgstModal, {
      context: 'this is some additional data passed to dialog',
    });
    this.cgstDialogRef.onBackdropClick.subscribe((result: any) => {});
  }

  changeSGST() {
    this.sgstDialogRef = this.dialogService.open(this.sgstModal, {
      context: 'this is some additional data passed to dialog',
    });
    this.sgstDialogRef.onBackdropClick.subscribe((result: any) => {});
  }

  sampleValueChanged(data) {
    this.data = [];
    let dataValue = this.sampleSorData.filter((res) => {
      return res.siteName === data.target.value;
    });
    this.data = dataValue[0].data;
  }

  update() {
    let obj = {
      siteName: this.siteName,
      nameOfConstruction: this.nameOfConstruction,
      nameOfWork: this.nameOfWork,
      totalAmount: this.totalAmount,
      gstAmount: this.gstAmount,
      sgstAmount: this.sgstAmount,
      combineAmount: this.combineAmount,
      cgst: 'CGST' + this.cgst + '%',
      sgst: 'SGST' + this.sgst + '%',
      data: this.data,
    };

    this.sorService.updateSORRegSite(this.UPDATE_ID, obj).subscribe((res) => {
      if (res.message === 'success') {
        this.sorService.sorDataForBill.next(res.sor);
        this.router.navigateByUrl('/generate-sor-invoice');
        this.sorDialogRef.close();
      }
    });
    console.log('value', this.data, this.siteName);
  }

  ngOnDestroy(){
    console.log("destrou")
    this.siteNameBillSubscribe$.unsubscribe();
    this.sorService.sitenameforBill.next(null)
    this.isSelect = true;
  }

  changeSGSTValue(){
    this.sgstAmount = ((Number(this.totalAmount) * this.sgst) / 100).toFixed(2);
    this.combineAmount = (
      Number(this.totalAmount) +
      Number(this.gstAmount) +
      Number(this.sgstAmount)
    ).toFixed(2);
    this.sgstDialogRef.close();
  }

  changeCGSTValue(){
    this.gstAmount = ((Number(this.totalAmount) * this.cgst) / 100).toFixed(2);
    this.combineAmount = (
      Number(this.totalAmount) +
      Number(this.gstAmount) +
      Number(this.sgstAmount)
    ).toFixed(2);
    this.cgstDialogRef.close();
  }
}
