const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();
const path = require(`path`);

async function downloadFile(req, res, next) {
  const { name, location } = req.query;
  const file = await prisma.files.findFirst({
    where: {
      name: name,
      location: location,
      usersId: req.user.id,
    },
  });

  const filePath = path.join(__dirname, `../`, file.path);

  res.download(filePath, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

module.exports = downloadFile;
