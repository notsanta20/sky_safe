const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();

async function uploadFile(req, res, next) {
  const fileDetails = req.file;
  const name = fileDetails.originalname;
  const size = fileDetails.size;
  const path = fileDetails.path;
  const date = new Date();
  const folderName = req.params.folderName ? req.params.folderName : "/";

  const alreadyExist = await prisma.files.findFirst({
    where: {
      name: name,
      location: folderName,
      usersId: req.user.id,
    },
  });

  if (!alreadyExist) {
    await prisma.files.create({
      data: {
        name: name,
        size: size,
        date: date,
        location: folderName,
        path: path,
        usersId: req.user.id,
      },
    });
  } else {
    console.log(`File already exists`);
  }

  if (folderName === `/`) {
    res.redirect(`/vault`);
  } else {
    res.redirect(`/vault/${folderName}`);
  }
}

module.exports = uploadFile;

// async function main() {
//   await prisma.files.deleteMany({});
// }

// async function main() {
//   await prisma.folders.create({
//     data: {
//       name: "new_folder",
//       parentId: null,
//       usersId: 1,
//     },
//   });
// }

// main();
