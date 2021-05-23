const postService = require('../service/post')


async function getPostData(ctx,next){
    return ctx.response.body = await postService.getpostDataServer();
}



module.exports = {
    getPostData
}