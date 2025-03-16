const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();
const fs = require("fs");
const { promisify } = require("util");

const unlinkAsync = promisify(fs.unlink);

async function deleteFile(req, res, next) {
  const { name, location } = req.query;
  const file = await prisma.files.findFirst({
    where: {
      name: name,
      location: location,
      usersId: req.user.id,
    },
  });

  await unlinkAsync(file.path);
  await prisma.files.delete({
    where: {
      id: file.id,
    },
  });

  if (location === `/`) {
    res.redirect(`/vault`);
  } else {
    res.redirect(`/vault/${location}`);
  }
}

module.exports = deleteFile;
