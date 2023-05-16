import {  TransactionModel, TransactionError } from '../app/model/transaction.model';
export let TransactionValidation = (data: TransactionModel, type:any) => {
    let error = new TransactionError(false)
    if (type === "init")
        return error;
   if (!data.purpose) {
        error.purpose = true
    }
    if (!data.location) {
        error.location = true
    }
    if (!data.recievedBy) {
        error.recievedBy = true
    }

    if (!data.siteName) {
        error.siteName = true
    }
    if (!data.superVisorName) {
        error.superVisorName = true
    }
    if (!data.givenBy) {
        error.givenBy = true
    }
    if (!data.totalAmount) {
        error.totalAmount = true
    }
    if (!data.work) {
        error.work = true
    }
   if(!data.transactionType){
       error.transactionType = true
   }
   return error;
}