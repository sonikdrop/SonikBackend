import dotenv from 'dotenv';

dotenv.config();

const appConfig = {
    JWT_SECRET: process.env.JWT_SECRET,
    PORT: process.env.PORT,
    MONGODB_URL: process.env.MONGODB_URL,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET
};

export default appConfig;