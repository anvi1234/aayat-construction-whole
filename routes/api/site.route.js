const express =  require("express");
const router = express.Router();
const jwtHelper = require('../../config/jwtHelper');

const siteData = require('../../controller/site-reg.controller');
router.post('/add-site', siteData.addSite);
// router.post('/authenticate',ctrlUser.authenticate);
router.get('/getSite',siteData.getSiteReg);
router.get('/getSiteById/:id',siteData.getSiteById);
router.put('/updateSite/:id',siteData.updateSite);
router.delete('/deleteSite/:id',siteData.deleteSite);
module.exports = router;