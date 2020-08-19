const fs = require('fs');
const path = require('path');
//解析需要遍历的文件夹，我的changName.js和27670326文件夹是同一个目录，27670326文件夹就是我要处理的文件夹

const filePath = path.join(__dirname,'../src');
const name = ['.vue','.html']; 

//调用文件遍历方法
fileDisplay(filePath);
 
/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath){
//   console.log(8977)
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath,function(err,files){
        if(err){
            console.warn("错误信息",err)
        }else{
            //遍历读取到的文件列表
            files.forEach(function(filename){
                //获取当前文件的绝对路径
                var filedir = path.join(filePath,filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir,function(eror,stats){
                    if(eror){
                        console.warn("错误信息",'获取文件stats失败');
                    }else{
                        var isFile = stats.isFile();//是文件
                        var isDir = stats.isDirectory();//是文件夹
                        if(isFile){
 
                            //这里请根据需要替换后缀名，我的是要把.blv替换成.flv
 
                            if(filedir.indexOf(name[0])!=-1){
                                filedir.replace(name[0],name[1])
                                rename(filedir,filedir.replace(name[0],name[1],function(){
                                }))
                            }
                        }
                        if(isDir){
                            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                })
            });
        }
    });
}
 
 
 
// 修改文件名称
function rename (oldPath, newPath) {
    fs.rename(oldPath, newPath, function(err) {
        if (err) {
            throw err;
        }
    });
}
