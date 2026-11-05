const { AppError } = require("../../../utils/app-error");
const { deleteProduct } = require("../../services/products");

async function removeProduct(request, response) {
  const id = Number(request.query.id);
  if (!Number.isSafeInteger(id) || id < 1) {
    throw new AppError(400, "Product id must be a positive integer");
  }

  const deleted = await deleteProduct(id);
  if (!deleted) {
    throw new AppError(404, "Product not found");
  }

  return response.status(200).json({ message: "Product deleted successfully" });
}

module.exports = removeProduct;
