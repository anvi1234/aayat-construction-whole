import { Component, OnInit } from '@angular/core';
import { SorService } from 'src/app/shared/sor.service';

@Component({
  selector: 'app-view-sor-bill',
  templateUrl: './view-sor-bill.component.html',
  styleUrls: ['./view-sor-bill.component.scss']
})
export class ViewSorBillComponent implements OnInit {
  nameOfSender = "Bharat Petroleum Corporation Ltd."
  address1 = "BPCL OFFICE COMPLEX, Business Process Excellence center (BPEC),"
  address2 = "Plot no-6, Sector-2, Behind CIDCO Garden," 
 landmark="Khargar, Navi Mumbai-410210"
 addressOfConstructor = "AAYAT CONSTRUCTION 205 A UMARGANJ URF PREMCHAK BAHERI BALLIA "
 email = "aayatconstruction17@gmail.com"
 billDeatilsObj:any = {}
  headerData:any = [
    {h1:"S.L",h2:"SER.NO",h3:"SAC NO.",h4:"DISCRIPTION GOODS",h5:"QTY",h6:"UNIT",h7:"RATE",h8:"AMOUNT"}
    ]
    detailsOfBill :any;
    data :any =[]
  constructor(
    private sorService :SorService,
  ) { }

sorBill:any = {}
  ngOnInit(): void {
   this.sorService. sitenameforBill.subscribe((res)=>{
        if(res){
            this.billDeatilsObj = res["billDeatilsObj"]
            this.sorBill = res
         }
       
    })
    this.sorService.sorDataForBill.subscribe((res)=>{
   if(res){
    this.billDeatilsObj = res["billDeatilsObj"]
    this.sorBill = res
   }
         
    })
  }

    printDiv(divName) {
   
}

}
