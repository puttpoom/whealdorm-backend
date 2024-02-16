const catchError = require("../untills/catch-error");
const createError = require("../untills/create-error");

exports.checkDormOwner = catchError(async (req, res, next) => {
  if (req.user.role !== "DORM")
    return createError("un-Auth only for dorm owner", 401);
  next();
});

exports.createRoom = catchError(async (req, res, next) => {
  console.log(req.user, req.body);
  res.status(200).json(req.user);
});
