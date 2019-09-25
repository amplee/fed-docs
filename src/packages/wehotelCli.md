---
title: wehotel-cli 模板生成工具
---

## wehotel-cli

### 介绍

wehotel 模板生成工具，通过交互式命令行，支持快速创建项目，支持在项目中，在多页应用中生成页面级模板，以及生成路由级模板。

* 基于模板，支持快速创建项目，以及通过多种级别的业务模板快速生成项目页面。
* 灵活的模板自定义开发，所有团队都可以根据模板开发规范，定制适合团队的模板。
* 基于gitlab托管模板仓库，并在本地创建模板缓存仓库，基于本地模板仓库快速生成，提供更新命令同步远程模板仓库。

### 安装

**全局安装**
``` sh
npm install -g @bestwehotel/wehotel-cli
```

### 使用

* **wehotel**

  全局安装后，将会添加 `wehotel`命令，你可以通过运行 `wehotel -h` 查看帮助

  ![wehotel_help](/docs/wehotel_help.png)

* **wehotel create \<project-name\>**

  `wetpl create` 将会引导你创建一个新的项目。

  支持通过提供的模板列表创建，同时支持自定义项目模板。

  ![wehotel](/docs/wehotel_demo.gif)

  **参数支持**
  1. `--cwd <cwd>`：设置创建项目的当前上下文，即创建项目的根目录
  2. `--force`：如果当前目录存在，配置此项会清空目录

* **wehotel page \<page-name\>**

  当前命令尚不支持，正在开发中

* **wehotel router \<router-name\>**

  当前命令尚不支持，正在开发中

* **wehotel init**

  初始化 `wehotel-cli`，首次安装时默认会初始化项目，如果你需要重置wehotel配置，可以运行`wehotel init`重新初始化。

  其中`git`配置项，将会引导你选择使用 广州gitlab 或者 上海gitlab，（由于团队不同，模板远程仓库存放可能地址不同），`git` 配置项设置默认的模板拉取地址以及拉取方式。

* **wehotel add \<template-name\>**

  从gitlab拉取新的模板仓库，添加新的模板到`wehotel-cli`工具中。

  `template-name` 模板名称

  **参数支持**
  1. `-g, --git <git-url>` : 配置git拉取地址。可选值：gzGit | shGit | github | [host]。
  2. `-p, --protocol <protocol>`: 配置git拉取方式。可选值： http | ssh。
  3. `-l, --local <template-local-path>` : 添加本地模板到 `wehotel-cli`，`<template-local-path>` 模板所在目录。

* **wehotel update \<template-name\>**

  从远程仓库同步模板到`wehotel-cli`。

  `<template-name>` 需要更新的模板名称。 如果为 `all`，则同步所有已添加的远程模板。

* **wehotel config [type] [key] [value]**
  设置，读取配置信息。
  - `wehotel config` 命令返回可配置的配置项。
  - `wehotel config set [key] [value]` 设置配置项
  - `wehotel config get [get]` 获取配置项

## 模板

### 默认模板

* **项目级别模板**

  * `wehotel-template-admin-vue` PC端B端管理应用项目模板

    - 基于 webpack4的构建环境
    - 基于vue
    - 支持生成单页应用/多页应用
    - 支持可选的 `vue-router`、`routerMode`，`vuex`
    - 集成`element-ui`
    - 使用 scss作为css预编译语言
    - 集成 `eslint`,`stylelint`

  * `wehotel-template-mobile-vue` 移动端C端应用项目模板

    - 基于 webpack4的构建环境
    - 基于vue
    - 支持生成单页应用/多页应用
    - 支持可选的 `vue-router`、`routerMode`，`vuex`
    - 使用 `vw` 作为长度单位
    - 使用 scss作为css预编译语言
    - 集成 `eslint`,`stylelint`

### 开发自定义模板

* **模板目录结构**
  ``` sh
  .
  ├── generator.js # 模板生成，渲染引擎配置
  ├── package.json # 模板包配置文件
  ├── prompt.js # 模板自定义交互对话
  ├── readme.md # 模板使用说明
  └── template # 模板文件目录
  ```
