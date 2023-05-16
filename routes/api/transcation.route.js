const express =  require("express");
const router = express.Router();
const jwtHelper = require('../../config/jwtHelper');

const transactionData = require('../../controller/transaction.controller');
router.post('/add-transaction',transactionData.addTransaction);
// router.post('/authenticate',ctrlUser.authenticate);
router.get('/gettransaction',transactionData.getTransaction);
router.get('/gettransactionById/:id',transactionData.getTransactionById);
router.put('/updatetransaction/:id',transactionData.updateTransaction);
router.delete('/deletetransaction/:id',transactionData.deletegetTransaction);
router.get('/gettransactionByQuery', transactionData.getTransactionByComNameandloc);
router.post('/gettotaltransactionByQuery', transactionData.getTotalTransByComNameandloc);
module.exports = router;