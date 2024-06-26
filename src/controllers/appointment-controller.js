const {
  getRoomByRoomId,
  createAppointmentByUser,
  getAllAppointmentsByDormId,
  getUserAppointmentsByUserId,
  deleteAppointmentByUser,
  updateAppointmentByDorm,
} = require("../services/appointment-service");
const catchError = require("../untills/catch-error");
const createError = require("../untills/create-error");

exports.getRoom = catchError(async (req, res, next) => {
  const roomDetails = await getRoomByRoomId(+req.params.targetRoomId);
  if (!roomDetails) {
    createError("room was not found", 404);
  }
  res.status(200).json(roomDetails);
});

exports.createAppointment = catchError(async (req, res, next) => {
  const {
    title,
    fullName,
    roomId,
    phone,
    appointedDate,
    appointedTime,
    dormId,
  } = req.body;

  const data = {
    userId: req.user.id,
    title,
    fullName,
    roomId,
    phone,
    appointedDate,
    appointedTime,
    dormId,
  };

  console.log(data);
  const result = await createAppointmentByUser(data);
  res.status(201).json(result);
});

exports.getAllAppointmentsByDormId = catchError(async (req, res, next) => {
  const { id } = req?.dorm;
  console.log(id, "iddddddddddd");
  const result = await getAllAppointmentsByDormId(id);
  res.status(200).json(result);
});

exports.getUserAppointments = catchError(async (req, res, next) => {
  const userId = req.user.id;
  const result = await getUserAppointmentsByUserId(userId);
  res.status(200).json(result);
});

exports.deleteAppointment = catchError(async (req, res, next) => {
  const appointmentId = +req.params.appointmentId;
  await deleteAppointmentByUser(appointmentId);
  res.status(204).json({ message: "appointment was deleted" });
});

exports.updateAppointment = catchError(async (req, res, next) => {
  const appointmentId = +req.params.appointmentId;
  const { appointmentStatus } = req.body;
  const result = await updateAppointmentByDorm(
    appointmentId,
    appointmentStatus
  );
  res.status(200).json(result);
});
