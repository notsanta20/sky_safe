const supabaseAdmin = require(`../db/supabase`);

async function uploadFile(userId, folderId, file) {
  const { data, error } = await supabaseAdmin.storage
    .from("file-uploader")
    .upload(`${userId}/${folderId}/${file.originalname}`, file.path, {
      contentType: file.mimetype,
    });

  if (error) {
    console.error(error);
  }

  console.log(`File uploaded to files/`);
}

module.exports = uploadFile;
