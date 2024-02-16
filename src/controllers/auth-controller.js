const userService = require("../services/user-service");
const hashService = require("../services/hash-service");
const createError = require("../untills/create-error");
const catchError = require("../untills/catch-error");
const jwtService = require("../services/jwt-service");

exports.register = catchError(async (req, res, next) => {
  const existUser = await userService.findUserByEmail(req.body.email);
  // console.log(existUser);

  if (existUser) {
    console.log(existUser);
    createError("EMAIL_IN_USE", 400);
  }

  req.body.password = await hashService.hash(req.body.password);
  const newUser = await userService.createUser(req.body);
  const payload = { userId: newUser.id, role: newUser.role };

  const accessToken = jwtService.sign(payload);

  console.log(accessToken);
  delete newUser.password;

  res.status(201).json({ accessToken, newUser });
});

exports.login = catchError(async (req, res, next) => {
  const existsUser = await userService.findUserByEmail(req.body.email);

  if (!existsUser) {
    createError("invalid Email", 400);
  }

  const isMatch = await hashService.compare(
    req.body.password,
    existsUser.password
  );

  if (!isMatch) {
    createError("Invalid credentials naja(Password)", 400);
  }

  const payload = { userId: existsUser.id, roleUser: existsUser.role };
  const accessToken = jwtService.sign(payload);
  delete existsUser.password;

  res.status(200).json({ accessToken, user: existsUser });
});

exports.getMe = (req, res, next) => res.status(200).json({ user: req.user });
