import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';


export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) return next(errorHandler(401, 'You are not authenticated! SignIn to get access.'));

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log(err);
            return next(errorHandler(403, 'Token is not valid!'));
        }
        //console.log('Decoded token:', decoded); // Log the decoded token
        req.user = decoded; // Set req.user with the decoded user information
        next();
    });
};
