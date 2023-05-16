var mongoose = require('mongoose');

var SiteRegistrationSchema = new mongoose.Schema({
    id:String,
    siteName:String,
    location:String,
    work:String,
    number:String,
    poNo:String,
    billNo:String,
    date:Date,
    status:String,
    closingdate:Date,
})

module.exports = mongoose.model('SiteRegistration',SiteRegistrationSchema);