const mongoose = require('mongoose');
const passport = require('passport');
const _= require('lodash');
const { isEmpty } = require('lodash');
const SiteRegistration = mongoose.model('SiteRegistration')

module.exports.addSite = (req,res,next) =>{
    var  siteRegistration = new  SiteRegistration()
    siteRegistration.siteName = req.body.siteName;
    siteRegistration.location = req.body.location;
    siteRegistration.billNo = req.body.billNo;
    siteRegistration.poNo = req.body.poNo;
    siteRegistration.date = req.body.date;
    siteRegistration.closingdate = req.body.closingdate;
    siteRegistration.number = req.body.number;
    siteRegistration.work = req.body.work;
    siteRegistration.status= req.body.status
  
    siteRegistration.save((err,doc)=>{
        if(!err)
        res.send(doc);
         else{
                return next(err);
            }
   })
}

module.exports.getSiteReg = (req,res,next)=>{
    SiteRegistration.find(function (err, siteData) {
    if (err) {
    console.log(err);
    }
    else {
    res.json( siteData);
    }
    });
 }

 module.exports.getSiteById = (req,res,next)=>{
  let id = req.params.id;
  SiteRegistration.findOne({_id:id},
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

   module.exports.updateSite = (req,res,next)=>{
    SiteRegistration.findById(req.params.id, function (err, siteRegistration) {
     
      if (!siteRegistration)
      
      return next(new Error('Unable To Find Site With This Id'));
      else {
        siteRegistration.siteName = req.body.siteName;
        siteRegistration.location = req.body.location;
        siteRegistration.billNo = req.body.billNo;
        siteRegistration.poNo = req.body.poNo;
        siteRegistration.date = req.body.date
        siteRegistration.closingdate = req.body.closingdate;
        siteRegistration.status= req.body.status;
        siteRegistration.work= req.body.work;
        siteRegistration.number= req.body.number;
        siteRegistration.save().then(emp => {

          
      res.json('Site Updated Successfully');
      })
      .catch(err => {
      res.status(400).send("Unable To Update Site");
      });
      }
      });
   } 

    module.exports.deleteSite = (req,res,next)=>{
    
      let id = req.params.id;
      SiteRegistration.findByIdAndRemove({ _id: req.params.id }, function (err,expense) {
        if (err) res.json(err);
        else res.json('Site Detailed Deleted Successfully');
        });
      }
 
