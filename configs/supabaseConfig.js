const supabaseAdmin = require(`../db/supabase`);
const { decode } = require(`base64-arraybuffer`);

async function uploadFile(userId, folderId, file) {
  const folder = folderId ? folderId : `/`;
  const buffer = file.buffer.toString(`base64`);

  const { data, error } = await supabaseAdmin.storage
    .from("file-uploader")
    .upload(`${userId}/${folder}/${file.originalname}`, decode(buffer), {
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

async function downloadFile(userId, folder, file, time) {
  let path;
  if (folder) {
    path = `${userId}/${folder}/${file}`;
  } else {
    path = `${userId}/${file}`;
  }
  const { data, error } = await supabaseAdmin.storage
    .from("file-uploader")
    .createSignedUrl(path, time, {
      download: true,
    });
  if (error) {
    console.error(`Download error ` + error);
  }

  return data;
}

module.exports = { uploadFile, deleteFile, deleteFolder, downloadFile };
