var express = require('express');
var router = express.Router();
var authenticateToken = require('../service/authService').authenticateToken;
//import {authenticateToken} from '../service/authService';

router.post('/', authenticateToken, (req,res)=>{
    res.send("Hello world!");
})

router.get('/', authenticateToken, (req,res)=>{
    res.send("Hello world!");
})

router.put('/', authenticateToken, (req,res)=>{
    res.send("Hello world!");
})

router.delete('/', authenticateToken, (req,res)=>{
    res.send("Hello world!");
})

module.exports = router;