const Joi = require("joi");

const BCRYPT_MAX_PASSWORD_BYTES = 72;

const credentialsSchema = Joi.object({
  email_id: Joi.string().trim().lowercase().email().max(255).required(),
  password: Joi.string()
    .min(8)
    .custom((value, helpers) => {
      if (Buffer.byteLength(value, "utf8") > BCRYPT_MAX_PASSWORD_BYTES) {
        return helpers.error("string.maxBytes");
      }

      return value;
    })
    .messages({
      "string.maxBytes": `"password" must be at most ${BCRYPT_MAX_PASSWORD_BYTES} UTF-8 bytes`,
    })
    .required(),
}).unknown(true);

const registerSchema = credentialsSchema.keys({
  name: Joi.string().trim().max(100).required(),
  address: Joi.string().allow("", null),
});

const loginSchema = credentialsSchema;

module.exports = { loginSchema, registerSchema };
