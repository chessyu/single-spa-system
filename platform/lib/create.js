
const { run } = require('runjs')
const path = require('path')

async function create(source,cmd){
    run(`git clone git@github.com:chessyu/webApp.git ${path.resolve(__dirname,'../../'+source)}`)
}

module.exports = (...args)=>{
    return create(...args)
}