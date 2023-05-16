const express =  require("express");
const router = express.Router();
const jwtHelper = require('../../config/jwtHelper');

const ctrlUser = require('../../controller/user.controller');
router.post('/register',ctrlUser.register);
router.post('/authenticate',ctrlUser.authenticate);
router.get('/cngSite',jwtHelper.verifyJwtToken,ctrlUser.cngSite)
router.get('/getUser',ctrlUser.getUser);
router.get('/getUserById/:id',ctrlUser.getUserById);
router.put('/updateUser/:id',ctrlUser.updateUser);
router.delete('/deleteUser/:id',ctrlUser.deleteUser);
module.exports = router;