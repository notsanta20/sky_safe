const { body, validationResult } = require(`express-validator`);
const { PrismaClient } = require(`@prisma/client`);
const passwordFunc = require(`../configs/password`);
const prisma = new PrismaClient();

const validate = [
  body(`username`, `Username should not to empty`).not().isEmpty(),
  body(`username`, `Username should be atleast 3 characters`)
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body(`password`, `Password should not be empty`).not().isEmpty(),
  body(`password`, `Password should be at least 8 character`)
    .trim()
    .isLength({ min: 8 }),
  body(`confirmPassword`).custom((confirmPassword, { req }) => {
    const password = req.body.password;
    if (password !== confirmPassword) {
      throw new Error(`Passwords are not matching`);
    }

    return true;
  }),
];

const signupPost = [
  validate,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).render("signup", { errors: errors.array() });
      }
      const { username, password } = req.body;
      const { salt, hash } = passwordFunc.generateHash(password);
      await prisma.users.create({
        data: {
          username: username,
          salt: salt,
          hash: hash,
        },
      });
      res.redirect(`/login`);
    } catch (err) {
      console.error(err);
    }
  },
];

module.exports = signupPost;
