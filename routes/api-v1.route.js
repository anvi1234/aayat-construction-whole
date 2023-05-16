const express = require('express');
const router = express.Router();

router.use('/expense', require('./api/expense.route'));
router.use('/users', require('./api/user.route'));
router.use('/transaction', require('./api/transcation.route'));
router.use('/gallery', require('./api/gallery.route'));
router.use('/task', require('./api/task.route'));
router.use('/site', require('./api/site.route'));
router.use('/attendence', require('./api/attendence.route'));
router.use('/sor', require('./api/sor.route'));
router.use('/push', require('./api/push.route'));
router.use('/drawing', require('./api/drawing.route'));
router.use('/ledger', require('./api/ledger.route'));
// router.use('/questions', require('./api/question.route'));
// router.use('/files', require('./api/file.route'));
// router.use('/company-details', require('./api/company-detail.route'));
// router.use('/project-details', require('./api/project-detail.route'));
// router.use('/categories', require('./api/category.route'));
// router.use('/images-explorers', require('./api/images-extraction.route'));
// router.use('/search-string', require('./api/clean-text.route'));
// router.use('/classifications', require('./api/classification.route'));

module.exports = router;
