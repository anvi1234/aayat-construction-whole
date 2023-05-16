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