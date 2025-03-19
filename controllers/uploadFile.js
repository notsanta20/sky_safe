const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();
const supabaseUploads = require(`../configs/supabaseConfig`).uploadFile;

async function uploadFile(req, res, next) {
  try {
    const fileDetails = req.file;
    const folderName = req.params.folderName ? req.params.folderName : null;

    const alreadyExist = await prisma.files.findFirst({
      where: {
        name: fileDetails.originalname,
        folderId: folderName,
        usersId: req.user.id,
      },
    });

    if (!alreadyExist) {
      supabaseUploads(req.user.id, folderName, fileDetails);
      await prisma.files.create({
        data: {
          name: fileDetails.originalname,
          size: fileDetails.size,
          folderId: folderName,
          usersId: req.user.id,
        },
      });
    } else {
      console.log(`File already exists`);
    }

    if (folderName === null) {
      res.redirect(`/vault`);
    } else {
      res.redirect(`/vault/${folderName}`);
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = uploadFile;
