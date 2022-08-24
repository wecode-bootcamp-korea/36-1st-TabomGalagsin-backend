const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middlewares/auth');

router.post('/', auth.validateToken, cartController.createCart);

module.exports = { router };

