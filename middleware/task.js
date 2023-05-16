var express = require("express");
var multer = require("multer");


// const pdfStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "uploads");
//     },
//     filename: (req, file, cb) => {
//       console.log("file",file)
//       const ext = file.mimetype.split("/")[1];
//       cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
//     },
//   });

  var  imageStorage = multer.diskStorage({
  destination: 'uploads/task',
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
   cb(null, Date.now()+file.originalname);
  },
});
  
const imageUploadMiddleware = multer({
    storage: imageStorage,
  }).array("avatar",100);

  module.exports = {
    imageUploadMiddleware
  };