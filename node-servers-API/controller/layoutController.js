const layoutService = require('../service/layout')


async function getChildrenControll(ctx,next){
    console.log(ctx)
    return ctx.response.body = await layoutService.getChildrenSys();
}


module.exports = {
    getChildrenControll,
}