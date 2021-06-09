
const inquirer = require('inquirer');
const fs = require('fs');
const {resolve} = require('path');

async function create(source,cmd){
    inquirer
    .prompt([
        {
            type:'list',
            message:'选择创建模块类型',
            name:'moduleType',
            choices:['创建模块目录','创建模块文件'],
            prefix: "prefix"
        },
        {
            type:'input',
            message:`输入目录名称`,
            name:'moduleName',
            when:function(answers){
                return answers.moduleType == '创建模块目录';
            }
        },
        {
            type:'list',
            message:'请选择当前项目已有的目录',
            name:'hasModuleName',
            choices:function(answers){
                return (fs.readdirSync(resolve(__dirname,"../src/view/")).filter(e => e !== 'error' && e !== 'home' && e !== 'layout' && e !== 'login'));
            },
            when:function(answers){
                return answers.moduleType == '创建模块文件';
            }
        },
        {
            type:'input',
            message:`输入文件名称`,
            name:'fileName',
            suffix: "suffix",
            when: function(answers) { 
                return answers.moduleType == '创建模块文件';
            }
        }

    ])
    .then(answers => {
        if(answers.moduleType == '创建模块目录'){
            require('./module.js')(answers)
        }
        if(answers.moduleType == '创建模块文件'){
            require('./template.js')(answers)
        }

    });
}

module.exports = (...args)=>{
    return create(...args)
}