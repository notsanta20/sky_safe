const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();
const path = require(`path`);

async function shareFile(req, res, next) {
  try {
    const { id } = req.params;
    const date = new Date();
    const data = await prisma.linkSession.findFirst({
      where: {
        id: id,
      },
    });

    if (date < data.expiry) {
      const file = await prisma.files.findFirst({
        where: {
          id: data.fileId,
        },
      });

      const filePath = path.join(__dirname, `../`, file.path);

      res.download(filePath, file.name, (err) => {
        if (err) {
          console.error(err);
        }
      });
    } else {
      res.send(`Link Expired`);
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = shareFile;
