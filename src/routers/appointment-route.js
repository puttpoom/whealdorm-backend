const {
  validateTargetRoomId,
} = require("../middlewares/validators/validate-appointment");
const appointmentController = require("../controllers/appointment-controller");

const express = require("express");
const authenticate = require("../middlewares/validators/authenticate");
const router = express.Router();

router.get(
  "/room/:targetRoomId",
  validateTargetRoomId,
  appointmentController.getRoom
);

router.post("", authenticate, appointmentController.createAppointment);

module.exports = router;
