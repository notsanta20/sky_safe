function signup(req, res, next) {
  const auth = req.isAuthenticated();
  if (auth) {
    res.redirect(`/`);
  } else {
    res.render(`signup`, { auth: auth });
  }
}

module.exports = signup;
