function login(req, res, next) {
  const auth = req.isAuthenticated();
  if (auth) {
    res.redirect(`/`);
  } else {
    const error = req.session.messages ? req.session.messages[0] : false;
    req.session.messages = [];
    res.render(`login`, { auth: auth, errors: error });
  }
}

module.exports = login;
