const mongoose = require('mongoose');
const passport = require('passport');
const _= require('lodash')
const task = mongoose.model('Task')

module.exports.addTask = (req,res,next) =>{
    const reqFiles = []
         req.body.avatar = req.body.avatar
        req.body.laboursArray = JSON.parse(req.body.labourArray)
        task.create(req.body,function(err,gallery2){
            if(err){
                console.log(err);
            }
            else{
               
                res.json(gallery2);
            }
        })
  }

module.exports.getTask = (req,res,next)=>{
    task.find(function (err, galleryData) {
      if (err) {
      console.log(err);
      }
      else {
      res.json( galleryData);
      }
      });
   }

   module.exports.deleteTask = (req,res,next)=>{
    
    let id = req.params.id;
    task.findByIdAndRemove({ _id: req.params.id }, function (err,gallery) {
      console.log("gggggggggggg",err)
      if (err) res.json(err);
      else res.json({message:"File Deleted Successfully"});
      });
    }

    
 module.exports.gettaskById = (req,res,next)=>{
    let id = req.params.id;
    task.findOne({_id:id},
      (err,file)=>{
          if(!file)
          return res.status(404).json({
              status:false,message:"File not found"
          })
        else
          return res.status(200).json({
              status:true,file: file
          })
      }
      )
    }
      module.exports.updateTask = (req,res,next) =>{
        console.log(req.params.id)
        task.findById(req.params.id, function (err,image) {
               image.siteName = req.body.siteName;
                image.location = req.body.location;
                image.laboursArray = JSON.parse(req.body.laboursArray);
                image.taskName = req.body.taskName;
                image.progressStatus = req.body.progressStatus;
                image.startDate = req.body.startDate;
                image.endDate = req.body.endDate;
                image.avatar= req.body.avatar
               
                image.save().then(emp => {
                            
          
                  res.json('Site Updated Successfully');
                  })
                  .catch(err => {
                  res.status(400).send("Unable To Update Site");
                  });
                  })
              
                
                
    
}
 
  