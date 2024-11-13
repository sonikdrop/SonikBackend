import jwt from 'jsonwebtoken';
import appConfig from '../configs/app.config';

export const generateAccessToken = (userId: string, role: string): string => {
    const access = 'auth'
    const payload = { userId , access, role};
    const secretKey = appConfig.JWT_SECRET;
    const options = { expiresIn: '1d' }; // Token expires in 1 day

    return jwt.sign(payload, secretKey as string, options);
}

export const generateRefreshToken = (userId: string, role: string): string => {
    const refresh = 'refresh'
    const payload = { userId , refresh, role};
    const secretKey = appConfig.JWT_SECRET;
    const options = { expiresIn: '7d' }; // Token expires in 7 days

    return jwt.sign(payload, secretKey as string, options);
}