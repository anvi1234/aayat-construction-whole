import { Component, OnInit } from '@angular/core';
import { SorService } from 'src/app/shared/sor.service';

@Component({
  selector: 'app-view-sor-wbm',
  templateUrl: './view-sor-wbm.component.html',
  styleUrls: ['./view-sor-wbm.component.scss']
})
export class ViewSorWbmComponent implements OnInit {
  blankString = ""
  headerData:any = [
    {h1:"S.No.",h2:"ServiceNo",h3:"Job Description",h4:"No.",h5:"L",h6:"B",h7:"H/D/CO-EFF",h8:"Qty",h9:"Unit",h10:"Sor Rate",h11:"Amount"}
    ]
    data :any = []
  constructor(
    private sorService :SorService,
  ) { }

  ngOnInit(): void {
    this.sorService.sitenameforBill.subscribe((res)=>{
      console.log("bbbbbbbb",res)
        this.data = res;
    })
  }

}
