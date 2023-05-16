export class DynamicGrid{     
    productItem:string;  
    amount:Number; 
    quantity:String;
    constructor() {
        this.productItem = "";
        this.amount = 0;
        this.quantity=""
    }
}  

export class labourGrid{     
   name:string;  
  contact:Number;
  charge:Number;
  work:[] 
   
    constructor() {
        
    }
}  


export class SORGrid{     
    name:String;
    date:Number;
    count1:String;
    count2:String;
    count3:String;
    count:String;
    subarray:[{name:String;date:Number,count1:String,count2:String,count3:String,count:String}]
}  