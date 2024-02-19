const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

const hashedPassword = bcrypt.hashSync("123456", 10);

const userData = [];

const DormData = [];

async function run() {
  await prisma.user.createMany({ data: userData });
  await prisma.dorm.createMany({ data: DormData });
}

run();
