const supabaseAdmin = require(`../db/supabase`);

async function uploadFile(file, name) {
  const { data, error } = await supabaseAdmin.storage
    .from("file-uploader")
    .upload(`files/${name}`, file);

  console.log(`File uploaded to files/`);
}

module.exports = uploadFile;
