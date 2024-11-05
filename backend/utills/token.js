import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config();

export const setToken = (res, { userId }) => {
    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
        expiresIn: '2h'
    });

    res.cookie('token', token, {
        httpOnly: true,
    });
    return token;
};
