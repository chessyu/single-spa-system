# 微前端项目

> 可参考、可实践、可上线

## 介绍
这个项目是一个微前端架构的项目，线上预览[点我](http://120.79.143.23:2001/)用到两个库：
 1.模块加载器[SystemJS](https://github.com/systemjs/systemjs)是基于标准的可挂钩的模块加载器.
 2.前端微服务的javascript框架[single-spa](https://single-spa.js.org/)，所用技术是 Vue ，后期会把 React 也一起引入.


::: tip
* platform 平台容器，管理着子系统的菜单和权限，承载着 N 多个子系统
* node-servers-API 模拟后台的接口
* childrenSys-A 子系统A
* commonMoules 这是所有系统所用到的公共资源存放的目录
:::

## 运行
运行项目前，有一个地方请先修改成你本机的`ip地址`找到文件： `~/single-span-system/platform/public/system.js` 
![](https://chessyu.github.io/single-A.png)

> 运行子系统时有两启动命令，基于平台容器进行访问：`yarn serve:test`。独立访问： `yarn serve`  
``` sh
// 进入后台接口目录 启动项目
cd ~/single-span-system/node-servers-API
yarn serve

//进入平台容器项目 启动项目
cd ~/single-span-system/platform
yarn serve
//访问地址：localhost:2000


//进入子系统A项目 启动项目
cd ~/single-span-system/childrenSys-A
yarn serve:test
// 基于平台容器进行访问
//如果想独立运行和访问，执行 ：yarn serve   访问地址：localhost:5004
```




