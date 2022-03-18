var CryptoJS = require("crypto-js");
require("dotenv").config();

const Encrypt = (input) => {
  const passphrase = process.env.PASSPHRASE;
  const salt = process.env.SALT;

  var key = CryptoJS.PBKDF2(passphrase, salt, {
    keysize: 4,
    iterations: 1000,
  });

  var iv = CryptoJS.PBKDF2(passphrase, salt, {
    keysize: 4,
    iterations: 2000,
  });

  var encryptedString = CryptoJS.AES.encrypt(input, key, {
    iv: iv,
  });

  return encryptedString.toString();
};

const OldDecrypt = (input) => {
  const aesKey = process.env.OLDAESKEY;

  const decryptedBytes = CryptoJS.AES.decrypt(input, aesKey);
  return decryptedBytes.toString(CryptoJS.enc.Utf8);
};

const OldEncrypt = (input) => {
  const aesKey = process.env.OLDAESKEY;

  return CryptoJS.AES.encrypt(input, aesKey).toString();
};

module.exports = {
  Encrypt,
  OldDecrypt,
  OldEncrypt,
};
