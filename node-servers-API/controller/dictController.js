const dictService = require('../service/dict')


async function getDicDataControll(ctx,next){
    return ctx.response.body = await dictService.getDictData();
}



module.exports = {
    getDicDataControll,
}