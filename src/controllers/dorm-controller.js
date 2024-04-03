const {
  createRoom,
  findDormUserByDormId,
  registerDorm,
  updateTotalRoom,
  getAllVacantDorm,
  getLatLongDormByDormId,
  findDormUserByUserId,
} = require("../services/dorm-service");

const { getAllVacantRoomByDormID } = require("../services/room-service");
const catchError = require("../untills/catch-error");
const uploadService = require("../services/upload-service");
const createError = require("../untills/create-error");

//NOTE: req.user from authenticate.js

exports.googleMapsLatLongDorm = catchError(async (req, res, next) => {
  const latLong = await getLatLongDormByDormId(+req.params.targetDormId);
  res.status(200).json(latLong);
});

exports.registerDorm = catchError(async (req, res, next) => {
  const data = { ...req.body.dorm, userId: req.user.id };
  if (req.file) {
    data.image = await uploadService.upload(req.file.path);
  }

  const dormFacilities = { ...req.body.dormFacilities };
  const result = await registerDorm(data, dormFacilities);
  console.log(result);
  res.status(200).json(result);
});

exports.checkRoleDorm = catchError(async (req, res, next) => {
  if (req.user.role !== "DORM")
    return createError("un-Auth only for dorm owner", 401);
  const dormObj = await findDormUserByUserId(req.user.id);
  req.dorm = dormObj;
  next();
});

exports.createRoom = catchError(async (req, res, next) => {
  const data = {
    ...req.body.room,
    dormId: req.dorm.id,
  };
  const roomFacilities = { ...req.body.facilities };
  const result = await createRoom(data, roomFacilities);
  const result2 = await updateTotalRoom(req.dorm.id);
  console.log(result);
  console.log(result2);

  res.status(200).json({ message: "create room successfully" });
});

exports.getAllVacantDorm = catchError(async (req, res, next) => {
  const result = await getAllVacantDorm();
  res.status(200).json(result);
});

exports.checkExitsDorm = catchError(async (req, res, next) => {
  const exitsDorm = await findDormUserByDormId(+req.params.targetDormId);
  if (!exitsDorm) {
    createError("dorm was not found", 404);
  }

  delete exitsDorm.password;
  req.targetDormId = exitsDorm;
  next();
});

exports.checkExitsRoom = catchError(async (req, res, next) => {
  const exitsRoom = await findDormUserByDormId(+req.params.targetDormId);
  if (!exitsDorm) {
    createError("dorm was not found", 404);
  }

  delete exitsDorm.password;
  req.targetDormId = exitsDorm;
  next();
});

exports.getAllVacantRoomByDormId = catchError(async (req, res, next) => {
  const vacantRoomByDormId = await getAllVacantRoomByDormID(
    +req.targetDormId.id
  );
  if (!vacantRoomByDormId)
    return createError("Internal ServerError (NO VACANT ROOM)", 500);
  res.status(200).json(vacantRoomByDormId);
});
