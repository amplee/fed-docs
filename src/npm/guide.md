---
title: 规范
---

**为了方便管理，发布、安装 私有包，在创建私有包时，请遵循以下规范。**

## `package.json`

一个完整的 `package.json`， 应至少包含以下信息：
``` json
{
  "name": "@bestwehotel/<package>", // 包名
  "version": "1.0.0", // 版本
  "description": "", // 包描述
  "main": "index.js", // 入口文件
  "scripts": {
    "test": ""
  },
  "repository": { // 包地址
    "type": "git",
    "url": "git+[url]"
  },
  "homepage": "", // 包主页
  "keywords": [], // 包关键字
  "author": "wehotel", // 包作者
  "license": "ISC"
}
```

* **命名 `name`**

  所有的私有模块都应该是 `scoped package`。

  `scope` 是 npm 的新特性，如果一个模块的名字以`@`开始，那么它就是一个`scoped package`。`scope` 就是 `@`与 `/` 之间的部分。
  `scope` 为私有模块提供了友好的支持，在创建企业内部的私有模块时，应使用`scoped package`定义包名。

  1. 命名规则：所有包应遵循 `@*/*` 的命名规则;
  2. 如果该模块属于通用模块，适合在企业内部，多部门间使用，应使用 `@wehotel/*` 作为命名规则，一般多数模块都应使用该规则进行命名；
  3. 如果属于部门内部使用的业务模块，可以定义一个属于部门内部的 `scope name`，并使用 `@scopeName/*` 作为命名规则，请谨慎使用此规则，一般不推荐以单个部门作为`scope name`；

  例子：<br/>
  有一个通用的 `utils` 模块， 那么应该命名为 `@wehotel/utils`。

* **版本号 `version`**

  私有模块都应有自己的版本号， 且必须遵循 [semver](https://www.npmjs.cn/misc/semver/);

* **包描述 `description`**

  请为你的模块做简要的描述，以方便了解包的用途，适用场景等。

* **入口文件 `main`**

  包入口文件是必须的。

* **命令行 `scripts`**

  非必须，请根据私有模块的场景定义。

* **包地址 `repository`**

  本私有npm仓库只提供了存储以及快速发布快速安装的功能，但每个包最好还是存放到`gitlab` 仓库中作为备份或者存储仓库。<br/>
  一般在你通过`git`创建一个仓库后，再创建 `npm init` 初始化模块，`repository`将会自动生成。如果未自动生成，请手动添加该属性。
  ``` json
  {
    "repository": { // 包地址
      "type": "git",
      "url": "git+[url]"
    },
  }
  ```
  `url` 即为git仓库地址

* **包主页 `homepage`**

  如果有，请写上。

* **关键字 `keywords`**

  随着后续包的增多，关键字可以更好的搜索到你的模块。

* **作者 `author`**

  你应该给你自己的包署上你的名字。

* **协议 `license`**

   协议请参照 [SPDX](https://spdx.org/licenses/)。

* **其他**

  其他信息，请遵循 [npm-config](https://www.npmjs.cn/misc/config/) 添加。
