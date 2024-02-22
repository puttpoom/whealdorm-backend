const {
  validateTargetRoomId,
} = require("../middlewares/validators/validate-appointment");
const appointmentController = require("../controllers/appointment-controller");

const express = require("express");
const router = express.Router();

router.get(
  "/room/:targetRoomId",
  validateTargetRoomId,
  appointmentController.getRoom
);

module.exports = router;
