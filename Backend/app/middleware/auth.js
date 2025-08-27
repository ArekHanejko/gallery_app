import jwt from 'jsonwebtoken';
import config from "../config.js";

const auth = (req, res, next) => {
    let token = req.headers['x-auth-token'] || req.headers['authorization'];
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        req.user = jwt.verify(token, config.JwtSecret);
        next();
    }
    catch (ex) {
        res.status(400).send('Invalid token.');
    }
};

export default auth;
