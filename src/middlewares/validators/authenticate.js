const catchError = require("../../untills/catch-error");
const createError = require("../../untills/create-error");
const jwtService = require("../../services/jwt-service");
const userService = require("../../services/user-service");

const authenticate = catchError(async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    createError("invalid authorization header", 401);
  }
  const token = authorization.split(" ")[1]; //* split return array เอาเฉพาะ JWT
  const decodedPayload = jwtService.verify(token); //*แกะข้อมูล user(userId) จาก payload ที่เจ้ารหัสอยู่ใน token (JWT)

  const user = await userService.findUserById(decodedPayload.userId);
  if (!user) {
    createError("user was not found", 401);
  }

  delete user.password;
  console.log(user, "user");
  const dorm = user.dorms;
  console.log(dorm, "dormmmmmmmmmmm");

  req.dorm = dorm;
  req.user = user; //! ยัดกลับเพื่อไปให้ middle ware ตัวที่ next ใช้ต่อ
  next();
});

module.exports = authenticate;
