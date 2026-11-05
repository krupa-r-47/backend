const { AppError } = require("../utils/app-error");

function validate(schema) {
  return function validateRequest(request, _response, next) {
    const { error, value } = schema.validate(request.body, {
      abortEarly: true,
      convert: true,
    });

    if (error) {
      return next(new AppError(400, error.details[0].message));
    }

    request.body = value;
    return next();
  };
}

module.exports = { validate };
