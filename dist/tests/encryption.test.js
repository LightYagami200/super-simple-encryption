"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
const globals_1 = require("@jest/globals");
const Encryption_1 = require("../services/Encryption");
// Test Suite
(0, globals_1.describe)('Encryption', () => {
    let enc;
    // Test Case
    (0, globals_1.test)('Creates an instance of SuperSimpleEncryption', () => {
        // Arrange
        const encryptionKey = "dNmHLRwCqxMRpCSPwT4SGz5rTMhd43g3";
        // Act
        enc = new Encryption_1.SuperSimpleEncryption(encryptionKey);
        // Assert
        (0, globals_1.expect)(enc).toBeDefined();
    });
    let encryptedVal;
    // Test Case
    (0, globals_1.test)('Encrypts a string', () => {
        // Arrange
        const text = 'test';
        // Act
        const encrypted = enc.encrypt(text);
        // Assert
        (0, globals_1.expect)(encrypted).not.toBe(text);
        // Assert type
        (0, globals_1.expect)(typeof encrypted).toBe('string');
        // Store encrypted value for later
        encryptedVal = encrypted;
    });
    // Test Case
    (0, globals_1.test)('Decrypts a string', () => {
        // Arrange
        const text = 'test';
        // Act
        const decrypted = enc.decrypt(encryptedVal);
        // Assert
        (0, globals_1.expect)(decrypted).toBe(text);
    });
});
