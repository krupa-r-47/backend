const jwt = require("jsonwebtoken");
const { AppError } = require("../../utils/app-error");

async function loginAdmin(body) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (body.email_id !== adminEmail || body.password !== adminPassword) {
    throw new AppError(401, "Invalid email or password");
  }

  const token = jwt.sign(
    { sub: adminEmail, email_id: adminEmail, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" },
  );

  return { token, admin: { email_id: adminEmail } };
}

module.exports = { loginAdmin };
