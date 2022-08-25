const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");
const productRouter = require("./productRouter");
const categoriesRouter = require('./categoriesRouter');
const orderRouter = require("./orderRouter");
const cartRouter = require('./cartRouter')

router.use('/categories/:categoryId', categoriesRouter.router);

router.use("/users", userRouter.router);

router.use("/products", productRouter.router);

router.use("/orders", orderRouter.router);

router.use('/cart', cartRouter.router)

module.exports = router;