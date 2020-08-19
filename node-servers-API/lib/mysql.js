const mysql = require('mysql');
const DBconfig = require('../config/DBconfig')


/* 建立连接池 */

let linkPool = mysql.createPool(DBconfig);

/* 连接数据库 */

let sqlActions = (sql,value) => {
    return new Promise((resolve,reject) => {
        linkPool.getConnection(function(err,connection){
            if(err){
                console.log(err)
                reject(err);
            }else{
                console.log('数据库连接成功✔')
                connection.query(sql,value,(err,row) => {
                    if(err) reject(err);
                    resolve(row)
                    connection.release();
                })
            }
        })
    })
}


module.exports = {
    sqlActions
}








