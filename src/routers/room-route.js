const express = require("express");
const roomController = require("../controllers/room-controller");

const router = express.Router();

router.get("/", roomController.getAllVacantRoom);

module.exports = router;
