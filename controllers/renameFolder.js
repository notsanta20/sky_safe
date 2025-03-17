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

async function renameFolder(req, res, next) {
  let { name, parent } = req.query;
  parent = parent === `` ? null : parent;
  const file = await prisma.folders.findFirst({
    where: {
      name: name,
      parentId: parent,
    },
  });
  console.log(file);
  res.redirect(`/vault`);
}

module.exports = renameFolder;
