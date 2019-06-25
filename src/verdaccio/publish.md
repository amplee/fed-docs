---
title: 创建私有包
---

发布私有包的流程其实与发布包到`npm`的流程是一样的。唯一需要做的是需要切换`npm`源到私有`npm`源。

详细信息请阅读 [NPM](https://www.npmjs.cn/getting-started/what-is-npm/)

关于如何快速切换`npm`源，请阅读 [使用nrm切换npm源](/verdaccio/nrm.html)。

以下流程，假定你已经了解，并为你本地切换源到私有`npm`。

## NPM用户

* 通过 `npm adduser` 注册你的npm账户, 首次注册自动登录。
* 通过 `npm login` 登录你的npm账户。
* 如果你不知道你当前登录的npm账号，你可以运行`npm whoami` 查看。

请不用为你的密码担心，私有npm的密码已通过 哈希算法加密并经过base64编码。

## 初始化

使用以下命令初始化你的私有包。
``` sh
npm init
```
并且你需要遵循 [私有包规范](/verdaccio/guide.html)。

## 发布
发布私有包很简单，只需要一个命令：
``` sh
npm publish
```

## 更新
当你的私有包有了变动，需要更新发布到私有npm仓库。

你必须变更你的包版本号。

你可以通过 `npm version <update_type>`更新你的包版本号，也可以直接修改`package.json`。
请遵循[semantic versioning](https://docs.npmjs.com/about-semantic-versioning)。

然后通过 `npm publish` 更新发布你的包。


关于卸载，`npm unpublish [<@scope>/]<pkg>[@<version>]` 从仓库中删除你的包。
