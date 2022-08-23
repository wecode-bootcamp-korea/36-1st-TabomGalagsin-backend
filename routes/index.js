const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");
const categoriesRouter = require('./categoriesRouter');
const productsRouter = require('./productsRouter');

router.use('/categories/:categoryId', categoriesRouter.router);

router.use("/users", userRouter.router);

router.use('/products', productsRouter.router)

module.exports = router;