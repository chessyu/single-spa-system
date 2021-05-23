

const {ROLE} = require('../mock/role')

/** 获取系统菜单数据 */
async function getRoleDataServer(){
    let relust = {};
    relust.code = 200;
    relust.msg = '操作成功';
    relust.data = ROLE;
    relust.total = ROLE.length;
    return relust;
}



module.exports =  {
    getRoleDataServer,

}