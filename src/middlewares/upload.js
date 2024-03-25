const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const filename =
      "" +
      Date.now() +
      Math.round(Math.random() * 1000000) +
      "." +
      file.mimetype.split("/")[1];
    //! *** stars ต่อ string ด้วยชื่อนามสกุลไฟล์
    cb(null, filename);
  },
});

const option = {};

module.exports = multer({ storage });
