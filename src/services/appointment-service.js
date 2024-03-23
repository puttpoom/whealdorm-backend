const prisma = require("../models/prisma");

exports.getRoomByRoomId = (roomId) =>
  prisma.room.findFirst({
    where: { id: roomId },
    include: {
      roomFacilities: true,
      dorm: {
        select: {
          id: true,
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
      title: appointmentData.title,
      phone: appointmentData.phone,
      fullName: appointmentData.fullName,
      appointedDate: appointmentData.appointedDate,
      appointedTime: appointmentData.appointedTime,
      user: { connect: { id: appointmentData.userId } },
      room: { connect: { id: appointmentData.roomId } },
      dorm: { connect: { id: appointmentData.dormId } },
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

exports.getDormAppointmentByDormId = (dormId) =>
  prisma.appointment.findMany({ where: { roomId: { connect: { dormId } } } });

exports.deleteAppointmentByUser = (appointmentId) =>
  prisma.appointment.delete({ where: { id: appointmentId } });

exports.updateAppointmentByDorm = (appointmentId, appointmentStatus) =>
  prisma.appointment.update({
    where: { id: appointmentId },
    data: {
      appointmentStatus,
    },
  });
