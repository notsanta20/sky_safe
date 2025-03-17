const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();
const { format } = require(`date-fns`);

async function vaultFolder(req, res, next) {
  const auth = req.isAuthenticated();
  if (auth) {
    try {
      const foldersData = await prisma.folders.findMany({
        where: {
          usersId: req.user.id,
          parentId: req.params.folderName,
        },
        include: {
          children: true,
        },
      });
      const filesData = await prisma.files.findMany({
        where: {
          usersId: req.user.id,
          location: req.params.folderName,
        },
      });
      filesData.forEach((d) => {
        const time = format(d.date, `MMMM dd, yyyy`);
        d.date = time;
      });
      const link = req.params.folderName;
      res.render(`vault`, {
        folders: foldersData,
        files: filesData,
        reqParams: link,
        folderQuery: link,
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect(`/login`);
  }
}

module.exports = vaultFolder;
