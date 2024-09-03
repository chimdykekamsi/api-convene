const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const Router = require("./routes");
const _db = require("./config/db.config");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", Router);
app.use(errorHandler);

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

_db().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});