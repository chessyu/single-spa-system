

const {DICT} = require('../mock/dict')

/** 获取系统菜单数据 */
async function getDictData(){
    let relust = {};
    relust.code = 200;
    relust.msg = '操作成功';
    relust.data = DICT;
    relust.total = DICT.length;
    return relust;
}



module.exports =  {
    getDictData,

}