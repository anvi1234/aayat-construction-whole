import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { SorService } from 'src/app/shared/sor.service';

@Component({
  selector: 'app-add-ledger',
  templateUrl: './add-ledger.component.html',
  styleUrls: ['./add-ledger.component.scss']
})
export class AddLedgerComponent implements OnInit {
  public ledgerData:any
  deletId:any
  @ViewChild('dialogdelete') deleteModal: TemplateRef<any>;
  private deleteDialogRef: NbDialogRef<TemplateRef<any>>;
  constructor(
    private sorService : SorService,
    private router:Router,
    private dialogService: NbDialogService,
  ) { }

  ngOnInit(): void {
    this.getLedgerList()
  }

  getLedgerList(){
    this.sorService.getledger().subscribe((res)=>{
      this.ledgerData = res;
    })
  }

  delete(data){
    this.deletId = data._id
    this.deleteDialogRef = this.dialogService.open(this.deleteModal, { context: 'this is some additional data passed to dialog' });
    this.deleteDialogRef.onBackdropClick.subscribe((result: any) => {
    });
  }

  remove(){
      this.sorService.deleteLedger(this.deletId).subscribe((res)=>{
        this.getLedgerList()
        this.deleteDialogRef.close()
      })
  }

  edit(data){
    this.sorService.ledgerBill.next(data);
    this.router.navigateByUrl("ledger")
   
  }

  view(data){
    this.sorService.ledgerBill.next(data);
    this.router.navigateByUrl("view-ledger")
  }
}
