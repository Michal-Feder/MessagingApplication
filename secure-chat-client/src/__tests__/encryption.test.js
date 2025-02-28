// encryption.test.js

import {encryptMessage, decryptMessage} from '../utils/encryption'

// בדיקות עם Jest
describe('Encryption and Decryption Tests', () => {
  it('should encrypt and decrypt a message correctly', () => {
    const originalMessage = 'Hello, this is a secret message!';
    const encryptedMessage = encryptMessage(originalMessage);

    // Verify encryption (the encrypted message should not be the same as the original message)
    expect(encryptedMessage).not.toBe(originalMessage);

    // Verify decryption
    const decryptedMessage = decryptMessage(encryptedMessage);
    expect(decryptedMessage).toBe(originalMessage);
  });

  it('should return an empty string when decrypting an invalid ciphertext', () => {
    const invalidCiphertext = 'invalidCiphertext';
    const decryptedMessage = decryptMessage(invalidCiphertext);
    expect(decryptedMessage).toBe('');
  });

  it('should handle empty messages correctly', () => {
    const emptyMessage = '';
    const encryptedMessage = encryptMessage(emptyMessage);
    expect(encryptedMessage).not.toBe(emptyMessage);

    const decryptedMessage = decryptMessage(encryptedMessage);
    expect(decryptedMessage).toBe(emptyMessage);
  });
});
