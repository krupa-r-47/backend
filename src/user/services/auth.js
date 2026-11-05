const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { pool } = require("../../connection/database");
const { AppError } = require("../../utils/app-error");

function toPublicUser(user) {
  return {
    // id: user.id,
    name: user.name,
    email_id: user.email_id,
    address: user.address,
    // created_at: user.created_at,
    // updated_at: user.updated_at,
  };
}

async function registerUser(body) {
  const { email_id: email, password, name } = body;
  const address = body.address === undefined || body.address === null ? null : body.address;

  const [existingUsers] = await pool.query(
    `SELECT id, name, email_id, password, address, created_at, updated_at
     FROM users
     WHERE email_id = ?
     LIMIT 1`,
    [email],
  );
  const existingUser = existingUsers[0] || null;
  if (existingUser) {
    throw new AppError(409, "An account with this email_id already exists, Kindly Login.");
  }

  const passwordHash = await bcrypt.hash(password, 12);
  try {
    const [result] = await pool.query(
      `INSERT INTO users (name, email_id, password, address)
       VALUES (?, ?, ?, ?)`,
      [name, email, passwordHash, address],
    );
    const [users] = await pool.query(
      `SELECT id, name, email_id, address, created_at, updated_at
       FROM users
       WHERE id = ?
       LIMIT 1`,
      [result.insertId],
    );
    return toPublicUser(users[0]);
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      throw new AppError(409, "An account with this email_id already exists,Kindly Login.");
    }
    throw error;
  }
}

async function loginUser(body) {
  const { email_id: email, password } = body;
  const [users] = await pool.query(
    `SELECT id, name, email_id, password, address, created_at, updated_at
     FROM users
     WHERE email_id = ?
     LIMIT 1`,
    [email],
  );
  const user = users[0] || null;

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError(401, "Invalid email_id or password");
  }

  const token = jwt.sign(
    { sub: String(user.id), email_id: user.email_id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" },
  );

  return { token, user: toPublicUser(user) };
}

module.exports = { loginUser, registerUser };
