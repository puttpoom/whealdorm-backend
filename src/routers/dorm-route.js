const express = require("express");
const dormController = require("../controllers/dorm-controller");
const authenticate = require("../middlewares/validators/authenticate");

const router = express.Router();

router.post(
  "/create-room",
  authenticate,
  dormController.checkDormOwner,
  dormController.createRoom
);

module.exports = router;
