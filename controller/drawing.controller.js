const mongoose = require('mongoose');
const passport = require('passport');
const _= require('lodash')


const drawing = mongoose.model('Drawing')



module.exports.getDrawing = (req,res,next)=>{
    drawing.find(function (err, galleryData) {
      if (err) {
      console.log(err);
      }
      else {
      res.json( galleryData);
      }
      });
   }

 

    
 module.exports.getFileById = (req,res,next)=>{
    let id = req.params.id;
    drawing.findOne({_id:id},
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

    module.exports.deleteDrawing = (req,res,next)=>{
    
      let id = req.params.id;
       drawing.findByIdAndRemove({ _id: req.params.id }, function (err,expense) {
        if (err) res.json(err);
        else res.json('Drawing Deleted Successfully');
        });
      }


module.exports.addDrawing = (req,res,next) =>{
  var  drawing1 = new drawing()
  drawing1.name = req.body.fileName;
  drawing1.fireBaseUrl = req.body.drawingPath
  drawing1.save((err,doc)=>{
    if(!err)
    res.send(doc);
     else{
            return next(err);
        }
})
}








   