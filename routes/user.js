var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const secret = require('../config.json').secret;
const authenticateToken = require('../service/authService').authenticateToken;
const getToken = require('../service/authService').getToken;
const userService = require('../service/userService');
const tagService = require('../service/tagService');
const { body, validationResult } = require('express-validator');
const authService = require('../service/authService');

router.get('/', authenticateToken, (req,res)=>{
    var token = getToken(req);
    var user = jwt.decode(token);
    userService.findUser(user).then((usr)=>{

        var result = {
            email : usr.email,
            nickname: usr.nickname,
            tags : null
        };

        tagService.getTagsForUser(usr).then((tags)=>{

            result.tags = tags;
            res.json(result).send();

        }).catch(()=>{
            res.json(result).send();
        })
    }).catch(()=>{
        res.send("No user finded");
    })
})

router.delete('/', authenticateToken, (req,res)=>{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
      
        userService.deleteUser(user).then(()=>{
            authService.logout();
            res.send(200)
        })
})

router.put('/', authenticateToken, authService.validationOneOf, (req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        var user = {
            email:req.body.email,
            nickname:req.body.nickname,
            password:req.body.password
        }

        userService.updateUser(user).then(() =>{
            res.status(200);
        }).catch((err)=>{
            res.send(err);
        });
})
        


module.exports = router;