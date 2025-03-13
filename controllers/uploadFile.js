const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();

async function uploadFile(req, res, next) {
  const fileDetails = req.file;
  const name = fileDetails.originalname;
  const size = fileDetails.size;
  const date = new Date();

  await prisma.files.create({
    data: {
      name: name,
      size: size,
      date: date,
      usersId: req.user.id,
    },
  });
  res.redirect(`/vault`);
}

module.exports = uploadFile;
