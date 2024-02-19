const Joi = require("joi");

const targetDormIdSchema = Joi.object({
  targetDormId: Joi.number().positive().required(),
});

exports.validateTargetDormId = (req, res, next) => {
  const { value, error } = targetDormIdSchema.validate(req.params);
  if (error) {
    throw error;
  }

  req.targetDormId = value.targetDormId;

  next();
};
