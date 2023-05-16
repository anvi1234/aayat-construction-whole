
const mongoose  = require("mongoose");
var drawingSchema = new mongoose.Schema({
    id:String,
    name:String,
    fireBaseUrl:String,
    uploaded:{type:Date,default:Date.now},
  })
  
  module.exports = mongoose.model('Drawing',drawingSchema);