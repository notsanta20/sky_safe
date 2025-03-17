const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();

async function deleteFolder(req, res, next) {
  console.log(req.query);
  res.redirect(`/vault`);
}

module.exports = deleteFolder;
