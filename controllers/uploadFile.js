function uploadFile(req, res, next) {
  const fileDetails = req.file;
  const name = fileDetails.originalname;
  const size = fileDetails.size;
  const date = new Date();
  console.log(name, size, date);
  res.redirect(`/vault`);
}

module.exports = uploadFile;
