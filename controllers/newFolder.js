const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();

async function newFolder(req, res, next) {
  const { folderName } = req.body;
  const url = req.query.url === `/` ? null : req.query.url;

  const alreadyExists = await prisma.folders.findFirst({
    where: {
      name: folderName,
      parentId: url,
      usersId: req.user.id,
    },
  });

  if (!alreadyExists) {
    let parent = url;
    if (url) {
      parent = await prisma.folders.findFirst({
        where: {
          id: url,
          usersId: req.user.id,
        },
      });
      parent = parent.id;
    }

    await prisma.folders.create({
      data: {
        name: folderName,
        usersId: req.user.id,
        parentId: parent,
      },
    });
  } else {
    console.log(`folder already exists`);
  }

  res.redirect(`/vault`);
}

module.exports = newFolder;
