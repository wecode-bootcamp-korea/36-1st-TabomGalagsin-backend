const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");
const productRouter = require("./productRouter");
const categoriesRouter = require('./categoriesRouter');

router.use('/categories/:categoryId', categoriesRouter.router);

router.use("/users", userRouter.router);

router.use("/products", productRouter.router);

module.exports = router;