---
title: 使用私有包
---

## 项目中安装

在[规范](/npm/guide.html) 中我们提出了包名必须使用`scope package`, 其中一个目的是为了方便安装使用。

在你的项目根目录中，创建`.npmrc` 文件，并写入一下内容:
``` sh
@bestwehotel:registry=http://cnpm.bestwehotel.net:7001
```
这一行的作用是，`bestwehotel` 下的模块包，都从源`http://cnpm.bestwehotel.net:7001`获取。

如果你有自己的 `scope name`，则继续换行添加。

然后你可以使用`npm install` 安装私有包到你的项目中。

## 全局安装

关于全局安装，你需要切换npm源，请阅读 [使用nrm切换npm源](/npm/nrm.html)。

然后就可以使用`npm install -g` 安装私有包到你的全局环境中。
