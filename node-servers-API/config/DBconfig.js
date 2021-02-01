/** 数据库连接配置 */

const database = {
    database:'single_spa_system',           //数据库名称
    user:'root',                           //sql 用户名
    password:'123456',                          //sql 用户密码
    PORT: '3306',                      //端口号
    host:"120.79.143.23",                    //服务器ip 
    connectionLimit: 1000,
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    timeout: 60 * 60 * 1000,
}

module.exports = database;