import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config();

export const setToken = (user) => {
    const token = jwt.sign({ user }, process.env.JET_SECERET, {
        expiresIn: '10m'
    });

    return token;
};
