const prisma = require("../models/prisma");

exports.getRoomByRoomId = (roomId) =>
  prisma.room.findFirst({
    where: { id: roomId },
    include: {
      roomFacilities: true,
      dorm: {
        select: {
          dormName: true,
          isVerify: true,
          location: true,
          distance: true,
          latLong: true,
        },
      },
    },
  });

exports.createAppointmentByUser = (appointmentData) =>
  prisma.appointment.create({
    data: {
      room: { connect: { id: appointmentData.title.roomId } },
      user: { connect: { id: appointmentData.userId } },
      fullName: appointmentData.title.fullName,
      phone: appointmentData.title.phone,
      title: appointmentData.title.title,
      appointedDate: appointmentData.title.appointedDate,
      appointedTime: appointmentData.title.appointedTime,
    },
  });

exports.getAllAppointmentsByDormId = (dormId) =>
  prisma.appointment.findMany({ where: { id: dormId } });

exports.getUserAppointmentsByUserId = (userId) =>
  prisma.appointment.findMany({
    where: { userId },
    include: { room: { include: { roomFacilities: true } } },
    orderBy: {
      createdAt: "asc",
    },
  });
