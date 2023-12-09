
import { SiteDetails, SiteError } from "src/app/model/site.model";
export let SiteValidation = (data:  SiteDetails, type:any) => {
    let error = new SiteError(false)
    if (type === "init")
        return error;
        if (!data.siteName) {
            error.siteName = true
        }
        if (!data.location) {
            error.location = true
        }
  
        if (!data.billNo) {
            error.billNo = true
        }
        if (!data.work) {
            error.work = true
        }
        if (!data.date) {
            error.date = true
        }
        if (!data.status) {
            error.status = true
        }
       
       
 
   return error;
}