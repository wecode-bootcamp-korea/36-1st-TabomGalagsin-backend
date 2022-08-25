const express = require('express');
const cartController = require('../controllers/cartController');
const errorHandler =require('../middlewares/errorHandler');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', auth.validateToken, errorHandler(cartController.searchCart));

router.post('/', auth.validateToken, errorHandler(cartController.createCart));

router.patch('/:orderItemsId', auth.validateToken, errorHandler(cartController.updateCart));

router.delete('/:orderItemsId', auth.validateToken, errorHandler(cartController.deleteCart));

module.exports = { router };

