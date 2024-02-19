const express = require("express");
const dormController = require("../controllers/dorm-controller");
const authenticate = require("../middlewares/validators/authenticate");

const router = express.Router();

router.post(
  "/create-room",
  authenticate,
  dormController.checkRoleDorm,
  dormController.createRoom
);

router.get("/me", authenticate);

router.post("/register", authenticate, dormController.registerDorm);
router.get("/get-vacant-dorm", dormController.getAllVacantDorm);

module.exports = router;
