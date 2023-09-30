import { userid } from "src/util/const";
import { getCookie } from "src/util/util";

export class Employee{
    siteName:String;
    location:String;
    fullName :String;
    designation:String;
    mobileNo:String;
    adharNo:String;
    address:String;
    email:String;
    password:String;
    basicPay:String;
    bankName:String;
    accNo:String;
    ifsccode:String;
    uniqueSiteId:String;
    constructor(){
        this.fullName = "",
        this.mobileNo="",
        this.adharNo="",
        this.designation= "",
        this.address="",
        this.email="",
        this.password=""
    }
  
}

export class Attendence{
     _id:string;
      siteName:any;
      approvalStatus:any;
      location:any;
      employeeName:any;
      date:any;
      startDate:any;
      endDate:any;
      status:string;
      color:string
      uniqueSiteId:String;
    constructor(){
        this. _id = "",
        this. siteName="",
        this.location="",
        this.employeeName = "",
        this.status = "",
        this. color = ""
        this.uniqueSiteId = ""
      

    }   
}


export class EmployeeError{
    fullName :boolean;
    siteName:boolean;
    location:boolean;
    designation:boolean;
    mobileNo:boolean;
    adharNo:boolean;
    address:boolean;
    email:boolean;
    password:boolean;
    adharNoLength:boolean;
    mobileNoLength:boolean;
    constructor(status:any){
        this.fullName = status,
        this.siteName = status,
        this.location = status,
        this.mobileNo=status,
        this.adharNo=status,
        this.designation=status,
        this.address=status,
        this.email=status,
        this.password=status,
        this.adharNoLength=status;
        this.mobileNoLength = status;
    }
}



export class AttendenceError{
   
    siteName:boolean;
    location:boolean;
   
    constructor(status:any){
     
        this.siteName = status,
        this.location = status
      
    }
}