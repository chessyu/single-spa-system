#!/usr/bin/env node

const program = require('commander');
// const path = require('path')


program
    .version(`
    __                                        __                      __ 
    /  |                                      /  |                    /  |
   _$$ |_     ______    ______   _____  ____  $$/  _______    ______  $$ |
  / $$   |   /      \  /      \ /     \/    \ /  |/       \  /      \ $$ |
  $$$$$$/   /$$$$$$  |/$$$$$$  |$$$$$$ $$$$  |$$ |$$$$$$$  | $$$$$$  |$$ |
    $$ | __ $$    $$ |$$ |  $$/ $$ | $$ | $$ |$$ |$$ |  $$ | /    $$ |$$ |
    $$ |/  |$$$$$$$$/ $$ |      $$ | $$ | $$ |$$ |$$ |  $$ |/$$$$$$$ |$$ |
    $$  $$/ $$       |$$ |      $$ | $$ | $$ |$$ |$$ |  $$ |$$    $$ |$$ |
     $$$$/   $$$$$$$/ $$/       $$/  $$/  $$/ $$/ $$/   $$/  $$$$$$$/ $$/                                                                          
    `,'-V,  --version',"当前版本")
    .command('create <spa-app-name>')
    .description('初始化子系统项目')
    .action((source, destination)=>{
        require('../lib/create.js')(source, destination)
    });



    program.parse(process.argv);