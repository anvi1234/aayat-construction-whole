import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { SorService } from 'src/app/shared/sor.service';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss']
})
export class LedgerComponent implements OnInit {

  constructor(
    private dialogService: NbDialogService,
    private sorService : SorService
  ) { }
  data: any = [];
  fromDate:any;
  globalId;
  toDate :any;
  isEdit = false;
  accountName = "BAJRANG SALES CORPORATION"
  totalCredit = 0
  totalDebit = 0
  closingBal = 0
  grandCredit = 0
  grandDebit = 0
  ledgerArray = []
  @ViewChild('dialogsorName') sorModal: TemplateRef<any>;
  private sorDialogRef: NbDialogRef<TemplateRef<any>>;
  ngOnInit(): void {
    this.sorService.ledgerBill.subscribe((res:any)=>{
      if(res){
        this.isEdit = true;
        this.globalId = res._id
        this.fromDate = this.formatDate(new Date(res.fromDate))
        this.toDate = this.formatDate(new Date( res.toDate ))
        this.accountName = res.accountName 
        this.totalCredit = res.totalCredit
        this.totalDebit = res.totalDebit
        this.closingBal = res.closingBal
        this.grandCredit = res.grandCredit 
        this.grandDebit = res.grandDebit
        this.data = res.dataArray
      }
      else{
        this.isEdit = false
        this.data.push({
          date: '',
         type: '',
         particulars: 'Opening Balance',
          billNo: '',
          debit: 0,
          credit: 0,
          balance: 0,
        });
      }
    })
   

  }

  addRow() {
    this.data.push({
      date: '',
     type: '',
     particulars: '',
      billNo: '',
      debit: '',
      credit: '',
      balance: '',
    });
  }

  deleteRow(index) {
    this.data.splice(index, 1);
  }

  saveandNext(){

  }

  change(index,data,type){
    this.totalCredit = 0
    this.totalDebit= 0
    if(type === 'debit'){
        if( this.data[index].particulars === 'Opening Balance'){
          this.data[index].balance = data.target.value;
          this.data[index].credit= 0;
        }
        else{
          this.data[index].balance = parseInt(this.data[index-1].balance) + parseInt(data.target.value)
        }
       
    }
    if(type === 'credit'){
      this.data[index].balance = parseInt(this.data[index-1].balance) - parseInt(data.target.value)
    }
    this.data.forEach((e)=>{
      this.totalCredit =  this.totalCredit +  parseInt(e.credit?e.credit:0)
      this.totalDebit = this.totalDebit + parseInt(e.debit?e.debit:0);
     

    })
    this.closingBal = this.data[this.data.length -1 ].balance;
    this.grandDebit = this.totalDebit;
    this.grandCredit = this.totalCredit - this.closingBal
  }

  save(){
    let obj = {
    fromDate:  this.changeFormatOfData(this.fromDate),
    toDate : this.changeFormatOfData(this.toDate),
    accountName: this.accountName,
    totalCredit : this.totalDebit,
    totalDebit :this.totalDebit,
    closingBal : this.closingBal,
    grandCredit : this.grandCredit,
    grandDebit : this.grandDebit,
    dataArray: this.data
    }

    this.sorService.addledger(obj).subscribe((res)=>{
      this.sorDialogRef.close()
    })
  }
  changeFormatOfData(date){
    const today = new Date(date)
    return  today.getDate() + ' ' + today.toLocaleString('default', { month: 'short' })  + ' '+ today.getFullYear()  
  }

  saveandnext(){
    this.sorDialogRef = this.dialogService.open(this.sorModal, {
      context: 'this is some additional data passed to dialog',
    });
    this.sorDialogRef.onBackdropClick.subscribe((result: any) => {});

  }

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

  update(){
    let obj = {
      fromDate:  this.changeFormatOfData(this.fromDate),
      toDate : this.changeFormatOfData(this.toDate),
      accountName: this.accountName,
      totalCredit : this.totalDebit,
      totalDebit :this.totalDebit,
      closingBal : this.closingBal,
      grandCredit : this.grandCredit,
      grandDebit : this.grandDebit,
      dataArray: this.data
      }
  
      this.sorService.updateLedger(this.globalId,obj).subscribe((res)=>{
        this.sorDialogRef.close();

      })
  }
}
