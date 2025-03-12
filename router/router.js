const express = require(`express`);
const router = express.Router();
const index = require(`../controllers/index`);
const signup = require(`../controllers/signup`);

router.get(`/`, index);
router.get(`/signup`, signup);

module.exports = router;
