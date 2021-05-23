

const {POST} = require('../mock/post')

/** 获取系统菜单数据 */
async function getpostDataServer(){
    let relust = {};
    relust.code = 200;
    relust.msg = '操作成功';
    relust.data = POST;
    relust.total = POST.length;
    return relust;
}



module.exports =  {
    getpostDataServer,

}