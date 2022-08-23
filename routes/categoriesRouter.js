const express = require('express');
const categoriesController = require('../controllers/categoriesController');
const router = express.Router();

router.get('/type/:typeId', categoriesController.getCategoryListByType);
router.get('/color/:colorId', categoriesController.getCategoryListByColor);

module.exports = {
    router
}