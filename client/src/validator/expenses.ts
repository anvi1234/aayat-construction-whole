import {  ExpensesModel, ExpensesError } from '../app/model/expenses.model';
export let ExpensesValidation = (data: ExpensesModel, type:any) => {
    let error = new ExpensesError(false)
    if (type === "init")
        return error;
   if (!data.expensesType) {
        error.expensesType = true
    }
    if (!data.partyDetailsAccount) {
        error.partyDetailsAccount = true
    }

    if (!data.location) {
        error.location = true
    }
    if (!data.siteName) {
        error.siteName = true
    }
    if (!data.superVisorName) {
        error.superVisorName = true
    }
    if (!data.partyDetailsAccount) {
        error.partyDetailsAccount = true
    }
    if (!data.partyDetailsName) {
        error.partyDetailsName = true
    }
//    if (!data.work) {
//         error.work = true
//     }
 
   return error;
}