"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperSimpleEncryption = void 0;
// =====================
// SECTION | IMPORTS
// =====================
const crypto_1 = __importDefault(require("crypto"));
// =====================!SECTION
// =====================
// SECTION | ENCRYPTION
// =====================
class SuperSimpleEncryption {
    constructor(encryptionKey) {
        /**
         * Encrypts a string using AES-256-CBC
         *
         * @param {string} text - The text to encrypt
         * @param {boolean} returnIv - Whether to return the initialization vector or embed it in the encrypted string
         */
        this.encrypt = (text, returnIv = false) => {
            const iv = crypto_1.default.randomBytes(16);
            const cipher = crypto_1.default.createCipheriv('aes-256-ctr', this.encryptionKey, iv);
            const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
            if (returnIv)
                return {
                    iv: iv.toString('hex'),
                    encryptedData: encrypted.toString('hex'),
                };
            return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
        };
        /**
         * Decrypts a string using AES-256-CBC
         *
         * @param {string} text - The text to decrypt
         * @param {string} iv - The initialization vector
         */
        this.decrypt = (text, iv) => {
            const decipher = crypto_1.default.createDecipheriv('aes-256-ctr', this.encryptionKey, Buffer.from(iv || text.split(':')[0], 'hex'));
            const decrpyted = Buffer.concat([
                decipher.update(Buffer.from(iv ? text : text.split(':')[1], 'hex')),
                decipher.final(),
            ]);
            return decrpyted.toString();
        };
        // Make sure the encryption key is 32 bytes (256 bits)
        if (encryptionKey.length !== 32)
            throw new Error('The encryption key must be 32 bytes long');
        this.encryptionKey = encryptionKey;
    }
}
exports.SuperSimpleEncryption = SuperSimpleEncryption;
// =====================!SECTION
