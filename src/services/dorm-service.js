const prisma = require("../models/prisma");

exports.registerDorm = (data) => prisma.dorm.create({ data });

exports.findDormUserByUserId = (userId) =>
  prisma.dorm.findFirst({
    where: { userId },
  });

exports.createRoom = (data, roomFacilities) =>
  prisma.room.create({
    data: {
      ...data,
      roomFacilities: {
        create: {
          ...roomFacilities,
        },
      },
    },
  });

exports.updateTotalRoom = (dormId) =>
  prisma.dorm.update({
    where: { id: dormId },
    data: { totalVacantRoom: { increment: 1 } },
  });

exports.getAllVacantDorm = () =>
  prisma.dorm.findMany({
    where: { totalVacantRoom: { gt: 0 } },
    include: {
      room: true,
    },
  });
