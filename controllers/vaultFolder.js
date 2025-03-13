const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();
const { format } = require(`date-fns`);

async function vaultFolder(req, res, next) {
  const data = await prisma.files.findMany({
    where: {
      usersId: req.user.id,
      location: req.params.folderName,
    },
  });
  data.forEach((d) => {
    const time = format(d.date, `MMMM dd, yyyy`);
    d.date = time;
  });
  const link = req.params.folderName;
  res.render(`vault`, { data: data, reqParams: link });
}

module.exports = vaultFolder;
