import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateAccessToken = (userId: string): string => {
  const accessToken = jwt.sign(
    { _id: userId },
    process.env.ACCESS_TOKEN_SECRET as Secret,
    {
      expiresIn: '30m',
    }
  );
  return accessToken;
};
