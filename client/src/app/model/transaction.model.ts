export class TransactionModel{
    _id:Number;
    superVisorName:String;
    month:String;
    year:Number;
    date:String;
    totalAmount:any;
    location:any;
    siteName:any;
    work:String;        
    recievedBy:String;
    givenBy:String;
    purpose:String;
    transactionType:String;
    partyDetailsAccount:String;
    billNo:String;
    partyDetailsName:String
    transDate :String;
    remark:String;
    uniqueSiteId: String;
    constructor(){
   this._id=0,
    this.superVisorName="",
    this.month="",
    this.year= 0,
    this.totalAmount = 0,
    this.location = "",
    this.siteName = "",
    this.work = "",      
    this.recievedBy="",
    this.givenBy="",
    this.purpose="",
    this.transactionType=""
    this.remark = ""
    this.uniqueSiteId = ""
    }
}

export class TransactionError{
    superVisorName:boolean;
    month:boolean;
    year:boolean;
    date:boolean;
    totalAmount:boolean;
    location:boolean;
    siteName:boolean;
    recievedBy:boolean; 
    givenBy:boolean;
    purpose:boolean;
    work:boolean;
    transactionType:boolean;
   constructor(status:any){
        this.superVisorName=status;
        this.month=status;
        this.year=status;
        this.date=status;
        this.location=status;
        this.siteName=status;
        this.recievedBy = status;
        this.givenBy = status;
        this.purpose = status;
        this.totalAmount = status;
        this.work = status;
        this.transactionType=status
    }
    }