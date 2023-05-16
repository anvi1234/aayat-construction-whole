const mongoose = require('mongoose');
const passport = require('passport');
const _= require('lodash')
const gallery = mongoose.model('Gallery')

const gallery1 = mongoose.model('Gallerydata')

module.exports.addGallery = (req,res,next) =>{
    const reqFiles = []

    for (var i = 0; i < req.files.length; i++) {
        reqFiles.push('https://ayat-constructionv11.herokuapp.com/upload/' + req.files[i].filename)
      }
  
      if(!req.files){
        return res.status(500).send({message:'Upload fail'});

    }else{
        req.body.avatar = reqFiles;
        console.log("gffffffffffffffffh",  req.body.fireBaseUrl)
      gallery.create(req.body,function(err,gallery2){
            if(err){
                console.log(err);
            }
            else{
               
                res.json(gallery2);
            }
        })
    }
    

}

module.exports.getGallery = (req,res,next)=>{
  gallery1.find(function (err, galleryData) {
      if (err) {
      console.log(err);
      }
      else {
      res.json( galleryData);
      }
      });
   }

   module.exports.deleteGallery = (req,res,next)=>{
    
    let id = req.params.id;
    gallery1.findByIdAndRemove({ _id: req.params.id }, function (err,gallery) {
      if (err) res.json(err);
      else res.json({message:"File Deleted Successfully"});
      });
    }

    
 module.exports.getFileById = (req,res,next)=>{
    let id = req.params.id;
    gallery1.findOne({_id:id},
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



module.exports.addGalleryMid = (req,res,next) =>{
  var  gallery = new  gallery1()
  gallery.siteName = req.body.siteName;
  gallery.location = req.body.location;
  gallery.imageUrl = req.body.imageUrl;
  gallery.fireBaseUrl = req.body.firebaseArr
  // siteRegistration.billNo = req.body.billNo;
  // siteRegistration.poNo = req.body.poNo;
  // siteRegistration.date = req.body.date

  gallery.save((err,doc)=>{
      if(!err)
      res.send(doc);
       else{
              return next(err);
          }
 })
}
 module.exports.getFileByComNameandloc = (req,res,next)=>{

        gallery1.find({
            $and: [
                { 
                    siteName: { $eq:req.query.siteName}},
                    { location
                    : { $eq: req.query.location}}
             ]
        },
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
  
   