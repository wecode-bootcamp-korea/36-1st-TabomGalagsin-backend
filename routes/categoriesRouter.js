const express = require('express');
const categoriesController = require('../controllers/categoriesController');
const router = express.Router();

router.get('/type/:typeId', categoriesController.categoriesType)
router.get('/color/:colorId', categoriesController.categoriesColor)

module.exports = {
    router
}