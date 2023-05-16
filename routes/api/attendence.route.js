const express =  require("express");
const router = express.Router();
const jwtHelper = require('../../config/jwtHelper');

const attendenceData = require('../../controller/attendence.controller');
router.post('/add-attendence',attendenceData.addAttendence);
router.get('/getAttendenceById/:id',attendenceData.getAttendenceById);
router.delete('/deleteAttendecne/:id',attendenceData.deleteAttendecne);
router.put('/updateAttendence/:id',attendenceData.updateAttendence);
module.exports = router;