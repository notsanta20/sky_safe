function logout(req, res, next) {
  req.logout((err) => {
    res.redirect(`/`);
  });
}

module.exports = logout;
