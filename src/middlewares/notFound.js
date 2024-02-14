module.exports = (req, res, next) => {
  res.status(404).json({ massage: "Page NOT FOUND 404" });
};
