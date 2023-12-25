const mongoose = require('mongoose');

 class DBUtils {
    static connectionDB(dbUrl, dbName){
        return new Promise((resolve, reject)=>{
            mongoose.connect(dbUrl, {
                dbName: dbName
            }).then(()=>{
                resolve(`DataBase is now connected 👍👍`);
            }).catch((err)=>{
                if(err)
                    console.log(err);
                reject(`DB connection failed.`);
            })
        })
    } 
};


module.exports = DBUtils;