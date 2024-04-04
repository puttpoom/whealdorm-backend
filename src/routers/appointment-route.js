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

router.get(
  "/:targetUserId",
  authenticate,
  appointmentController.getUserAppointments
);

router.get(
  "/dorm/:dormId",
  authenticate,
  appointmentController.getAllAppointmentsByDormId
);

router.delete(
  "/user/:appointmentId",
  authenticate,
  appointmentController.deleteAppointment
);

router.delete(
  "/dorm/:appointmentId",
  authenticate,
  appointmentController.deleteAppointment
);

router.patch(
  "/:appointmentId",
  authenticate,
  appointmentController.updateAppointment
);

router.post("", authenticate, appointmentController.createAppointment);

module.exports = router;
