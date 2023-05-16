const mongoose  = require("mongoose");

var sorSchema  = new mongoose.Schema({
    Sn: String,
    Description:String,
    ServiceNo:String,
    UoM:String,
    Category:String,
    Estimate:String,
    FinalRate:String
   
})
module.exports = mongoose.model('Sor',sorSchema);


var addSorSchema  = new mongoose.Schema({
    siteName: String,
    data:[]
   
})
module.exports = mongoose.model('SampleSor',addSorSchema);


var addSorRegardingWorkingSite  = new mongoose.Schema({
    siteName: String,
    nameOfConstruction:String,
    nameOfWork:String,
    totalAmount:String,
    gstAmount: String,
    sgstAmount: String,
    combineAmount:String,
    cgst:String,
    sgst:String,
    data:[]
   
})
module.exports = mongoose.model('SORRegardingSite',addSorRegardingWorkingSite );

var addSorBill  = new mongoose.Schema({
    billDeatilsObj : {},
    billName:String,
    data:[],
    sgst:String,
    cgst:String,
    gstAmount:String,
    sgstAmount:String,
    totalAmount:String,
    combinedAmount:String
})
module.exports = mongoose.model('SORBillSite',addSorBill);
