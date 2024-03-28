const prisma = require("../models/prisma");

exports.findUserByEmail = (email) =>
  prisma.user.findFirst({
    where: {
      email,
    },
    include: {
      dorms: true,
    },
  });

exports.findUserById = (id) =>
  prisma.user.findUnique({
    where: { id },
    include: {
      dorms: true,
    },
  });

exports.createUser = (data) => prisma.user.create({ data });

exports.createUserGoogle = (data) => prisma.user.create({ data });
