import { Component, OnInit } from '@angular/core';
import { SorService } from 'src/app/shared/sor.service';

@Component({
  selector: 'app-view-ledger',
  templateUrl: './view-ledger.component.html',
  styleUrls: ['./view-ledger.component.scss']
})
export class ViewLedgerComponent implements OnInit {
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
  constructor(
    private sorSer : SorService
  ) { }

  ngOnInit(): void {
    this.sorSer.ledgerBill.subscribe((res:any)=>{
      this.fromDate = this.formatDate(new Date(res.fromDate))
      this.toDate =  this.formatDate(new Date( res.toDate ))
      this.accountName = res.accountName 
      this.totalCredit = res.totalCredit
      this.totalDebit = res.totalDebit
      this.closingBal = res.closingBal
      this.grandCredit = res.grandCredit 
      this.grandDebit = res.grandDebit
      this.data = res.dataArray
    })

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
  
}
