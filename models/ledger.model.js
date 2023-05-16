var mongoose = require('mongoose');

var LedgerSchema = new mongoose.Schema({
    id:String,
    fromDate: String,
    toDate : String,
    accountName: String,
    totalCredit : String,
    totalDebit :String,
    closingBal : String,
    grandCredit :String,
    grandDebit : String,
    dataArray: Array
   
})

module.exports = mongoose.model('Ledger',LedgerSchema);