#!/bin/sh

#定义颜色
WHITE="\e[1;37m"
RED="\e[1;31m"
blue="\e[0;34m"
BLUE="\e[1;34m"
NC="\e[0m"

# 准备初始化环境
Prepare(){
    cwd=`dirname $(pwd)/${0}`
    packageJson="${cwd}/../package.json"
}

_Install(){

    if [ ! -f ${packageJson} ]
    then
        echo "文件[${packageJson}]不存在!!!";
        exit
    fi
    installType=$1
    buildDir="${cwd}/${installType}"
    nodeModulesTar="${buildDir}/node_modules.tar.gz"

    cd ${buildDir}

    if [ -f ${nodeModulesTar} ]
    then
        tar -xzf ${nodeModulesTar}
    fi

    cp -rf ${packageJson} ${buildDir}

    if [[ ${installType} == "pro" ]]
    then
        npm install --production --registry=https://registry.npm.taobao.org
    elif [[ ${installType} == "dev" ]]
    then
        npm install --registry=https://registry.npm.taobao.org
    fi

    tar -czf node_modules.tar.gz node_modules/
    rm -rf node_modules/
    rm -rf "${buildDir}/package.json"
}

#安装node_modules
InstallDev(){
    _Install "dev"
}

InstallPro(){
    _Install "pro"
}


Prepare
InstallDev
InstallPro