const mongoose = require('mongoose');
const passport = require('passport');
const _= require('lodash')
const Attendence = mongoose.model('Attendence')

module.exports.addAttendence = (req,res,next) =>{
    var attendecne = new Attendence()
    attendecne.employeeName = req.body.employeeName;
    attendecne.siteName = req.body.siteName;
    attendecne.location = req.body.location;
    attendecne.status = req.body.status;
    attendecne.color= req.body.color;
    attendecne.date = req.body.date;
    attendecne.startDate = req.body.startDate ;
    attendecne.endDate = req.body.endDate;
    attendecne.approvalStatus = req.body.approvalStatus;
    
    attendecne.save((err,doc)=>{
        if(!err)
        return res.status(200).json({
            "user": attendecne
        
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

    module.exports.getAttendenceById = (req,res,next)=>{
        let id = req.params.id;
        Attendence.find({
            employeeName
            :id},
          (err,user)=>{
              if(!user)
              return res.status(404).json({
                  status:false,message:"User not found"
              })
            else
              return res.status(200).json({
                  status:true,user: user
              })
          })
        };
    
      
        module.exports.deleteAttendecne = (req,res,next)=>{
    
            let id = req.params.id;
            Attendence.findByIdAndRemove({ _id: req.params.id }, function (err,expense) {
              if (err) res.json(err);
              else res.json('Attendence Deleted Successfully');
              });
            }


            module.exports.updateAttendence = (req,res,next)=>{
                Attendence.findById(req.params.id, function (err, attendecne) {
                  if (!attendecne)
                  return next(new Error('Unable To Find Expenses With This Id'));
                  else {
                  
                    attendecne.employeeName = req.body.employeeName;
                    attendecne.siteName = req.body.siteName;
                    attendecne.location = req.body.location;
                    attendecne.status = req.body.status;
                    attendecne.color= req.body.color;
                    attendecne.date = req.body.date;
                    attendecne.approvalStatus = req.body.approvalStatus;
                    attendecne.startDate = req.body.startDate ;
                    attendecne.endDate = req.body.endDate;
                    attendecne.save().then(emp => {
                  res.json('Attendence Updated Successfully');
                  })
                  .catch(err => {
                  res.status(400).send("Unable To Update Expenses");
                  });
                  }
                  });
                }