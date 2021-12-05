const {QueryFile , errors} = require('pg-promise');
const fs = require('fs');
const db = require('./db');
const path = require('path');

function apply(){
    var folder = './database/migrations/';
    fs.readdir(folder, (err, files) => {
        
        if (err){
            console.log(err);
        }

        if (!files){
            console.log(files);
        }

        var promise;
        files.forEach(file => {
            const fullPath = path.join(folder, file); 
            const queryFile = new QueryFile(fullPath, {minify: true});
            
            if (promise){
                promise = promise.then(()=>{
                    db.none(queryFile).then().catch((err)=>{
                            console.error(err);
                    });
                })
            }
            else{
                promise = db.none(queryFile).then().catch((err)=>{
                        console.error(err);
                });
            }
            
        });
    });  
}

module.exports.apply = apply;