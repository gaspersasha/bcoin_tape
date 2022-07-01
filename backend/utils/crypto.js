import dotenv from 'dotenv';
import simpleEncryptor from 'simple-encryptor';

dotenv.config();

const encryptor = new simpleEncryptor(process.env.ENCRYPTION_KEY);

export const encryptRecoveryCode = (text) => {
  return encryptor.encrypt(text);
};

export const decryptRecoveryCode = (hash) => {
 return encryptor.decrypt(hash);
};
