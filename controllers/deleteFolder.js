const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();

async function deleteFolder(req, res, next) {
  const auth = req.isAuthenticated();

  if (auth) {
    try {
      let { name, parent } = req.query;
      parent = parent === `` ? null : parent;
      const folder = await prisma.folders.findFirst({
        where: {
          name: name,
          parentId: parent,
          usersId: req.user.id,
        },
        include: {
          children: true,
        },
      });

      console.log(folder);

      res.redirect(`/vault`);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect(`/login`);
  }
}

module.exports = deleteFolder;
