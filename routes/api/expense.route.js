const express =  require("express");
const router = express.Router();
const jwtHelper = require('../../config/jwtHelper');

const expensesData = require('../../controller/expenses.controller');
router.post('/add-expense',expensesData.expenses);
// router.post('/authenticate',ctrlUser.authenticate);
router.get('/getExpenses',expensesData.getExpenses);
router.get('/getExpensesById/:id',expensesData.getExpensesById);
router.put('/updateExpenses/:id',expensesData.updateExpenses);
router.delete('/deleteExpenses/:id',expensesData.deleteExpenses);
router.get('/getexpensesByQuery', expensesData.getExpensesByComNameandloc);
router.post('/gettotalexpensesByQuery', expensesData.getTotalExpensesByComNameandloc);
router.put('/updateMultipleExpenses', expensesData.updateMultipleExpenses);

module.exports = router;