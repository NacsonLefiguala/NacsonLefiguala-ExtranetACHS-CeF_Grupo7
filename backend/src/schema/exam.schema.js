const Joi = require("joi");

const name = Joi.string().min(3).max(30).required();
const file = Joi.object().keys({
  data: Joi.binary().required(),
  contentType: Joi.string().required(),
  filename: Joi.string().required(),
});

const examBodySchema = Joi.object({
  name,
  file,
});

module.exports = { examBodySchema };
