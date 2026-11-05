function errorHandler(error, _request, response, _next) {
  const isMalformedJson = error.type === "entity.parse.failed";
  const statusCode = error.statusCode || (isMalformedJson ? 400 : 500);

  if (statusCode >= 500) {
    console.error(error);
  }

  response.status(statusCode).json({
    error:
      statusCode === 500
        ? "Internal server error"
        : isMalformedJson
          ? "Request body contains invalid JSON"
          : error.message,
  });
}

module.exports = { errorHandler };
