const layoutService = require('../service/layout')


async function getChildrenControll(ctx,next){
    return ctx.response.body = await layoutService.getChildrenSys();
}
async function getSystemMenuControll(ctx,next){
    let {projectId} = ctx.request.query;
    return ctx.response.body = await layoutService.getSystemMenu(projectId);
}

module.exports = {
    getChildrenControll,
    getSystemMenuControll,
}