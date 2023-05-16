var mongoose = require('mongoose');

var PushSchema = new mongoose.Schema({
    id:String,
   key:String
   
})

module.exports = mongoose.model('PushKey', PushSchema);