---
title: 使用nrm切换npm源
---

### nrm

`nrm` 是一个npm源管理器，可以快速的切换npm源。

### 安装
``` sh
npm install -g nrm
```

### 使用

`nrm ls` 可以查看当前可选的源。

``` sh
nrm ls

* npm ---- https://registry.npmjs.org/  # 当前使用的源
  cnpm --- http://r.cnpmjs.org/
  taobao - https://registry.npm.taobao.org/
  nj ----- https://registry.nodejitsu.com/
  npmMirror  https://skimdb.npmjs.com/registry/
  edunpm - http://registry.enpmjs.org/
```

带`*` 的为当前使用的源。

### 切换
npm 源管理器最核心的功能便是帮助我们快速的切换源。比如，我们需要切换到 taobao 的源地址，只需要
`npm use taobao`，后续你运行 npm相关命令，都会使用 taobao 源。
``` sh
nrm use [name]
```

### 增加

增加定制的源:
``` sh
nrm add [name] [url]
```
* `name`: 源名称;<br />
* `url`: 源路径;


### 删除

``` sh
nrm del [name]
```

### 测试源速度
``` sh
nrm test [name]
```

### 增加 wehotel 私有npm 源

``` sh
nrm add wehotel http://10.237.149.220:4873
```
