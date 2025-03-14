const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();
const { format } = require(`date-fns`);

async function vaultFolder(req, res, next) {
  const foldersData = await prisma.folders.findMany({
    where: {
      usersId: req.user.id,
      location: `/vault/${req.params.folderName}`,
    },
  });
  console.log(foldersData);
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
    data: filesData,
    reqParams: link,
    url: link,
  });
}

module.exports = vaultFolder;
