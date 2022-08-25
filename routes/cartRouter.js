const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middlewares/auth');

router.get('/', auth.validateToken, cartController.searchCart)

router.post('/', auth.validateToken, cartController.createCart);

router.patch('/:orderItemsId', auth.validateToken, cartController.updateCart);

router.delete('/:orderItemsId', auth.validateToken, cartController.deleteCart);

module.exports = { router };

