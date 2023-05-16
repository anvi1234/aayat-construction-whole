export class Gallery {
    imageUrl: any =[];
    work: string;
    siteName: any;
    location:any;
    uploaded: Date;
    
    constructor(){
      this.imageUrl = [],
      this.work="",
      this.siteName="",
      this.location="",
      this.uploaded = new Date()
    }
  }