const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();
const { addMinutes, addHours, addDays } = require(`date-fns`);

async function createLink(req, res, next) {
  const { id, duration } = req.params;
  const date = new Date();
  let time;
  let seconds;
  if (duration === `10m`) {
    seconds = 600;
    time = addMinutes(date, 10);
  } else if (duration === `1h`) {
    seconds = 3600;
    time = addHours(date, 1);
  } else if (duration === `10h`) {
    seconds = 36000;
    time = addHours(date, 10);
  } else if (duration === `1d`) {
    seconds = 86400;
    time = addDays(date, 1);
  }

  const data = await prisma.linkSession.create({
    data: {
      fileId: id,
      duration: seconds,
      expiry: time,
    },
  });
  const linkId = data.id;
  const link = `${req.get(`host`)}/share/${linkId}`;
  res.json({ link: link });
}

module.exports = createLink;
