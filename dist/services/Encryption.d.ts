type EncryptResult<T> = T extends true ? {
    encrypted: string;
    iv: string;
} : string;
export declare class SuperSimpleEncryption {
    private encryptionKey;
    constructor(encryptionKey: string);
    /**
     * Encrypts a string using AES-256-CBC
     *
     * @param {string} text - The text to encrypt
     * @param {boolean} returnIv - Whether to return the initialization vector or embed it in the encrypted string
     */
    encrypt: <T extends boolean>(text: string, returnIv?: T) => EncryptResult<T>;
    /**
     * Decrypts a string using AES-256-CBC
     *
     * @param {string} text - The text to decrypt
     * @param {string} iv - The initialization vector
     */
    decrypt: (text: string, iv?: string) => string;
}
export {};
