const mongoose = require('mongoose');
const passport = require('passport');
const _= require('lodash');
const { isEmpty } = require('lodash');
const PushKey = mongoose.model('PushKey')

module.exports.addPush = (req,res,next) =>{
    var pushKey = new  PushKey()
    pushKey.key = req.body.key;
    pushKey.save((err,doc)=>{
        if(!err)
        res.send(doc);
         else{
                return next(err);
            }
   })
}

module.exports.getpush = (req,res,next)=>{
    PushKey.find(function (err, siteData) {
    if (err) {
    console.log(err);
    }
    else {
    res.json( siteData);
    }
    });
 }



   module.exports.updatePush = (req,res,next)=>{
    PushKey.findById(req.params.id, function (err, pushkey) {
     
      if (!pushkey)
      
      return next(new Error('Unable To Find Site With This Id'));
      else {
        pushkey.key = req.body.key;
        pushkey.save().then(emp => {

          
      res.json('Site Updated Successfully');
      })
      .catch(err => {
      res.status(400).send("Unable To Update Site");
      });
      }
      });
   } 
