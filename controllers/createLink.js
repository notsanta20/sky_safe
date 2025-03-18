const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();
const { addMinutes, addHours, addDays } = require(`date-fns`);

async function createLink(req, res, next) {
  const { id, duration } = req.params;
  const date = new Date();
  let time;
  if (duration === `10m`) {
    time = addMinutes(date, 10);
  } else if (duration === `1h`) {
    time = addHours(date, 1);
  } else if (duration === `10h`) {
    time = addHours(date, 10);
  } else if (duration === `1d`) {
    time = addDays(date, 1);
  }

  const data = await prisma.linkSession.create({
    data: {
      fileId: id,
      expiry: time,
    },
  });
  const linkId = data.id;
  const link = `${req.get(`host`)}/share/${linkId}`;
  res.json({ link: link });
}

module.exports = createLink;
