const { getRoomByRoomId } = require("../services/appointment-service");
const catchError = require("../untills/catch-error");
const createError = require("../untills/create-error");

exports.getRoom = catchError(async (req, res, next) => {
  const roomDetails = await getRoomByRoomId(+req.params.targetRoomId);
  if (!roomDetails) {
    createError("room was not found", 404);
  }
  res.status(200).json(roomDetails);
});
