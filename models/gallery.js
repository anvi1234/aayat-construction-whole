var mongoose = require('mongoose');

var GallerySchema = new mongoose.Schema({
    id:String,
    avatar: {
        type: Array
      },
      fireBaseUrl:{
        type:Array
      },
    siteName:String,
    location:String,
    work:String,
    uploaded:{type:Date,default:Date.now},
})

module.exports = mongoose.model('Gallery',GallerySchema);

var Gallery1Schema = new mongoose.Schema({
  id:String,
  siteName:String,
  location:String,
  work:String,
  fireBaseUrl:{
    type: Array
  },
  uploaded:{type:Date,default:Date.now},
})

module.exports = mongoose.model('Gallerydata',Gallery1Schema);