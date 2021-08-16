import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv } from 'crypto';

@Injectable()
export class EncryptService {
  async doEncrypt(text: any) {
    const cipher = createCipheriv(
      'aes-256-cbc',
      Buffer.from(process.env.ENCRYPT_KEY),
      process.env.ENCRYPT_IV,
    );
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
  }

  async doDecrypt(encryptedData: any) {
    const encryptedText = Buffer.from(encryptedData, 'hex');
    const decipher = createDecipheriv(
      'aes-256-cbc',
      Buffer.from(process.env.ENCRYPT_KEY),
      process.env.ENCRYPT_IV,
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
}
