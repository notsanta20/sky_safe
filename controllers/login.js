function login(req, res, next) {
  const error = req.session.messages ? req.session.messages[0] : false;
  req.session.messages = [];
  res.render(`login`, { errors: error });
}

module.exports = login;
