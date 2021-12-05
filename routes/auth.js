const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const secret = require("../config").auth.secret;
const expires = require('../config.json').auth.expires;
const authenticateToken = require('../service/authService').authenticateToken;
const userService = require('../service/userService');
const authService = require('../service/authService');
const { getToken, logout } = require('../service/authService');


//Должно быть signup?
router.post('/signin',authService.validationDefault,

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        var user = {
            nickname:req.body.nickname,
            password:req.body.password,
            email:req.body.email
        }

        userService.findUser(user).catch(() => {

            userService.saveUser(user).then((res) => {

                var token = jwt.sign(user,secret,{ expiresIn: expires + "s" });
    
                res.send({
                    'token': token,
                    'expire': '1800'
                });

            });

        }).then((data)=>{
            res.status(403).send("User already exists");
        });
    });

router.post('/login',authService.validationEmail,

     (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

    user = {
          "password":req.body.password,
          "email":req.body.email
    }

    userService.hasUser(user).then(()=>{
        var token = jwt.sign(user,secret,{ expiresIn: expires + "s" });
        res.send({
            'token': token,
            'expire': expires
        });
    }).catch(()=>{
        return res.sendStatus(401);
    });
});



router.post('/logout', authenticateToken, (req, res) => {
    var token = getToken(req);
    logout(token);
});

module.exports = router;