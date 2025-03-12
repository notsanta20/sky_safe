const express = require(`express`);
const router = express.Router();
const index = require(`../controllers/index`);
const signup = require(`../controllers/signup`);
const signupPost = require(`../controllers/signupPost`);
const login = require(`../controllers/login`);
const loginPost = require(`../controllers/loginPost`);

router.get(`/`, index);
router.get(`/signup`, signup);
router.post(`/signup`, signupPost);
router.get(`/login`, login);
router.post(`/login`, loginPost);

module.exports = router;
