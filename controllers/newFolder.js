const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();

async function newFolder(req, res, next) {
  const { folderName } = req.body;
  const url = req.query.url === `/` ? `/vault` : `/vault/${req.query.url}`;
  await prisma.folders.create({
    data: {
      name: folderName,
      location: url,
      usersId: req.user.id,
    },
  });

  res.redirect(url);
}

module.exports = newFolder;
