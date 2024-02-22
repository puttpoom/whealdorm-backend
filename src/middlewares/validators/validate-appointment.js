const Joi = require("joi");

const targetRoomIdSchema = Joi.object({
  targetRoomId: Joi.number().positive().required(),
});

exports.validateTargetRoomId = (req, res, next) => {
  const { value, error } = targetRoomIdSchema.validate(req.params);
  if (error) {
    throw error;
  }

  req.targetRoomId = value.targetRoomId;

  next();
};
