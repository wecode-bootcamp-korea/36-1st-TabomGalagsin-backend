const express = require('express');
const categoriesController = require('../controllers/categoriesController');
const errorHandler =require('../middlewares/errorHandler');

const router = express.Router();

router.get('/type/:typeId', errorHandler(categoriesController.getCategoryListByType));
router.get('/color/:colorId', errorHandler(categoriesController.getCategoryListByColor));

module.exports = {
    router
}