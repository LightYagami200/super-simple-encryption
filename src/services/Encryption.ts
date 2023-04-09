// =====================
// SECTION | IMPORTS
// =====================
import crypto from 'crypto';
// =====================!SECTION

// =====================
// SECTION | TYPES
// =====================
type EncryptResult<T> = T extends true ? { encrypted: string; iv: string } : string;
// =====================!SECTION

// =====================
// SECTION | ENCRYPTION
// =====================
export class SuperSimpleEncryption {
  private encryptionKey: string;

  constructor(encryptionKey: string) {
    // Make sure the encryption key is provided
    if (!encryptionKey) throw new Error('An encryption key must be provided');

    // Make sure the encryption key is 32 bytes (256 bits)
    if (encryptionKey.length !== 32)
      throw new Error('The encryption key must be 32 bytes long');

    this.encryptionKey = encryptionKey;
  }

  /**
   * Encrypts a string using AES-256-CBC
   *
   * @param {string} text - The text to encrypt
   * @param {boolean} returnIv - Whether to return the initialization vector or embed it in the encrypted string
   */
  encrypt = <T extends boolean>(
    text: string,
    returnIv: T = false as T,
  ): EncryptResult<T> => {
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv('aes-256-ctr', this.encryptionKey, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    if (returnIv)
      return {
        iv: iv.toString('hex'),
        encryptedData: encrypted.toString('hex'),
      } as unknown as EncryptResult<T>;

    return `${iv.toString('hex')}:${encrypted.toString('hex')}` as unknown as EncryptResult<T>;
  };

  /**
   * Decrypts a string using AES-256-CBC
   *
   * @param {string} text - The text to decrypt
   * @param {string} iv - The initialization vector
   */
  decrypt = (text: string, iv?: string): string => {
    const decipher = crypto.createDecipheriv(
      'aes-256-ctr',
      this.encryptionKey,
      Buffer.from(iv || text.split(':')[0], 'hex'),
    );

    const decrpyted = Buffer.concat([
      decipher.update(Buffer.from(iv ? text : text.split(':')[1], 'hex')),
      decipher.final(),
    ]);

    return decrpyted.toString();
  };
}
// =====================!SECTION