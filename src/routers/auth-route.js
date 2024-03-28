const express = require("express");
const authController = require("../controllers/auth-controller");
const {
  validateRegister,
  validateLogin,
} = require("../middlewares/validators/validate-auth");
const authenticate = require("../middlewares/validators/authenticate");

const router = express.Router();

router.post("/register", validateRegister, authController.register);
router.post("/login", validateLogin, authController.login);
router.get("/me", authenticate, authController.getMe);
router.post("/google/login", authController.googleLogin);

module.exports = router;
