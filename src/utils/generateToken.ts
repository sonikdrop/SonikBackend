import jwt from 'jsonwebtoken';
import appConfig from '../configs/app.config';

export const generateAccessToken = (userId: string, role: string): string => {
    const access = 'auth';
    const payload = { userId, access, role };
    const secretKey: string = appConfig.JWT_SECRET || 'fallback_secret';

    const options: jwt.SignOptions = { expiresIn: 86400 }; // 1 day = 86400 seconds

    return jwt.sign(payload, secretKey, options);
}

export const generateRefreshToken = (userId: string, role: string): string => {
    const refresh = 'refresh';
    const payload = { userId, refresh, role };
    const secretKey: string = appConfig.JWT_SECRET || 'fallback_secret';

    const options: jwt.SignOptions = { expiresIn: 604800 }; // 7 days = 604800 seconds

    return jwt.sign(payload, secretKey, options);
}
