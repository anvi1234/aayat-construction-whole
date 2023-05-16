const mongoose  = require("mongoose");

var expenseSchema  = new mongoose.Schema({
 superVisorName:{
        type:String
    },
    month:{
        type:String
    },
    year:{
        type:String
    },
    date:{
        type:Date
    },
    totalAmount:{
        type:Number,
    },
    location:{
        type:String,
        
    },
    siteName:{
        type:String,
        
    },
    expenses: [{
        productItem : String,
        amount :Number
         }]
})

mongoose.model('Expense', expenseSchema )
