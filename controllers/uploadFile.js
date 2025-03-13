const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();

async function uploadFile(req, res, next) {
  const fileDetails = req.file;
  const name = fileDetails.originalname;
  const size = fileDetails.size;
  const date = new Date();
  const folderName = req.params.folderName ? req.params.folderName : "/";
  await prisma.files.create({
    data: {
      name: name,
      size: size,
      date: date,
      location: folderName,
      usersId: req.user.id,
    },
  });

  if (folderName === `/`) {
    res.redirect(`/vault`);
  } else {
    res.redirect(`/vault/${folderName}`);
  }
}

module.exports = uploadFile;
