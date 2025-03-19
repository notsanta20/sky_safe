const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();
const supabaseDelete = require(`../configs/supabaseConfig`).deleteFile;

async function deleteFile(req, res, next) {
  const auth = req.isAuthenticated();

  if (auth) {
    try {
      const { id, location } = req.query;
      const file = await prisma.files.findFirst({
        where: {
          id: id,
        },
      });

      await supabaseDelete(req.user.id, location, file.name);
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
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect(`/login`);
  }
}

module.exports = deleteFile;
