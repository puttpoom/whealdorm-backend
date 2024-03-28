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
    createError("Invalid credentials", 400);
  }

  const payload = { userId: existsUser.id, roleUser: existsUser.role };
  const accessToken = jwtService.sign(payload);
  delete existsUser.password;

  res.status(200).json({ accessToken, user: existsUser });
});

exports.googleLogin = catchError(async (req, res, next) => {
  const { credential } = req.body;

  const userCredentialGoogle = jwtService.verify(credential);
  const userData = await userService.findUserByEmail(
    userCredentialGoogle.email
  );

  if (!userData) {
    createError("User not found", 404);
  }

  const payload = { userId: userData.id, role: userData.role };
  const accessToken = jwtService.sign(payload);

  delete userData?.password;

  res.status(200).json({ accessToken, user: userData });
});

exports.googleRegister = catchError(async (req, res, next) => {
  const { credential } = req.body;

  const userCredentialGoogle = jwtService.verify(credential);
  const userData = await userService.findUserByEmail(
    userCredentialGoogle.email
  );

  if (!userData) {
    const newUser = await userService.createUserGoogle({
      email: userCredentialGoogle.email,
      firstName: userCredentialGoogle.given_name,
      lastName: userCredentialGoogle.family_name,
      role: "USER",
    });

    const payload = { userId: newUser.id, role: newUser.role };
    const accessToken = jwtService.sign(payload);

    delete newUser?.password;

    res.status(201).json({ accessToken, newUser });
  } else {
    createError("Email already in use", 400);
    res.status(404).json({ message: "Email already in use" });
  }

  next();
});

exports.getMe = (req, res, next) => res.status(200).json({ user: req.user });
