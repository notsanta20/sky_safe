function index(req, res, next) {
  const auth = req.isAuthenticated();
  res.render(`index`, { auth: auth });
}

module.exports = index;
