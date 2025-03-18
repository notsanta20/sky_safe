const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();
const fs = require("fs");
const { promisify } = require("util");
const supabaseUploads = require(`../configs/supabaseConfig`).uploadFile;
const unlinkAsync = promisify(fs.unlink);

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
      supabaseUploads(req.user.id, folderName, req.file);
      await prisma.files.create({
        data: {
          name: fileDetails.originalname,
          size: fileDetails.size,
          folderId: folderName,
          path: fileDetails.path,
          usersId: req.user.id,
        },
      });
    } else {
      await unlinkAsync(fileDetails.path);
      console.log(`File already exists`);
    }

    if (folderName === null) {
      res.redirect(`/vault`);
    } else {
      res.redirect(`/vault/${folderName}`);
    }
  } catch (err) {
    await unlinkAsync(req.file.path);
    console.error(err);
  }
}

module.exports = uploadFile;
