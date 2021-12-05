const pgp = require("pg-promise")(/*options*/);
const config = require('../config.json');

var username = config.db.login;
var password = config.db.password;
var host = config.db.host;
var port = config.db.port;
var database = config.db.database;

const cn = {
    host: host,
    port: port,
    database: database,
    user: username,
    password: password,
};

var db = pgp(cn);
var errors = pgp.errors;
if (errors){
    console.log(errors);
}


module.exports = db;