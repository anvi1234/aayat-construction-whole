class ArrayExpenses{
    productItem : String;
    amount :Number;
    quantity:String;
    constructor(){
    this.productItem ="",
    this.amount =0,
    this.quantity=""
    }
}

export class ExpensesModel{
    _id:Number;
    superVisorName:String;
    month:String;
    year:Number;
    date:Date;
    totalAmount:any;
    location:any;
    siteName:any;
    uniqueSiteId: String;
    expensesType:String;
    work:String;        
    approvedBy:String;
    partyDetailsName:String;
    partyDetailsAccount:String;
    billNo:String; 
    rejectedBy:String;
    status:string;
    expenses:Array<ArrayExpenses>;
    expenseAmount:any;
    siteAmount:any;
    updatedSiteAmount:any;
    updatedTotalAmount:any;
    constructor(){
   this._id=0,
    this.superVisorName="",
    this.month="",
    this.status ="",
    this.year= 0,
    this.rejectedBy="",
    this.date=new Date(),
    this.totalAmount = 0,
    this.expenseAmount =0;
    this.siteAmount=0;
    this.location = "",
    this.siteName = "",
    this.expensesType="",
    this.uniqueSiteId=""
    this.work = "",      
    this.approvedBy = "",
    this.partyDetailsName = "",
    this.partyDetailsAccount = "",
    this.billNo = "",
    this.expenses = []
    }
}

export class ExpensesError{
    superVisorName:boolean;
    month:boolean;
    year:boolean;
    date:boolean;
    totalAmount:boolean;
    siteName:boolean;
    location:boolean;
    expensesType:boolean;
    // work:boolean;        
    approvedBy:boolean;
    partyDetailsName:boolean;
    partyDetailsAccount:boolean;
    billNo:boolean; 
   constructor(status:any){
        this.superVisorName=status;
        this.month=status;
        this.year=status;
        this.date=status;
        this.expensesType=status;
        this. siteName = status;
        this.location = status;
        // this.work=status;
        this.totalAmount=status;
        this.partyDetailsName=status;
        this.partyDetailsAccount=status;
        this.approvedBy=status;
        this.billNo=status;
    }
    }