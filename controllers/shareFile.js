const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();
const supabase = require(`../configs/supabaseConfig`).downloadFile;

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

      const link = await supabase(
        file.usersId,
        file.folderId,
        file.name,
        data.duration
      );

      res.redirect(link.signedUrl);
    } else {
      res.send(`Link Expired`);
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = shareFile;
