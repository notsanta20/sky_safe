const crypto = require(`node:crypto`);

function generateHash(password) {
  const salt = crypto.randomBytes(32).toString(`hex`);
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, `sha512`)
    .toString(`hex`);
  return { salt, hash };
}

function validatePassword(password, salt, hash) {
  const hasVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, `sha512`)
    .toString(`hex`);

  return hash === hasVerify;
}
module.exports = { generateHash, validatePassword };
