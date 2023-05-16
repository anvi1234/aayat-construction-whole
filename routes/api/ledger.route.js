const express =  require("express");
const router = express.Router();
const jwtHelper = require('../../config/jwtHelper');

const ledgerData= require('../../controller/ledger.controller');
router.post('/add-ledger', ledgerData.addLedger);
// router.post('/authenticate',ctrlUser.authenticate);
router.get('/getledger',ledgerData.getledger);
router.get('/getLedgerById/:id',ledgerData.getledgerById);
router.put('/updateLedger/:id',ledgerData.updateLedger);
router.delete('/deleteLedger/:id',ledgerData.deleteLedger);
module.exports = router;