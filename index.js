require("dotenv").config();
const express = require("express");
const config = require("./config/config");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);
app.use(routes);

app.listen(config.PORT, () => {
  console.log("Server is running on http://localhost:" + config.PORT);
});
