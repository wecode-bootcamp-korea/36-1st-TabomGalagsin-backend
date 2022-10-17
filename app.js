const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const { errorHandler } = require("./middlewares/ErrorHandler");

const routes = require("./routes");
const app = express();

app.use(cors());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(express.json());
app.use(routes);

app.get("/ping", function (req, res) {
  res.json({ message: "pong" });
});

app.use(errorHandler);

module.exports = app;
