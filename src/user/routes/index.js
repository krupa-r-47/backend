const express = require("express");
const authRoutes = require("./routes");

const router = express.Router();

router.use("/auth", authRoutes);

module.exports = router;
