const mongoose = require('mongoose');
const passport = require('passport');
const _= require('lodash');
const { isEmpty } = require('lodash');
const ledger = mongoose.model('Ledger')

module.exports.addLedger= (req,res,next) =>{
    var  newledger = new  ledger()
    newledger.fromDate =  req.body.fromDate,
    newledger.toDate =  req.body.toDate,
    newledger.accountName =  req.body.accountName,
    newledger.totalCredit = req.body.totalDebit,
    newledger.totalDebit = req.body.totalDebit,
    newledger.closingBal =  req.body.closingBal,
    newledger.grandCredit =   req.body.grandCredit,
    newledger.grandDebit =  req.body.grandDebit,
    newledger.dataArray =  req.body.dataArray
  
    newledger.save((err,doc)=>{
        if(!err)
        res.send(doc);
         else{
                return next(err);
            }
   })
}

module.exports.getledger = (req,res,next)=>{
    ledger.find(function (err, siteData) {
    if (err) {
    console.log(err);
    }
    else {
    res.json( siteData);
    }
    });
 }

 module.exports.getledgerById = (req,res,next)=>{
  let id = req.params.id;
  ledger.findOne({_id:id},
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

   module.exports.updateLedger= (req,res,next)=>{
    ledger.findById(req.params.id, function (err, ledger) {
     
      if (!ledger)
      
      return next(new Error('Unable To Find Site With This Id'));
      else {
        ledger.fromDate =  req.body.fromDate,
        ledger.toDate =  req.body.toDate,
        ledger.accountName =  req.body.accountName,
        ledger.totalCredit = req.body.totalDebit,
        ledger.totalDebit = req.body.totalDebit,
        ledger.closingBal =  req.body.closingBal,
        ledger.grandCredit =   req.body.grandCredit,
        ledger.grandDebit =  req.body.grandDebit,
        ledger.dataArray =  req.body.dataArray
       ledger.save().then(emp => {

          
      res.json('Site Updated Successfully');
      })
      .catch(err => {
      res.status(400).send("Unable To Update Site");
      });
      }
      });
   } 

    module.exports.deleteLedger = (req,res,next)=>{
    
      let id = req.params.id;
      ledger.findByIdAndRemove({ _id: req.params.id }, function (err,expense) {
        if (err) res.json(err);
        else res.json('Site Detailed Deleted Successfully');
        });
      }
 
