const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();
const { format } = require(`date-fns`);

async function vault(req, res, next) {
  const data = await prisma.files.findMany({
    where: {
      usersId: req.user.id,
    },
  });
  data.forEach((d) => {
    const time = format(d.date, `MMMM dd, yyyy`);
    d.date = time;
  });
  res.render(`vault`, { data: data });
}

module.exports = vault;
