const prisma = require("../models/prisma");

exports.registerDorm = (data, dormFacilities) =>
  prisma.dorm.create({
    data: {
      ...data,
      dormFacilities: {
        create: {
          ...dormFacilities,
        },
      },
    },
  });

exports.findDormUserByUserId = (userId) =>
  prisma.dorm.findFirst({
    where: { userId },
    include: {
      dormFacilities: true,
      room: true,
    },
  });

exports.findDormUserByDormId = (dormId) =>
  prisma.dorm.findFirst({
    where: { id: dormId },
    include: {
      dormFacilities: true,
      room: true,
    },
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

exports.getLatLongDormByDormId = (dormId) =>
  prisma.dorm.findFirst({
    where: { id: dormId },
    select: { latLong: true },
  });
