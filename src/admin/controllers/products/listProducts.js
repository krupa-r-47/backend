const { listProducts } = require("../../services/products");

async function getProducts(_request, response) {
  const products = await listProducts();

  return response.status(200).json({ products });
}

module.exports = getProducts;
