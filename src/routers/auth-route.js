const express = require("express");
const authController = require("../controllers/auth-controller");
const { validateRegister } = require("../middlewares/validators/validate-auth");

const router = express.Router();

router.post("/register", validateRegister, authController.register);
router.post("/login", authController.login);

module.exports = router;
