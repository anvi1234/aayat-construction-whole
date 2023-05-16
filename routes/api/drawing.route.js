const express =  require("express");
const mongoose  = require("mongoose");
const router = express.Router();
const jwtHelper = require('../../config/jwtHelper');
const drawing = require('../../controller/drawing.controller');
const upload = require('../../middleware/gallery');

router.get('/get-drawing/:id', drawing.getFileById);
router.post('/add-drawing',drawing.addDrawing);
router.get('/get-drawing', drawing.getDrawing);
router.delete('/delete-drawing/:id', drawing.deleteDrawing);
module.exports = router;