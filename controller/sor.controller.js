const mongoose = require('mongoose');
const _= require('lodash')
const SOR = mongoose.model('Sor')
const SAMPLESOR = mongoose.model('SampleSor')
const SORREgSITE = mongoose.model('SORRegardingSite')
const SORBill = mongoose.model('SORBillSite')

module.exports.addSor = (req,res,next) =>{
    var sor = new SOR()
     sor.Description = req.body.Description
     sor.Sn = req.body.Sn
     sor.ServiceNo = req.body.ServiceNo
     sor.UoM = req.body.UoM
     sor.Category = req.body.Category
     sor.Estimate= req.body.Estimate
     sor.FinalRate = req.body.FinalRate
    
   sor.save((err,doc)=>{
        if(!err)
        return res.status(200).json({
            "sor": sor
        
        })
        else{
            if(err.code==11000){
                console.log("Duplicate Email Found");
            }
            else{
                return next(err);
            }
        }
    })
}

module.exports.getSor = (req,res,next)=>{
    SOR .find(function (err, expenses) {
      if (err) {
      console.log(err);
      }
      else {
      res.json( expenses);
      }
      });
   }
  
   module.exports.getSORById = (req,res,next)=>{
    let id = req.params.id;
    SOR .findOne({_id:id},
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
  
   module.exports.updateSor = (req,res,next)=>{
    SOR.findById(req.params.id, function (err,sor) {
      if (! sor)
      return next(new Error('Unable To Find Expenses With This Id'));
      else {
        sor.Description = req.body.Description
        sor.Sn = req.body.Sn
        sor.ServiceNo = req.body.ServiceNo
        sor.UOM = req.body.UOM
        sor.Category = req.body.Category
        sor.Estimate= req.body.Estimate
        sor.FinalRate = req.body.FinalRate
        sor.save().then(emp => {
      res.json('User Updated Successfully');
      })
      .catch(err => {
      res.status(400).send("Unable To Update Expenses");
      });
      }
      });
   } 
      module.exports.deleteSOR = (req,res,next)=>{
         let id = req.params.id;
          SOR.findByIdAndRemove({ _id: req.params.id }, function (err,expense) {
          if (err) res.json(err);
          else res.json('User Deleted Successfully');
          });
        }

        module.exports.addSampleSor = (req,res,next) =>{
          var sor = new SAMPLESOR()
           sor.siteName = req.body.siteName
           sor.data = req.body.data
           sor.save((err,doc)=>{
              if(!err)
              return res.status(200).json({
                  "sor": sor
              
              })
              else{
                  if(err.code==11000){
                      console.log("Duplicate Email Found");
                  }
                  else{
                      return next(err);
                  }
              }
          })

         
      }
      module.exports.getSampleSor = (req,res,next)=>{
        SAMPLESOR.find(function (err, sor) {
          if (err) {
          console.log(err);
          }
          else {
          res.json( sor);
          }
          });
       }

       module.exports.addSorRegardingSite = (req,res,next) =>{
        var sor = new SORREgSITE()
         sor.siteName = req.body.siteName
         sor.data = req.body.data
         sor.nameOfConstruction = req.body.nameOfConstruction
         sor.nameOfWork = req.body.nameOfWork
         sor.totalAmount = req.body.totalAmount,
         sor.gstAmount = req.body.gstAmount,
         sor.sgstAmount = req.body.sgstAmount,
         sor.combineAmount = req.body.combineAmount,
         sor.cgst =  req.body.cgst 
         sor.sgst =  req.body.sgst
         sor.save((err,doc)=>{
            if(!err)
            return res.status(200).json({
                "sor": sor,
                "message":"success"
            
            })
            else{
                if(err.code==11000){
                    console.log("Duplicate Email Found");
                }
                else{
                    return next(err);
                }
            }
        })

       
    }
    module.exports.getSorRegSite = (req,res,next)=>{
        SORREgSITE.find(function (err, sor) {
        if (err) {
        console.log(err);
        }
        else {
        res.json( sor);
        }
        });
     }

     module.exports.deleteSorRegSite = (req,res,next)=>{
    
        let id = req.params.id;
        SORREgSITE.findByIdAndRemove({ _id: req.params.id }, function (err,expense) {
          if (err) res.json(err);
          else res.json('MB Deleted Successfully');
          });
        }
    
  module.exports.deleteSorRegSite = (req,res,next)=>{
    
        let id = req.params.id;
        SORREgSITE.findByIdAndRemove({ _id: req.params.id }, function (err,expense) {
          if (err) res.json(err);
          else res.json('MB Deleted Successfully');
          });
        }
    

     module.exports.addBillSor = (req,res,next) =>{
        var sor = new SORBill()
         sor.billDeatilsObj = req.body.billDeatilsObj
         sor.data = req.body.data
         sor.sgst = req.body.sgst
         sor.billName = req.body.billName
         sor.cgst = req.body.cgst
         sor.gstAmount = req.body.gstAmount
         sor.sgstAmount = req.body.sgstAmount
         sor.totalAmount = req.body.totalAmount 
         sor.combinedAmount = req.body.combinedAmount
         sor.save((err,doc)=>{
            if(!err)
            return res.status(200).json({
                "sor": sor
            
            })
            else{
                if(err.code==11000){
                    console.log("Duplicate Email Found");
                }
                else{
                    return next(err);
                }
            }
        })

       
    }
    module.exports.deleteSorBill = (req,res,next)=>{
    
        let id = req.params.id;
        SORBill.findByIdAndRemove({ _id: req.params.id }, function (err,expense) {
          if (err) res.json(err);
          else res.json('Bill Deleted Successfully');
          });
        }
    
        module.exports.getSorBill = (req,res,next)=>{
        SORBill.find(function (err, sor) {
        if (err) {
        console.log(err);
        }
        else {
        res.json( sor);
        }
        });
     }


     module.exports.updateSorRegBySite = (req,res,next)=>{
        SORREgSITE.findById(req.params.id, function (err, sor) {
         
          if (!sor)
          
          return next(new Error('Unable To Find Site With This Id'));
          else {
            sor.siteName = req.body.siteName
            sor.data = req.body.data
            sor.nameOfConstruction = req.body.nameOfConstruction
            sor.nameOfWork = req.body.nameOfWork
            sor.totalAmount = req.body.totalAmount,
            sor.gstAmount = req.body.gstAmount,
            sor.sgstAmount = req.body.sgstAmount,
            sor.combineAmount = req.body.combineAmount,
            sor.cgst =  req.body.cgst 
            sor.sgst =  req.body.sgst
           sor.save().then(emp => {
    
              
          res.json('Site Updated Successfully');
          })
          .catch(err => {
          res.status(400).send("Unable To Update Site");
          });
          }
          });
       } 
