const fidUser = require('./userService').findUser;
const db = require('../database/db');


const getTagsForUser = (user) => new Promise((res,rej) => {
    findUser(user).then((data)=>{
        db.many("SELECT * FROM Tag WHERE creator = $(uid)",{uid:data.uid}).then((query)=>{
            res(query);
        }).catch(()=>{
            res(null);
        })
    })
    .catch(()=>{
        rej();
    })
})

const getTagById = (tag) => new Promise((res,rej)=>{

    var id = tag.id;
    db.one('SELECT * FROM Tag WHERE id = $(id)', {
        id:tag.id
    }).then((data) => {
        res(data);
    })
    .catch(()=>{
        rej(data);
    })    
})

const getTagFilter = (sortByOrder,offset,length) =>new Promise((res,rej) =>{
    var query = 'SELECT * FROM Tag ';

    if (sortByOrder){
        query += "ORDER BY sortOrder "
    }
    if (length){
        query += `LIMIT ${length}`;
    }
    if (offset){
        query += `OFFSET ${offset}`;
    }
    db.many(query).then((data)=>{
        res(data);
    }).catch(()=>{
        rej();
    })
})

const saveTag = (tag) => new Promise((res,rej) =>{
    if (!tag.sortOrder){
        tag.sortOrder = null;
    }
    db.none('INSERT INTO Tag VALUES (name = $(name),sortOrder = $(sortOrder))',
    {
        name:tag.name,
        sortOrder:tag.sortOrder
    }).then(()=>{
        res();
    })
    .catch(()=>{
        rej();
    })
})


module.exports = {getTagsForUser,saveTag}