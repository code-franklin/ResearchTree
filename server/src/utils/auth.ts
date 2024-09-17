// utils/auth.js
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const ACCESS_KEY = process.env.ACCESS_KEY || 'fhEyIAZQfUaZp0EWjg1F48uyRSqFAYsQwSdvGmHf11RSsjLRiYViPo7zY41V'; // Replace with your actual secret or access key

export function generateToken(user: any) {
  const payload = {
    aud: 'xrFOxf2xvbLZW9SVeF1Y', // Replace with your actual Environment ID
    sub: user._id, // Unique user identifier
    name: user.name,
    email: user.email,
    avatar: user.profileImage // Optional
  };

  return jwt.sign(payload, ACCESS_KEY, { algorithm: 'HS256', expiresIn: '1h' });
}
