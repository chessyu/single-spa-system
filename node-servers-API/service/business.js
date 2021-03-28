

const {USER} = require('../mock/user')

/** 获取系统菜单数据 */
async function getUserData(){
    let relust = {};
    relust.code = 200;
    relust.msg = '操作成功';
    relust.data = USER;
    relust.total = 10;
    return relust;
}

module.exports =  {
    getUserData

}