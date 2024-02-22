const express = require("express");
const dormController = require("../controllers/dorm-controller");
const authenticate = require("../middlewares/validators/authenticate");
const {
  validateTargetDormId,
} = require("../middlewares/validators/validate-dorm");

const router = express.Router();

router.get(
  "/maps/:targetDormId",
  validateTargetDormId,
  dormController.checkExitsDorm,
  dormController.googleMapsLatLongDorm
);

//fetch dorm when Click DormCard
router.get(
  "/room/:targetDormId",
  validateTargetDormId,
  dormController.checkExitsDorm,
  dormController.getAllVacantRoomByDormId
);

//create vacant room
router.post(
  "/create-room",
  authenticate,
  dormController.checkRoleDorm,
  dormController.createRoom
);

//get token for TEST POSTMAN
router.get("/me", authenticate);

//register dorm
router.post("/register", authenticate, dormController.registerDorm);

//fetch vacant dorm on HomePage
router.get("/get-vacant-dorm", dormController.getAllVacantDorm);

module.exports = router;
