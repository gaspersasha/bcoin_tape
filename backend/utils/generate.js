import jwt from 'jsonwebtoken';
import cryptoRandomString from 'crypto-random-string';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (id) => {
  console.log(process.env.JWT_SECRET);
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// expected output: min - max
export const getRandomIntFrom = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateRecoveryCode = () => {
  const stamp = Date.now().toString().split('');
  let random = cryptoRandomString({length: getRandomIntFrom(0, 5)});
  stamp.forEach(val => {
    random += val + cryptoRandomString({length: getRandomIntFrom(1, 7)});
  });
  return random;
};

export const generateNewPassword = () => {
  return cryptoRandomString({length: 9});
};
