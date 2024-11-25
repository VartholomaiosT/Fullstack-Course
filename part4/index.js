const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const { info, error } = require("./utils/logger");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const blogsRouter = require("./controlers/blog");

morgan.token("body", (req) => JSON.stringify(req.body));
const mongoose = require("mongoose");
require("dotenv").config();
app.use(cors());

const customFormat =
  ":method :url :status :res[content-length] - :response-time ms :body";
const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then((result) => {
    info("connected to MongoDB");
  })
  .catch((error) => {
    error("error connecting to MongoDB:", error.message);
  });
mongoose.set("strictQuery", false);
app.use(morgan(customFormat));

app.use(express.json());
app.use(middleware.requestLogger);
app.use("/api/blogs", blogsRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(config.PORT, () => {
  info(`Server running on port ${config.PORT}`);
});
