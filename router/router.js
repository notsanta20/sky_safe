const express = require(`express`);
const router = express.Router();
const index = require(`../controllers/index`);
const signup = require(`../controllers/signup`);
const signupPost = require(`../controllers/signupPost`);
const login = require(`../controllers/login`);
const passport = require(`passport`);
const logout = require(`../controllers/logout`);

router.get(`/`, index);
router.get(`/signup`, signup);
router.post(`/signup`, signupPost);
router.get(`/login`, login);
router.post(
  `/login`,
  passport.authenticate(`local`, {
    successRedirect: `/`,
    failureRedirect: `/login`,
    failureMessage: true,
  })
);
router.get(`/logout`, logout);

module.exports = router;
