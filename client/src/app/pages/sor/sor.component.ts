import { Component, OnInit } from '@angular/core';
import { SorService } from 'src/app/shared/sor.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-sor',
  templateUrl: './sor.component.html',
  styleUrls: ['./sor.component.scss']
})
export class SorComponent implements OnInit {
public fileName = ""
  constructor(
    private sorService : SorService
  ) { }

  ngOnInit(): void {
  }


  onFileChange(event: any) {
   
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
     let data = XLSX.utils.sheet_to_json(ws); 
     if( this.fileName === "sorSheet"){
  data.forEach((e)=>{
             this.sorService.createSor(e).subscribe((data)=>{
              
             })                                             
           })
     }
         
else{
  let v =  data.map((e:any)=>{
    if(e.SERVICENO != 'null'){
       e["subArray"] = data.filter((f:any)=>{
            return f.SNO === e.SNO && f.SERVICENO === 'null';
      })  
    }
     
    return e;
})

let m = v.filter((d)=>{
  return d.SERVICENO !== 'null';
})

let obj = {
siteName : this.fileName,
data : m
}

this.sorService.createSampleSor(obj).subscribe((res)=>{
console.log("bbbbbbbb",res)
})
};
}
       
      
 }
}
