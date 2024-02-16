const Joi = require("joi");
const validate = require("./validator");

const registerSchema = Joi.object({
  firstName: Joi.string().required().trim().messages({
    "string.empty": "first name is required",
    "any.required": "first name is required",
  }),

  lastName: Joi.string().required().trim().messages({
    "string.empty": "last name is required",
    "any.required": "last name is required",
  }),

  email: Joi.string().email({ tlds: false }).required().messages({
    "alternatives.match": "invalid email address or mobile number",
    "any.required": "email address or mobile number is required",
  }),

  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,}$/)
    .required()
    .messages({
      "string.empty": "password is required",
      "string.pattern.base":
        "password must be at least 6 characters and contain only alphabet and number",
      "any.required": "password is required",
    }),

  role: Joi.string()
    .valid("USER", "DORM")
    .required()
    .messages({ "string.empty": "role is required" }),

  // email: Joi.forbidden().when("email", {
  //   is: Joi.string().email({ tlds: false }),
  //   then: Joi.string().default(Joi.ref("email")),
  // }),

  // mobile: Joi.forbidden().when("emailOrMobile", {
  //   is: Joi.string().pattern(/^[0-9]{10}$/),
  //   then: Joi.string().default(Joi.ref("emailOrMobile")),
  // }),
});

const loginSchema = Joi.object({
  email: Joi.string().required().messages({
    "string.empty": "email or mobile is required",
    "any.required": "email or mobile is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "password is required",
    "any.required": "password is required",
  }),
});

exports.validateRegister = validate(registerSchema);
exports.validateLogin = validate(loginSchema);
