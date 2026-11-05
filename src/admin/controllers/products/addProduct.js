const { addProduct } = require("../../services/products");

async function createProduct(request, response) {
  const product = await addProduct(request.body);

  return response.status(201).json({ product });
}

module.exports = createProduct;
