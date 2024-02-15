const userService = require("../services/user-service");
const hashService = require("../services/hash-service");
const createError = require("../untils/create-error");
const catchError = require("../untils/catch-error");
const jwtService = require("../services/jwt-service");

exports.register = catchError(async (req, res, next) => {
  const existUser = await userService.findUserByEmail(req.body.email);
  // console.log(existUser);

  if (existUser) {
    console.log(existUser);
    createError("Error naja Email already in used", 400);
  }

  req.body.password = await hashService.hash(req.body.password);
  const newUser = await userService.createUser(req.body);
  const payload = { userId: newUser.id, roleUser: newUser.role };

  const accessToken = jwtService.sign(payload);

  console.log(accessToken);
  delete newUser.password;

  res.status(201).json({ accessToken, newUser });
});

exports.login = catchError(async (req, res, next) => {
  const existUser = await userService.findUserByEmail(req.body.email);

  if (!existUser) {
    createError("invalid Email", 400);
  }

  const verifyPassword = await hashService.compare(
    req.body.password,
    existUser.password
  ); //* return boolean

  res.status(200).json({ msg: "login successfully" });
});
