export class SiteDetails {
 
    siteName: string;
    location: string;
    poNo: string;
    work:string;
    number:string;
    billNo: string;
    date: any;
    status:String;
    closingdate:any;
    uniqueSiteId:String;
   constructor(){
      this.siteName="",
      this.location="",
      this.poNo = ""
      this.billNo = "",
      this.closingdate =""
      this.date = ""
      this.uniqueSiteId = ""
    }
  }

  export class SiteError{
   
    siteName:boolean;
    location:boolean;
    billNo:boolean;
    date:boolean;
    work:boolean;
    status:boolean;
    constructor(status:any){
     
        this.siteName = status,
        this.location = status,
        this.billNo = status,
        this.date = status,
        this.work = status
        this.status = status
      
    }
}