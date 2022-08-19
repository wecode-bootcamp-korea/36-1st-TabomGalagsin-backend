const express = require('express');
const router = express.Router();

const categoriesRouter = require('./categoriesRouter');

router.use('/categories', categoriesRouter.router);

module.exports = router;