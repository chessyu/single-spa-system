const businessService = require('../service/business')


async function getUserInfoControll(ctx,next){
    return ctx.response.body = await businessService.getUserData();
}


module.exports = {
    getUserInfoControll,
}