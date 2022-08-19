const express = require('express');
const categoriesController = require('../controllers/categoriesController');
const router = express.Router();

router.get('/:categoriesId/:typeId', categoriesController.categories);

module.exports = {
    router
}