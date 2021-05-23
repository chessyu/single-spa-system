const roleService = require('../service/role')


async function getRoleData(ctx,next){
    return ctx.response.body = await roleService.getRoleDataServer();
}



module.exports = {
    getRoleData
}