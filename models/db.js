const { json } = require('body-parser');
const mongoose = require('mongoose');
const DB = 'mongodb+srv://Anvigbu123:Anvigbu123@cluster0.zc6sl.mongodb.net/AyatConstruction?retryWrites=true&w=majority'

//  const DB ='mongodb://127.0.0.1:27017/ayat' 
mongoose.connect(DB).then(()=>{
    console.log("Mongodb connected successfully");
}).catch((err)=>{
    console.log("no connection");
})

require("./user.model");
require("./expenses.model");
require("./transaction.model");
require("./gallery");
require("./task");
require("./siteregistration.model");
require("./attendence.model");
require("./sor.model");
require("./push-notif.model");
require("./drawing.model");
require("./ledger.model");
