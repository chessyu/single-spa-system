const menuService = require('../service/menu')


async function getSystemDataControll(ctx,next){
    return ctx.response.body = await menuService.getSystemData();
}

async function getmenuListControll(ctx,nex){
    return ctx.response.body = await menuService.getMenuListData();
}

module.exports = {
    getSystemDataControll,
    getmenuListControll
}