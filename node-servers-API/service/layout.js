const sqlActions = require('../lib/mysql');
const {SYSTEM} = require('../mock/system')
const {ORMMENU,CRMMENU,PFSMENU} = require('../mock/meun')

/**获取有权限的子系统 */
async function getChildrenSys(){
    // let sql = `select * from menu where status=1`;
    // return sqlActions.sqlActions(sql).then(res => {
    //     return {
    //         msg:"获取成功",
    //         code:200,
    //         data:res
    //     }
    // });
    let relust = {};
    relust.code = 200;
    relust.msg = '操作成功';
    relust.data = SYSTEM;
    return relust;
}

/** 获取系统菜单数据 */
async function getSystemMenu(menuId){
    let relust = {};
    relust.code = 200;
    relust.msg = '操作成功';
    if(menuId == 100) relust.data = PFSMENU;
    if(menuId == 101) relust.data = ORMMENU;
    if(menuId == 102) relust.data = CRMMENU;
    return relust;
}


module.exports = {
    getChildrenSys,
    getSystemMenu,
}