const expressJwt = require('express-jwt');
require('dotenv').config();
// const userService = require('../users/user.service');
const userController = require('../controllers/users.controllers');

module.exports = jwt;

function jwt() {
    const secret = process.env.JWT_SECRET;
    return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/',
            // '/products/'
        ]
    });
}

async function isRevoked(req, payload, done) {
    console.log(payload.sub)
    try{
        const user = await userController.getById(payload.sub);
            // revoke token if user no longer exists
        if (!user) {
        return done(null, true);
        }
        done();
    }
    catch(err){
      console.log(err);
    };
};