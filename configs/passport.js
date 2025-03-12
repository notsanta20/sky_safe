const passport = require(`passport`);
const LocalStrategy = require(`passport-local`).Strategy;
const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();
const passwordFunc = require(`./password`);

const verifyCallback = async (username, password, done) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });
    if (!user) {
      return done(null, false, { message: `Incorrect username` });
    }
    const match = passwordFunc.validatePassword(password, user.salt, user.hash);
    if (!match) {
      return done(null, false, { message: `Incorrect Password` });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

const Strategy = new LocalStrategy(verifyCallback);

passport.use(Strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        id: id,
      },
    });

    done(null, user);
  } catch (err) {
    done(err);
  }
});
