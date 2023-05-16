var mongoose = require('mongoose');

var AttendenceSchema = new mongoose.Schema({
    id:String,
    siteName:String,
    location:String,
    color:String,
    status:String,
    approvalStatus:String,
    startDate:String,
    endDate:String,
    date:String,
    employeeName:String
   
})

module.exports = mongoose.model('Attendence',AttendenceSchema);