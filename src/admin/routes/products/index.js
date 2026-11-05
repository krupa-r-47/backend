const express = require("express");
const createProduct = require("../../controllers/products/addProduct");
const getProducts = require("../../controllers/products/listProducts");
const editProduct = require("../../controllers/products/updateProduct");
const removeProduct = require("../../controllers/products/deleteProduct");
const { requireAdmin } = require("../../middleware/admin-auth");
const { validate } = require("../../../middleware/validate");
const { addProductSchema, updateProductSchema } = require("../../validation/products");

const router = express.Router();

router.get("/", requireAdmin, getProducts);
router.post("/", requireAdmin, validate(addProductSchema), createProduct);
router.patch("/", requireAdmin, validate(updateProductSchema), editProduct);
router.delete("/", requireAdmin, removeProduct);

module.exports = router;
