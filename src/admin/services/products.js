const { pool } = require("../../connection/database");

async function addProduct(body) {
  const { photo, title, description, price, stock = 0 } = body;
  const [result] = await pool.query(
    `INSERT INTO products (photo_url, name, description, price, stock)
     VALUES (?, ?, ?, ?, ?)`,
    [photo, title, description, price, stock],
  );
  const [products] = await pool.query(
    `SELECT id, photo_url, name, description, price, stock, created_at, updated_at
     FROM products
     WHERE id = ?
     LIMIT 1`,
    [result.insertId],
  );

  return products[0];
}

async function listProducts() {
  const [products] = await pool.query(
    `SELECT id, photo_url, name, description, price, stock, created_at, updated_at
     FROM products
     ORDER BY created_at DESC, id DESC`,
  );

  return products;
}

async function updateProduct(id, body) {
  const columnByField = {
    photo: "photo_url",
    photo_url: "photo_url",
    title: "name",
    name: "name",
    description: "description",
    price: "price",
    stock: "stock",
  };
  const fields = Object.keys(body);
  const assignments = fields.map((field) => `${columnByField[field]} = ?`);
  const values = fields.map((field) => body[field]);

  await pool.query(
    `UPDATE products
     SET ${assignments.join(", ")}
     WHERE id = ?`,
    [...values, id],
  );
  const [products] = await pool.query(
    `SELECT id, photo_url, name, description, price, stock, created_at, updated_at
     FROM products
     WHERE id = ?
     LIMIT 1`,
    [id],
  );

  return products[0] || null;
}

async function deleteProduct(id) {
  const [result] = await pool.query(
    `DELETE FROM products
     WHERE id = ?`,
    [id],
  );

  return result.affectedRows > 0;
}

module.exports = { addProduct, listProducts, updateProduct, deleteProduct };
