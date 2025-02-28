const CryptoJS = require('crypto-js');

const secretKey = 'dev-secret-key-1234567890';

// function encryptMessage(message) {
//   return CryptoJS.AES.encrypt(message, secretKey).toString();
// }

// function decryptMessage(encryptedMessage) {
//   const bytes = CryptoJS.AES.decrypt(encryptedMessage, secretKey);
//   return bytes.toString();
// }

const encryptMessage = (message) => {
  if (typeof message !== 'string') {
    throw new Error('Message must be a string');
  }
  return CryptoJS.AES.encrypt(message, secretKey).toString(); // הצפנה ב-Base64
};

const decryptMessage = (ciphertext) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey); // פענוח
    const decryptedMessage = bytes.toString(CryptoJS.enc.Utf8); // הפיכת המידע לפורמט קריא
    if (!decryptedMessage) throw new Error('Decryption failed');
    return decryptedMessage;
  } catch (err) {
    return '';
  }
};

module.exports = { encryptMessage, decryptMessage };
