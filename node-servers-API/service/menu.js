

const {SYSTEM} = require('../mock/system')
const allMethods = require('../mock/meun')

/** 获取系统菜单数据 */
async function getSystemData(){
    let relust = {};
    relust.code = 200;
    relust.msg = '操作成功';
    relust.data = SYSTEM;
    relust.total = SYSTEM.length;
    return relust;
}

/** 获取所有菜单数据 */
async function getMenuListData(){
    let relust = {};
    let data = [];
    relust.code = 200;
    relust.msg = '操作成功';
    for(keys in allMethods){
        data = data.concat(allMethods[keys]);
    }
    relust.data = data;
    relust.total = data.length;
    return relust;
}

module.exports =  {
    getMenuListData,
    getSystemData

}