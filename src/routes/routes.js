const express = require("express");
const userRoutes = require("../user/routes");
const adminRoutes = require("../admin/routes");

const router = express.Router();

router.get("/health", (_request, response) => {
  response.status(200).json({ status: "ok" });
});
router.use("/rest/user", userRoutes);
router.use("/rest/admin", adminRoutes);

module.exports = router;
