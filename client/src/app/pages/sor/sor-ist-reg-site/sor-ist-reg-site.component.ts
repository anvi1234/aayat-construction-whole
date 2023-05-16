import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService,NbComponentStatus, NbDialogRef, NbDialogService } from '@nebular/theme';
import { SorService } from 'src/app/shared/sor.service';

@Component({
  selector: 'app-sor-ist-reg-site',
  templateUrl: './sor-ist-reg-site.component.html',
  styleUrls: ['./sor-ist-reg-site.component.scss']
})
export class SorIstRegSiteComponent implements OnInit {
  Bill:any = []
  MB:any = [];
  deleteData :any;
  deleteType:any
  @ViewChild('dialogdelete') deleteModal: TemplateRef<any>;
  private deleteDialogRef: NbDialogRef<TemplateRef<any>>;
  constructor(
    private sorService:SorService,
    private router : Router,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
  ) { 

  }

  ngOnInit(): void {
    this.getSORWBM()
    this.getSorBillList()
  }

  getSorBillList(){
    this.sorService.getSORBill().subscribe((res)=>{
      this.Bill = res
      console.log("cccccccc",this.Bill,res)
    })
  }

  getSORWBM(){
    this.sorService.getSORRegSite().subscribe((res)=>{
    this.MB = res
    })
  }

  edit(data,type){
    if(type === "mb"){
      this.sorService.sitenameforBill.next(data);
      this.router.navigateByUrl("/add-sor")
    }
   console.log(data)
  }

  delete(data,type){
    this.deleteData = data;
    this.deleteType = type;
    this.deleteDialogRef = this.dialogService.open(this.deleteModal, { context: 'this is some additional data passed to dialog' });
    this.deleteDialogRef.onBackdropClick.subscribe((result: any) => {
    });
   }


   remove(){
    if(this.deleteType==="bill"){
      this.sorService.deleteBill(this.deleteData._id).subscribe((res)=>{
        this.showToast('success', 'Bill Deleted Successfully');
        this.deleteDialogRef.close();
         this.getSorBillList()
        })
    }
  if(this.deleteType==="mb"){
  this.sorService.deleteMB(this.deleteData._id).subscribe((res)=>{
    this.showToast('success', 'Mb Deleted Successfully'); 
    this.deleteDialogRef.close();
    this.getSORWBM()
  })
    }
   }
  showToast(status: NbComponentStatus, msg: any) {
    this.toastrService.show(status, msg, { status });
  }
  view(data,type){
    if(type === "bill"){
      this.sorService. sitenameforBill.next(data);
      this.router.navigateByUrl("/view-sor-bill")
    }
    if(type === "mb"){
      this.sorService.sitenameforBill.next(data);
      this.router.navigateByUrl("/view-sor-wbm")
    }
  }
}
