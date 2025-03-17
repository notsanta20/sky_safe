const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();
const path = require(`path`);

async function downloadFile(req, res, next) {
  const auth = req.isAuthenticated();

  if (auth) {
    try {
      const { name, location } = req.query;
      const file = await prisma.files.findFirst({
        where: {
          name: name,
          location: location,
          usersId: req.user.id,
        },
      });

      const filePath = path.join(__dirname, `../`, file.path);

      res.download(filePath, name, (err) => {
        if (err) {
          console.error(err);
        }
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect(`/login`);
  }
}

module.exports = downloadFile;
