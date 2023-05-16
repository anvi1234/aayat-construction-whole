const mongoose = require('mongoose');
const passport = require('passport');
const _= require('lodash');
const { resolveObjectURL } = require('buffer');
const Transaction = mongoose.model('Transaction')
global.transactionArray = []
module.exports.addTransaction = (req,res,next) =>{
    var transaction = new  Transaction()
    transaction.superVisorName= req.body.superVisorName;
    transaction.month = req.body.month;
    transaction.year = req.body.year;
    transaction.totalAmount = req.body.totalAmount;
    transaction.date = req.body.date;
    transaction.siteName = req.body.siteName;
    transaction.location = req.body.location;
    transaction.work = req.body.work;
    transaction.givenBy = req.body.givenBy;
    transaction.recievedBy = req.body.recievedBy;
    transaction.purpose = req.body.purpose;
    transaction.partyDetailsAccount = req.body.partyDetailsAccount
    transaction.billNo = req.body.billNo
    transaction.partyDetailsName = req.body.partyDetailsName
    transaction.transactionType =req.body.transactionType
    transaction.transDate =req.body.transDate
    transaction.remark = req.body.remark
    transaction.save((err,doc)=>{
        if(!err)
        res.send(doc);
         else{
                return next(err);
            }
   })
}

module.exports.getTransaction = (req,res,next)=>{
    Transaction.find(function (err, expenses) {
    if (err) {
    console.log(err);
    }
    else {
    res.json( expenses);
    }
    });
 }

 module.exports.getTransactionById = (req,res,next)=>{
  let id = req.params.id;
  Transaction.findOne({_id:id},
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

 module.exports.updateTransaction = (req,res,next)=>{
    Transaction.findById(req.params.id, function (err,   transaction) {
    if (!  transaction)
    return next(new Error('Unable To Find Transaction With This Id'));
    else {
        transaction.superVisorName= req.body.superVisorName;
        transaction.month = req.body.month;
        transaction.year = req.body.year;
        transaction.totalAmount = req.body.totalAmount;
        transaction.date = req.body.date;
        transaction.siteName = req.body.siteName;
        transaction.location = req.body.location;
        transaction.work = req.body.work;
        transaction.givenBy = req.body.givenBy;
        transaction.recievedBy = req.body.recievedBy;
        transaction.purpose = req.body.purpose;
        transaction.partyDetailsAccount = req.body.partyDetailsAccount
        transaction.billNo = req.body.billNo
        transaction.partyDetailsName = req.body.partyDetailsName
        transaction.transactionType =req.body.transactionType
        transaction.transDate =req.body.transDate
        transaction.remark = req.body.remark
        transaction.save().then(emp => {
    res.json(emp);
    })
    .catch(err => {
    res.status(400).send("Unable To Update Transaction");
    });
    }
    });
 } 
    module.exports.deletegetTransaction = (req,res,next)=>{
    
      let id = req.params.id;
      Transaction.findByIdAndRemove({ _id: req.params.id }, function (err,expense) {
        if (err) res.json(err);
        else res.json('Transaction Deleted Successfully');
        });
      }
 
      module.exports.getTransactionByComNameandloc = (req,res,next)=>{

        Transaction.find({
            $and: [
                { 
                    siteName: { $eq:req.query.siteName}},
                    { location
                    : { $eq: req.query.location}}
             ]
        },
        (err,transaction)=>{
          if(!transaction)
          return res.status(404).json({
              status:false,message:"User not found"
          })
        else
          return res.status(200).json({
              status:true,transaction: transaction
          })
        }
        )
        }

        module.exports.getTotalTransByComNameandloc = (req,res,next)=>{
        //   transactionArray = []
        //   console.log("bbbbbbbbbbbb",req.body)
        //   return new Promise((Resolve, reject) => 
        //   req.body.forEach((data)=>{
        //     Transaction.find({
        //       $and: [
        //           { 
        //               siteName: { $eq:data.sitename}},
        //               { location
        //               : { $eq: data.location}}
        //        ]
        //   },
        //   (err,expenses)=>{
                
        //       expenseValue = 0
        //       expenses.forEach((data)=>{
        //       expenseValue = expenseValue + data.totalAmount
        //   })
          
        //    obj = { "siteName":data.sitename ,"location":data.location,"transaction":expenseValue }
          
        //    transactionArray.push(obj)
        //    Resolve(  transactionArray)
        //    })
       
        //   }),
       
        // ).then((e)=>{
        //   console.log("vvvvvvvvvvvv",   e)
        // })
      

        Transaction.find({
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
              expenseValue = expenseValue + data.totalAmount
          })
          obj = { "siteName":req.body.sitename ,"location":req.body.location,"status":req.body.status,"transaction":expenseValue }
          return res.status(200).json({
            status:true,data: obj
        })
            })

              
          }