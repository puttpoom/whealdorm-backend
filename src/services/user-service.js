const prisma = require("../models/prisma");

exports.createUser = (data) => prisma.user.create({ data });

exports.findUserByEmail = (email) =>
  prisma.user.findFirst({
    where: {
      email,
    },
  });
