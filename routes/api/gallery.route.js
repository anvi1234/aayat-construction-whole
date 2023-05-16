const express =  require("express");
const mongoose  = require("mongoose");
const router = express.Router();
const jwtHelper = require('../../config/jwtHelper');
const galleryData = require('../../controller/gallery.controller');
const upload = require('../../middleware/gallery');

router.get('/get-gallery', galleryData.getGallery);
router.delete('/delete-gallery/:id', galleryData.deleteGallery);
router.get('/getfileById/:id', galleryData.getFileById);
router.get('/getfileByQuery', galleryData.getFileByComNameandloc);
router.post('/add-gallery',upload.pdfUploadMiddleware, galleryData.addGallery);
router.post('/add-gallery-mid', galleryData.addGalleryMid)
module.exports = router;