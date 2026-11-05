const express = require("express");
const routes = require("./routes/routes");
const { errorHandler } = require("./middleware/error-handler");

const app = express();

app.use(express.json());
app.use(routes);

app.use(errorHandler);

module.exports = app;
