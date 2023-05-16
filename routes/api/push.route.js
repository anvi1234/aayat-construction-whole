const express =  require("express");
const router = express.Router();
const jwtHelper = require('../../config/jwtHelper');

const pushData = require('../../controller/push.controller');
router.post('/add-push',pushData.addPush);
// router.post('/authenticate',ctrlUser.authenticate);
router.get('/getpush',pushData.getpush);

router.put('/updatePush/:id',pushData.updatePush);


module.exports = router;