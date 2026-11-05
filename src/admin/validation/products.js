const Joi = require("joi");

const photoSchema = Joi.string().uri({ scheme: ["http", "https"] }).max(2048);
const nameSchema = Joi.string().trim().min(1).max(200);
const descriptionSchema = Joi.string().trim().min(1);
const priceSchema = Joi.number().min(0).max(99999999.99).precision(2);
const stockSchema = Joi.number().integer().min(0);

const addProductSchema = Joi.object({
  photo: photoSchema.required(),
  title: nameSchema.required(),
  description: descriptionSchema.required(),
  price: priceSchema.required(),
  stock: stockSchema.default(0),
});

const updateProductSchema = Joi.object({
  photo: photoSchema,
  photo_url: photoSchema,
  title: nameSchema,
  name: nameSchema,
  description: descriptionSchema,
  price: priceSchema,
  stock: stockSchema,
})
  .min(1)
  .oxor("photo", "photo_url")
  .oxor("title", "name");

module.exports = { addProductSchema, updateProductSchema };
