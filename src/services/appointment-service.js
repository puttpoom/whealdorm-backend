const prisma = require("../models/prisma");
const catchError = require("../untills/catch-error");

exports.getRoomByRoomId = (roomId) =>
  prisma.room.findFirst({
    where: { id: roomId },
    include: { roomFacilities: true },
  });
