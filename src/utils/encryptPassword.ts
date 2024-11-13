import bcrypt from 'bcrypt';

export const encryptPassword = (password: string): string => {
    return bcrypt.hashSync(password, 10);
}