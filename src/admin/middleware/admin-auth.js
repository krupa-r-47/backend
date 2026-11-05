const jwt = require("jsonwebtoken");
const { AppError } = require("../../utils/app-error");

function requireAdmin(request, _response, next) {
  const token = request.get("admin-token");

  if (!token) {
    return next(new AppError(401, "A valid admin token is required"));
  }

  let tokenPayload;
  try {
    tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new AppError(401, "A valid admin token is required"));
    }

    return next(error);
  }

  if (!tokenPayload || typeof tokenPayload !== "object" || tokenPayload.role !== "admin") {
    return next(new AppError(403, "Admin access is required"));
  }

  return next();
}

module.exports = { requireAdmin };
