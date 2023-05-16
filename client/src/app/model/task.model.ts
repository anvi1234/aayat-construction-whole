export class Task {
    imageUrl: string;
    startDate: Date;
    endDate:Date;
    taskName:string;
    siteName: any;
    location: any;
    totalLabour:any;
    progressStatus:string;
    laboursArray:Array<Arraylabours>;
    constructor(){
      this.imageUrl ="",
      this.taskName="",
      this.siteName="",
      this.progressStatus="",
      this.location="",
      this.totalLabour = "",
     
      this.startDate = new Date()
      this.endDate = new Date()
    }
  }
class ArrayWork {
  date:Date;
  overTime:Number;
  amountPerDay:Number;
  attendence:String
}

  class Arraylabours{
   name : String;
  contact:Number;
  charged:Number;
  work:Array<ArrayWork>
   
    constructor(){
   
    }
}