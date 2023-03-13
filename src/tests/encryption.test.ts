// Imports
import { describe, test, expect, beforeAll } from '@jest/globals';
import { SuperSimpleEncryption } from '../services/Encryption';

// Test Suite
describe('Encryption', () => {
  let enc: SuperSimpleEncryption;

  // Test Case
  test('Creates an instance of SuperSimpleEncryption', () => {
    // Arrange
    const encryptionKey = "dNmHLRwCqxMRpCSPwT4SGz5rTMhd43g3";

    // Act
    enc = new SuperSimpleEncryption(encryptionKey);

    // Assert
    expect(enc).toBeDefined();
  });

  let encryptedVal: string;

  // Test Case
  test('Encrypts a string', () => {
    // Arrange
    const text = 'test';

    // Act
    const encrypted = enc.encrypt(text);

    // Assert
    expect(encrypted).not.toBe(text);

    // Assert type
    expect(typeof encrypted).toBe('string');

    // Store encrypted value for later
    encryptedVal = encrypted as string;
  });

  // Test Case
  test('Decrypts a string', () => {
    // Arrange
    const text = 'test';

    // Act
    const decrypted = enc.decrypt(encryptedVal);

    // Assert
    expect(decrypted).toBe(text);
  });
});
