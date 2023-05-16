import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SorService } from 'src/app/shared/sor.service';
import { NbComponentStatus, NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generate-invoice',
  templateUrl: './generate-invoice.component.html',
  styleUrls: ['./generate-invoice.component.scss']
})
export class GenerateInvoiceComponent implements OnInit {
  data:any = []
  cgst = 9;
  sgst = 9;
  billName=""
  nameOfSender = "Bharat Petroleum Corporation Ltd."
  address1 = "BPCL OFFICE COMPLEX, Business Process Excellence center (BPEC),"
  address2 = "Plot no-6, Sector-2, Behind CIDCO Garden," 
 landmark="Khargar, Navi Mumbai-410210"                  
  totalAmount :any;
  gstAmount : any;
  sgstAmount : any;
  combineAmount :any;
  detailsOfBill = {
    vendorCode : "359055",
    billNo:"",
    Date:"dd/mm/yy",
    location:"",
    po:"",
    gstinNo:"09BDKPK6991A2Z9",
    state:"UTTAR PRADESH",
    panNo:"BDKPK6991A",
    work:"Civil Mech & Elec Work",
    nameOfBill:"CONSTRUCTION OF GANTRY WORK AT RAM KRISHNA FS,LUCKNOW",
    addressOfbyuerLocation:"",
    extra:"",
    nameofbpclbuyerloc:"",
    bpclstatecode:"",
    addressofbpcbuyerstate:"",
    distt:"",
    buyergstin:""
  }
  addressOfConstructor = "AAYAT CONSTRUCTION 205 A UMARGANJ URF PREMCHAK BAHERI BALLIA "
  email = "aayatconstruction17@gmail.com"



  @ViewChild('dialogcgst') cgstModal: TemplateRef<any>;
  private cgstDialogRef: NbDialogRef<TemplateRef<any>>;
  @ViewChild('dialogsgst') sgstModal: TemplateRef<any>;
  private sgstDialogRef: NbDialogRef<TemplateRef<any>>;
  @ViewChild('dialogsorName') sorModal: TemplateRef<any>;
  private sorDialogRef: NbDialogRef<TemplateRef<any>>;
  headerData:any = [
    {h1:"S.L",h2:"SER.NO",h3:"SAC NO.",h4:"DISCRIPTION GOODS",h5:"QTY",h6:"UNIT",h7:"RATE",h8:"AMOUNT"}
    ]
  constructor(
    private sorService :SorService,
    private dialogService: NbDialogService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sorService.sorDataForBill.subscribe((res:any)=>{
        if(res){
          this.data = res.data.map((e)=>{
            e["sacNo"] = "9954";
            e["JOBDESCRIPTION"] = e.JOBDESCRIPTION.slice(0,50)
            return e;
          });
        }
      })
}


  generateAmount(){
    let number = 0
    this.data.forEach((e)=>{
          number = number + e.AMOUNT
    })
      this.totalAmount =  Math.round(number)
      this.gstAmount = ((Number(this.totalAmount) * this.cgst)/100).toFixed(2);
      this.sgstAmount = ((Number(this.totalAmount) * this.sgst)/100).toFixed(2);
      this.combineAmount =   (Number(this.totalAmount) +  Number(this.gstAmount) + Number(this.sgstAmount)).toFixed(2); 
  }



  changeCGST(){
    this.cgstDialogRef = this.dialogService.open(this.cgstModal, { context: 'this is some additional data passed to dialog' });
    this.cgstDialogRef.onBackdropClick.subscribe((result: any) => {
    })
  }
  
  changeSGST(){
    this.sgstDialogRef = this.dialogService.open(this.sgstModal, { context: 'this is some additional data passed to dialog' });
    this.sgstDialogRef.onBackdropClick.subscribe((result: any) => {
    })
  }

  save(){
    let dataObj = {
        billDeatilsObj : this. detailsOfBill,
        billName:this.billName,
        data:this.data,
        sgst:'SGST'+this.sgst +'%',
        cgst: 'CGST' + this.cgst +'%',
        gstAmount:this.gstAmount,
        sgstAmount:this.sgstAmount,
        totalAmount:this.totalAmount,
        combinedAmount:this.combineAmount
}
        this.sorService.createSorBill(dataObj).subscribe((res)=>{
            if(res){
                this.sorService.sorDataForBill.next(res.sor);
                this.router.navigateByUrl("/view-sor-bill");
                this.sorDialogRef.close()
            }
        })
  }

  saveAndView(){
    this.sorDialogRef = this.dialogService.open(this.sorModal, { context: 'this is some additional data passed to dialog' });
    this.sorDialogRef.onBackdropClick.subscribe((result: any) => {
    })

  }
}

