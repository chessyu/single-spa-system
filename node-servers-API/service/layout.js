const sqlActions = require('../lib/mysql');

/**获取有权限的子系统 */
async function getChildrenSys(){
    let sql = `select * from menu where status=1`;
    return sqlActions.sqlActions(sql).then(res => {
        return {
            msg:"获取成功",
            code:200,
            data:res
        }
    });
}

module.exports = {
    getChildrenSys,
}