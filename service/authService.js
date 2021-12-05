const jwt = require('jsonwebtoken');
const secret = require('../config.json').auth.secret;
const crypto = require('crypto');
const { body, validationResult, oneOf } = require('express-validator');

function getToken(req){
    var token = req.headers['authorization']
    if (!token){
        return null;
    }
    else return token.split(' ')[1];
}

const validationOneOf = 
        oneOf([
            body('nickname')
              .exists()
              .withMessage('Nickname is required'),
    
            body('email')
              .exists()
              .withMessage('Email is required')
              .isEmail()
              .withMessage('Email not valid'),

            body('password')
            .exists()
            .withMessage('Password is required')
            .isStrongPassword({minSymbols:0})
            .withMessage('Must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number')
    ])      


const validationDefault = [
    body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage("Must be in email format"),

    body('password')
    .isStrongPassword({minSymbols:0})
    .withMessage("Must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number"),

    body('nickname')
    .exists()
    .withMessage("Nickname is required")
]

const validationEmail = [
    body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage("Must be in email format"),

    body('password')
    .isStrongPassword({minSymbols:0})
    .withMessage("Must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number")

]

function authenticateToken(req,res,next) {

    var token = getToken(req);

    if (!token){
        return res.sendStatus(401);
    }

    if (token == null){
         return res.sendStatus(401);
    }

    jwt.verify(token, secret, (err, user) => {
      console.log(err)
  
      if (err) return res.sendStatus(403)
  
      req.user = user
  
      next()
    })
  }

 function hashPassword(password){
     return crypto.createHash('sha256').update(password).digest('hex');
 }

 function logout(token){
     
 }

module.exports = {hashPassword,authenticateToken,getToken,logout, validationDefault, validationEmail, validationOneOf}