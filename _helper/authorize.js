const jwt = require('express-jwt');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

module.exports = authorize;

function authorize(roles = []) {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        // authenticate JWT token and attach user to request object (req.user)
        jwt({ secret , algorithms: ['HS256'] }),

        // authorize based on user role
        (req, res, next) => {
            if (roles.length && !roles.includes(req.user.role)) {
                console.log(req.user);
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorized to perform this action' });
            }

            // authentication and authorization successful
            next();
        }
    ];
}