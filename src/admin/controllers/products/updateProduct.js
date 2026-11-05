const { AppError } = require("../../../utils/app-error");
const { updateProduct } = require("../../services/products");

async function editProduct(request, response) {
  const id = Number(request.query.id);
  if (!Number.isSafeInteger(id) || id < 1) {
    throw new AppError(400, "Product id must be a positive integer");
  }

  const product = await updateProduct(id, request.body);
  if (!product) {
    throw new AppError(404, "Product not found");
  }

  return response.status(200).json({ product });
}

module.exports = editProduct;
