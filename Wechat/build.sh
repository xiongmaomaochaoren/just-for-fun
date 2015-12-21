#!/bin/sh

# 1. 解压node-package dev中的依赖资源包、copy到根目录node_modules中 (编译时环境)
# 2. 执行gulp deploy 编译、打包、部署 前端资源
# 3. 解压pro中的 node_modules.tar.gz , copy到server中(运行时环境)
# 4. 整体生成一个tar包

