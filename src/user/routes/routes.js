const express = require("express");
const login = require("../controllers/login");
const register = require("../controllers/register");
const { loginSchema, registerSchema } = require("../validation/auth");
const { validate } = require("../../middleware/validate");

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

module.exports = router;
