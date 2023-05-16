var mongoose = require('mongoose');
const { StringDecoder } = require('string_decoder');

var TaskSchema = new mongoose.Schema({
    id:String,
    avatar: {
        type: Array
      },
    siteName:String,
    location:String,
    taskName:String,
    totalLabour:String,
    startDate:Date,
    endDate:Date,
    progressStatus:String,
    laboursArray: [{
      name : String,
     contact :Number,
     charge :Number,
     work:[
       {
         date:Date,
         overTime:Number,
         amountPerDay:Number,
         attendence:String,
         advancePay:Number,
         payment:String
       }
     ]
       }]
   
})

module.exports = mongoose.model('Task',TaskSchema);


