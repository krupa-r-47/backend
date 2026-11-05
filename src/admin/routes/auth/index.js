const express = require("express");
const login = require("../../controllers/auth/login");
const { loginSchema } = require("../../validation/auth");
const { validate } = require("../../../middleware/validate");

const router = express.Router();

router.post("/login", validate(loginSchema), login);

module.exports = router;
