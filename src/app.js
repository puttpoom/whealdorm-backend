require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const error = require("./middlewares/error");
const notFound = require("./middlewares/notFound");

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

//router
const authRoute = require("./routers/auth-route");

//config rote
// app.use("/");
app.use("/auth", authRoute);

app.use(notFound);
app.use(error);

app.listen(PORT, () => {
  console.log(`server-backend fakebuck is running on ${PORT}`);
});
