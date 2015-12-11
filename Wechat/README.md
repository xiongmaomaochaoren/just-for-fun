
# 前后端分离具体推进方案

## 分期推进方案

## 一期方案细化

### 开发

#### 目录结构

### 提测

完整流程

    下载仓库代码
    下载node_modules : 独立git或者现有git独立目录、shrinkwrap固定版本
        client
            dev
            pro
        server
            dev
            pro
    copy node_modules ： 是否需要提供Linux build版本、或者只是源码，打包前执行rebuild
    编译client端代码 ： gulp + webpack
    生成最终tar包

        发布测试机、或者备机

     部署代码、重启Node Server


#### 关键问题

* 环境依赖 ： Node.js、PM2
* 流程化脚本 ：

    build.sh ： 实现完整编译流程、生成tar包
    Node Server命令 ： 启动服务器重启、热启动等命令


* node_modules 资源包管理 ： 前端编译工具、前端运行时模块、Server端运行时模块

### 上线

#### 环境依赖 ： Node.js

#### 线上Server部署方案

#### 监控、报警
