const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();
const { body, validationResult } = require(`express-validator`);

const validate = [
  body(`folderName`).not().isEmpty().withMessage(`Name should not be empty`),
  body(`folderName`)
    .trim()
    .isLength({ min: 3, max: 12 })
    .withMessage(`Name should be between 3 to 12 characters`),
];

async function newFolder(req, res, next) {
  const { folderName } = req.body;
  const url = req.query.url === `/` ? null : req.query.url;

  const alreadyExists = await prisma.folders.findFirst({
    where: {
      name: folderName,
      parentId: url,
      usersId: req.user.id,
    },
  });

  if (!alreadyExists) {
    let parent = url;
    if (url) {
      parent = await prisma.folders.findFirst({
        where: {
          id: url,
          usersId: req.user.id,
        },
      });
      parent = parent.id;
    }

    await prisma.folders.create({
      data: {
        name: folderName,
        usersId: req.user.id,
        parentId: parent,
      },
    });
  } else {
    console.log(`folder already exists`);
  }

  res.redirect(`/vault`);
}

module.exports = newFolder;
