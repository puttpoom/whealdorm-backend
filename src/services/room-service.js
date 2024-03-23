const prisma = require("../models/prisma");

exports.getAllVacantRoomByDormID = (dormId) =>
  prisma.dorm.findFirst({
    where: { id: dormId },
    include: {
      room: {
        where: {
          roomStatus: { equals: "VACANT" },
        },
        include: {
          roomFacilities: true,
        },
      },
      dormFacilities: true,
    },
  });

exports.getAllVacantRoom = () =>
  prisma.room.findMany({
    where: { roomStatus: { equals: "VACANT" } },
    include: { dorm: { select: { dormName: true, id: true } } },
  });
