import { Employee, EmployeeError } from "src/app/model/employee.model";
import { Attendence, AttendenceError } from "src/app/model/employee.model";

export let EmployeeValidation = (data: Employee, type:any) => {
    let error = new EmployeeError(false)
    if (type === "init")
        return error;
        if (!data.siteName) {
            error.siteName = true
        }
        if (!data.location) {
            error.location = true
        }
   if (!data.fullName) {
        error.fullName = true
    }
    if (!data.designation) {
        error.designation = true
    }
    if (!data.mobileNo) {
        error.mobileNo = true
    }
    if (!data.address) {
        error.address = true
    }
    if (!data.email) {
        error.email = true
    }
    if (!data.adharNo) {
        error.adharNo = true
    }

    if(String(data.adharNo).length > 0 && String(data.adharNo).length <12){
        // console.log("negregee")
        error.adharNoLength = true
    }
    if(String(data.mobileNo).length > 0 && String(data.mobileNo).length <12){
        // console.log("negregee")
        error.mobileNoLength = true
    }
   
    if (!data.password) {
        error.password = true
    }
  
 
   return error;
}


export let AttendenceValidation = (data:  Attendence, type:any) => {
    let error = new AttendenceError(false)
    if (type === "init")
        return error;
        if (!data.siteName) {
            error.siteName = true
        }
        if (!data.location) {
            error.location = true
        }
  
 
   return error;
}