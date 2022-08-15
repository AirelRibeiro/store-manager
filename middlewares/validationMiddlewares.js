const Joi = require('joi');

const fieldsValidations = Joi.object({
  productId: Joi.number().required().messages({
    'any.required': '"productId" is required|400',
  }),
  quantity: Joi.number().min(1).required().messages({
    'any.required': '"quantity" is required|400',
    'number.min': '"quantity" must be greater than or equal to 1|422',
  }),
});

const validationMiddlewares = {
  validateName: (req, res, next) => {
    const { name } = req.body;
    
  if (!name) {
    return next({ message: '"name" is required', code: 400 });
  }
  if (name.length < 5) {
    return next({ message: '"name" length must be at least 5 characters long', code: 422 });
  }

  return next();
  },

  salesValidations: (req, _res, next) => {
    const { body } = req;
    const result = body.map((sale) => fieldsValidations.validate(sale));
    let validsSales = [...result];
    if (result.some((rs) => rs.error)) {
      result.forEach((r) => {
        if (r.error) {
          const [error, code] = r.error.details[0].message.split('|');
          validsSales = { message: error, code: Number(code) };
        }
      });
    }
    return validsSales.message ? next(validsSales) : next();
  },
};

module.exports = validationMiddlewares;
