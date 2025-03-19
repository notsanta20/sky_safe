const supabase = require(`../configs/supabaseConfig`).downloadFile;

async function downloadFile(req, res, next) {
  const auth = req.isAuthenticated();

  if (auth) {
    try {
      const { name, folder } = req.query;
      console.log(name, folder);
      const file = await supabase(req.user.id, folder, name, 60);
      res.redirect(file.signedUrl);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect(`/login`);
  }
}

module.exports = downloadFile;
