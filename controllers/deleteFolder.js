const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();
const supabaseDelete = require(`../configs/supabaseConfig`).deleteFolder;

async function deleteFolder(req, res, next) {
  const auth = req.isAuthenticated();

  if (auth) {
    try {
      let { id } = req.query;
      await supabaseDelete(req.user.id, id);
      await prisma.folders.delete({
        where: {
          id: id,
        },
      });

      res.redirect(`/vault`);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect(`/login`);
  }
}

module.exports = deleteFolder;
