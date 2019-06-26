---
title: 使用yrm切换yarn源
---

如果你常用的包管理器是 `yarn`, 那么可以使用 `yrm` 切换 `yarn` 源。

### 安装
``` sh
# 通过 npm安装
npm install -g yrm

#通过yarn安装
yarn global add yrm
```

### 使用

`yrm ls` 可以查看当前可选的源。

``` sh
yrm ls

* npm ---- https://registry.npmjs.org/
  cnpm --- http://r.cnpmjs.org/
  taobao - https://registry.npm.taobao.org/
  nj ----- https://registry.nodejitsu.com/
  rednpm - http://registry.mirror.cqupt.edu.cn/
  npmMirror  https://skimdb.npmjs.com/registry/
  edunpm - http://registry.enpmjs.org/
  yarn --- https://registry.yarnpkg.com
```

带`*` 的为当前使用的源。

### 切换
npm 源管理器最核心的功能便是帮助我们快速的切换源。比如，我们需要切换到 taobao 的源地址，只需要
`yrm use taobao`，后续你运行 npm相关命令，都会使用 taobao 源。
``` sh
yrm use [name]
```

### 增加

增加定制的源:
``` sh
yrm add [name] [url]
```
* `name`: 源名称;<br />
* `url`: 源路径;


### 删除

``` sh
yrm del [name]
```

### 测试源速度
``` sh
yrm test [name]
```

### 增加 wehotel 私有npm 源

``` sh
yrm add wehotel http://10.237.149.220:4873
```
