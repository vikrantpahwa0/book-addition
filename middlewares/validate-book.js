const Joi = require("joi");

const validateBookAddition = (req, res, next) => {
    const { error } = Joi.object({
      title: Joi.string().trim().required().messages({
        "string.empty": "Title is required",
      }),
      author: Joi.string().trim().required().messages({
        "string.empty": "Author is required",
      }),
      year: Joi.number().integer().required().messages({
        "number.base": "Year must be a valid integer",
        "any.required": "Year is required",
      }),
    }).validate(req.body, { abortEarly: false });
  
    if (error) {
      return res.status(400).json({ errors: error.details.map((err) => err.message) });
    }  
    next();
  };
  
  
  module.exports = {
    validateBookAddition
  };