const multer = require(`multer`);
const path = require(`path`);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./db/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.originalname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
});

module.exports = upload;
