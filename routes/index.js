const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");
const categoriesRouter = require('./categoriesRouter');

router.use('/categories/:categoryId', categoriesRouter.router);

router.use("/users", userRouter.router);

module.exports = router;