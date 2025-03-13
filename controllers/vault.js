const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();
const { format } = require(`date-fns`);

async function vault(req, res, next) {
  const auth = req.isAuthenticated();
  if (auth) {
    const data = await prisma.files.findMany({
      where: {
        usersId: req.user.id,
        location: `/`,
      },
    });
    data.forEach((d) => {
      const time = format(d.date, `MMMM dd, yyyy`);
      d.date = time;
    });
    res.render(`vault`, { data: data, reqParams: "vault" });
  } else {
    res.redirect(`/`);
  }
}

module.exports = vault;
