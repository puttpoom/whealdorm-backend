const prisma = require("../models/prisma");

exports.getAllVacantRoomByDormID = (dormId) =>
  prisma.dorm.findFirst({
    where: { id: dormId },
    include: { room: { where: { roomStatus: { equals: "VACANT" } } } },
  });
//   prisma.room.findMany({
//     where: { AND: [{ roomStatus: { equals: "VACANT" } }, { dormId }] },
//   });

//   , { roomStatus: { equals: "VACANT" } }
