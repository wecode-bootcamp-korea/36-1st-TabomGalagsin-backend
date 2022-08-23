const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");
const categoriesRouter = require('./categoriesRouter');
const productsRouter = require('./productRouter');
const cartRouter = require('./cartRouter')

router.use('/categories/:categoryId', categoriesRouter.router);

router.use("/users", userRouter.router);

router.use('/products', productsRouter.router)

router.use('/cart', cartRouter.router)

module.exports = router;