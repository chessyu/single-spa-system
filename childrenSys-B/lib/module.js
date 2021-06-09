/**
 * 生成模块目录
 */

 const {run} = require('runjs')
const path = require('path')


async function createModule(fileName){
    run(`mkdir  ${path.resolve(__dirname,'../src/api/'+ fileName.moduleName)}`)
    run(`mkdir  ${path.resolve(__dirname,'../src/view/'+ fileName.moduleName)}`)
    run(`mkdir  ${path.resolve(__dirname,'../src/component/'+ fileName.moduleName)}`)
}

 module.exports = (...args)=>{
    return createModule(...args)
}