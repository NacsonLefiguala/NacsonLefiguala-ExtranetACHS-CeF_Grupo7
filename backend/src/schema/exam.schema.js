const Joi = require("joi");

const nombre = Joi.string().min(3).max(30).required();
const archivo = Joi.string().required();

const examBodySchema = Joi.object({
  nombre,
  archivo,
});

module.exports = { examBodySchema };
