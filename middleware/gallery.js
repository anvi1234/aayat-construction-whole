const multer = require("multer");


const pdfStorage= multer.diskStorage({
        
  destination: 'uploads',
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
   cb(null, Date.now()+(Math.random() + 1).toString(36).substring(7)+'.'+ext);
  },
});

const pdfUploadMiddleware = multer({
    storage: pdfStorage,
  }).array("avatar", 100);

  module.exports = {
    pdfUploadMiddleware
  };

// const util = require("util");
// const path = require("path");
// const multer = require("multer");
// var storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     console.log("ggdf",req)
//     callback(null, 'uploads');
//   },
//   filename: (req, file, callback) => {
    
//     var filename = `${Date.now()}-bezkoder-${file.originalname}`;
//     callback(null, filename);
//   }
// });
// const uploadFiles = multer({ storage: storage }).array("imageurl", 10);

// module.exports = { uploadFiles};