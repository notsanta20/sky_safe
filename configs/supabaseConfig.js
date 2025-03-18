const supabaseAdmin = require(`../db/supabase`);

async function uploadFile(userId, folderId, file) {
  const folder = folderId ? folderId : `/`;
  const { data, error } = await supabaseAdmin.storage
    .from("file-uploader")
    .upload(`${userId}/${folder}/${file.originalname}`, file.path, {
      contentType: file.mimetype,
    });

  if (error) {
    console.error(error);
  }

  console.log(`File uploaded to files/`);
}

async function deleteFile(userId, folder, file) {
  let path;
  if (folder) {
    path = `${userId}/${folder}/${file}`;
  } else {
    path = `${userId}/${file}`;
  }
  const { data, error } = await supabaseAdmin.storage
    .from("file-uploader")
    .remove([path]);
  if (error) {
    console.error(error);
  }
}

async function deleteFolder(userId, folder) {
  const { data, error } = await supabaseAdmin.storage
    .from("file-uploader")
    .list([`${userId}/${folder}`]);
  for (let file of data) {
    const { error } = await supabaseAdmin.storage
      .from("file-uploader")
      .remove([`${userId}/${folder}/${file.name}`]);
    if (error) {
      console.error(error);
    }
  }
  if (error) {
    console.error(error);
  }
  console.log(`Folder deleted`);
}

module.exports = { uploadFile, deleteFile, deleteFolder };
