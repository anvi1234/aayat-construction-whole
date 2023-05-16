const mongoose = require('mongoose');
const passport = require('passport');
const _= require('lodash')
const Expense = mongoose.model('Expense')

module.exports.expenses = (req,res,next) =>{
    var expense = new Expense()
   expense.superVisorName= req.body.superVisorName;
   expense.month = req.body.month;
   expense.year = req.body.year;
   expense.totalAmount = req.body.totalAmount;
   expense.siteAmount = req.body.siteAmount;
   expense.expenseAmount = req.body.expenseAmount;
   expense.date = req.body.date;
   expense.siteName = req.body.siteName;
   expense.location = req.body.location;
   expense.work = req.body.work;
   expense.expenses = req.body.expenses;
   expense.approvedBy = req.body.approvedBy;
   expense.status = req.body.status;
   expense.rejectedBy = req.body.rejectedBy;
   expense.expensesType = req.body.expensesType;
   expense.updatedSiteAmount = req.body.updatedSiteAmount;
   expense.updatedTotalAmount = req.body.updatedTotalAmount;
   expense.partyDetailsName = req.body. partyDetailsName;
   expense.partyDetailsAccount = req.body.partyDetailsAccount
     expense.save((err,doc)=>{
        if(!err)
        res.send(doc);
         else{
                return next(err);
            }
   })
}

module.exports.getExpenses = (req,res,next)=>{
  Expense.find(function (err, expenses) {
    if (err) {
    console.log(err);
    }
    else {
    res.json( expenses);
    }
    });
 }

 module.exports.getExpensesById = (req,res,next)=>{
  let id = req.params.id;
  Expense.findOne({_id:id},
    (err,user)=>{
        if(!user)
        return res.status(404).json({
            status:false,message:"User not found"
        })
      else
        return res.status(200).json({
            status:true,user: user
        })
    }
    )
   }

 module.exports.updateExpenses = (req,res,next)=>{
  Expense.findById(req.params.id, function (err, expense) {
    if (! expense)
    return next(new Error('Unable To Find Expenses With This Id'));
    else {
      expense.superVisorName= req.body.superVisorName;
      expense.month = req.body.month;
      expense.year = req.body.year;
      expense.totalAmount = req.body.totalAmount;
      expense.siteAmount = req.body.siteAmount;
      expense.expenseAmount = req.body.expenseAmount;
      expense.date = req.body.date;
      expense.siteName = req.body.siteName;
      expense.location = req.body.location;
      expense.work = req.body.work;
      expense.expenses = req.body.expenses;
      expense.approvedBy = req.body.approvedBy;
      expense.status = req.body.status;
      expense.rejectedBy = req.body.rejectedBy;
      expense.expensesType = req.body.expensesType;
      expense.updatedSiteAmount = req.body.updatedSiteAmount;
      expense.updatedTotalAmount = req.body.updatedTotalAmount;
      expense.partyDetailsName = req.body. partyDetailsName;
      expense.partyDetailsAccount = req.body.partyDetailsAccount
      expense.save((err,doc)=>{
        if(!err)
        res.send(doc);
         else{
                return next(err);
            }
   })
 } 
})
 }

 module.exports.updateMultipleExpenses = (req,res,next)=>{
  req.body.forEach(element => {
    Expense.findById(element._id, function (err, expense) {
      if (! expense)
      return next(new Error('Unable To Find Expenses With This Id'));
      else {
        expense.superVisorName= element.superVisorName;
        expense.month = element.month;
        expense.year =element.year;
        expense.totalAmount = element.totalAmount;
        expense.siteAmount = element.siteAmount;
        expense.expenseAmount = element.expenseAmount;
        expense.date = element.date;
        expense.siteName = element.siteName;
        expense.location = element.location;
        expense.work = element.work;
        expense.expenses = element.expenses;
        expense.approvedBy =element.approvedBy;
        expense.status = element.status;
        expense.rejectedBy = element.rejectedBy;
        expense.expensesType =element.expensesType;
        expense.updatedSiteAmount = element.updatedSiteAmount;
        expense.updatedTotalAmount = element.updatedTotalAmount;
        expense.partyDetailsName = element. partyDetailsName;
        expense.partyDetailsAccount = element.partyDetailsAccount
        expense.save();
      }
      
      });
  });
 
 } 


    module.exports.deleteExpenses = (req,res,next)=>{
    
      let id = req.params.id;
        Expense.findByIdAndRemove({ _id: req.params.id }, function (err,expense) {
        if (err) res.json(err);
        else res.json('Expenses Deleted Successfully');
        });
      }


      module.exports.getExpensesByComNameandloc = (req,res,next)=>{

        Expense.find({
            $and: [
                { 
                    siteName: { $eq:req.query.siteName}},
                    { location
                    : { $eq: req.query.location}}
             ]
        },
        (err,expenses)=>{
          if(!expenses)
          return res.status(404).json({
              status:false,message:"User not found"
          })
        else
          return res.status(200).json({
              status:true,expenses: expenses
          })
        }
        )
        }
 
        module.exports.getTotalExpensesByComNameandloc = (req,res,next)=>{

          Expense.find({
            $and: [
                { 
                    siteName: { $eq:req.body.sitename}},
                    { location
                    : { $eq: req.body.location}}
             ]
        },
        (err,expenses)=>{
         
           expenseValue = 0
          expenses.forEach((data)=>{
          expenseValue = expenseValue + data.expenseAmount
      })
      obj = { "siteName":req.body.sitename ,"location":req.body.location,"status":req.body.status,"expenses":expenseValue }
      return res.status(200).json({
        status:true,data: obj
    })
        })
          }
