const { getAllVacantRoom } = require("../services/room-service");
const catchError = require("../untills/catch-error");

exports.getAllVacantRoom = catchError(async (req, res, next) => {
  const vacantRoom = await getAllVacantRoom();
  res.status(200).json(vacantRoom);
});
