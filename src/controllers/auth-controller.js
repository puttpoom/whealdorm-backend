const userService = require("../services/user-service");
const hashService = require("../services/hash-service");
const createError = require("../untills/create-error");
const catchError = require("../untills/catch-error");
const jwtService = require("../services/jwt-service");
const e = require("express");

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

// {
//     "id": "106729908573215700956",
//     "email": "poom.bm@gmail.com",
//     "verified_email": true,
//     "name": "Poom Putthiphoom",
//     "given_name": "Poom",
//     "family_name": "Putthiphoom",
//     "picture": "https://lh3.googleusercontent.com/a/ACg8ocLaxqkDZLzx-ULptzEbPHYqFjAiIbPY8EPxJynL8EeGug=s96-c",
//     "locale": "th"
// }

// {
//     "access_token": "ya29.a0Ad52N3-lAZS5GCDHvwCJFVuRT-slIFwTsfVkdoDGNpYN3S8JzYexpbiDnJfjdgjkVNRWwF80gtYNemM7wcKpVXUB6meLwziOR6Wob55fmTDdNXynzb5DXdOnqy2JPKD0cxb0BT9vf8LXdmSYwkl0FFfAQ4vb4zyrtUIaCgYKATsSARMSFQHGX2Mi07WEzC6nycqUNby1gkFdtA0170",
//     "token_type": "Bearer",
//     "expires_in": 3599,
//     "scope": "email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid",
//     "authuser": "0",
//     "prompt": "none"
// }

exports.googleLogin = catchError(async (req, res, next) => {
  console.log(req.body, "decoded google login");
  const { email, name, given_name, family_name } = req.body;

  const userData = await userService.findUserByEmail(email);
  // console.log(userData);

  if (!userData) {
    const newUser = await userService.createUserGoogle({
      email,
      firstName: given_name,
      lastName: family_name,
      role: "USER",
    });

    const payload = { userId: newUser.id, role: newUser.role };
    const accessToken = jwtService.sign(payload);

    delete newUser?.password;

    res.status(201).json({ accessToken, newUser });
  } else {
    const payload = { userId: userData.id, role: userData.role };
    const accessToken = jwtService.sign(payload);

    delete userData?.password;

    res.status(200).json({ accessToken, user: userData });
  }
});

exports.getMe = (req, res, next) => res.status(200).json({ user: req.user });
