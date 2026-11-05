const express = require("express");
const authRoutes = require("./auth");
const productRoutes = require("./products");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/auth/products", productRoutes);

module.exports = router;
