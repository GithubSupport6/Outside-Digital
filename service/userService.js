const db = require('../database/db');
const uuid = require('uuid');
const hashPassword = require('./authService').hashPassword;


const hasUser = (user) => new Promise((res,rej) => {
    password = hashPassword(user.password);
    db.one('SELECT * FROM Users WHERE email = $(email) AND password = $(password)',
     { 
         email: user.email,
         password: password
     })
        .then((data) => {
            res(data);
    })
        .catch((error) => {
            rej(error);
    })
})

const findUser = (user) => new Promise((res,rej)=>{
    password = hashPassword(user.password);
    db.one('SELECT * FROM Users WHERE email = $(email) AND password = $(password)',
    {
         email: user.email,
         password: password
    })
        .then((data) => {
            res(data)
    })
        .catch((error) => {
            rej(null)
    })
});

const saveUser = (user) => new Promise((res,rej)=>{
    password = hashPassword(user.password);
    db.one('INSERT INTO Users VALUES ($(uid), $(email), $(password), $(nick))',
    {
        uid : uuid.v4(),
        email : user.email,
        password: password,
        nick : user.nickname
    })
        .then(function (data) {
            res(true)
    })
        .catch(function (error) {
            rej(false)
    })
})

const deleteUser = (user) => new Promise((res,rej)=>{
    password = hashPassword(user.password);
    db.none('DELETE FROM Users WHERE email = $(email) AND password = $(password)',{email:user.email,password:password}).then(()=>{
        res();
    }).catch(()=>{
        rej();
    })
})

//didn't understand
const updateUser = (user) => new Promise((res,rej) =>{

    var usr = {
        email: user.email ? user.email : null,
        nickname: user.nickname ? user.nickname : null,
        password: user.password ? hashPassword(user.password) : null
    }

    db.one('SELECT * FROM Users WHERE email = $(email) OR password = $(password) OR nickname = $(nickname)',
    {
        email:usr.email,
        password:usr.password,
        nickname:usr.nickname
    }).then((data)=>{
        db.none('INSERT INTO Users VALUES ($(uid), $(email), $(password), $(nick)) ON CONFLICT UPDATE',{
            uid : data.uid,
            email : usr.email ? usr.email : data.email,
            password: usr.password ? usr.password : data.password,
            nick : usr.nickname ? usr.nickname : data.nickname
        }).then(()=>{
            res();
        }).catch(()=>{
            rej();
        })
    }).catch(()=>{
        db.none('INSERT INTO Users VALUES ($(uid), $(email), $(password), $(nick))',{
            uid : uuid.v4(),
            email : usr.email,
            password: usr.password,
            nick : user.nickname
        }).then(()=>{
            res();
        }).catch(()=>{
            rej();
        })
    })
    password = hashPassword(user.password);

    

})

module.exports = {hasUser,findUser,saveUser, deleteUser, updateUser}