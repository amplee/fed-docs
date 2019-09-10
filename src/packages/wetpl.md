---
title: wetpl 模板生成工具
---

### 介绍

wetpl 模板生成工具，通过交互式命令行，支持快速创建项目，支持在项目中，在多页应用中生成页面级模板，以及生成路由级模板。

### 安装

**全局安装**
``` sh
npm install -g @bestwehotel/we-template-cli
```

**项目内安装**
``` sh
npm install -D @bestwehotel/we-template-cli
```

推荐使用全局安装模式。

### 使用

![wetpl](/wetpl_demo.gif)

* **wetpl**

  全局安装后，将会添加 `wetpl`命令，你可以通过运行 `wetpl` 启动本工具。

* **wetpl create \<project name\>**

  `wetpl create` 将会引导你创建一个新的项目。

  支持通过提供的模板列表创建，同时支持自定义项目模板。

  - 支持生成 单页应用&多页应用
  - 支持添加`vue-router`以及选择router模式
  - 支持添加`vuex`

* **wetpl page \<page name\>**

  `wetpl page` 将会引导你在一个多页应用的项目中，根据模板生成页面。

  - 支持添加`vue-router`以及选择router模式
  - 支持添加`vuex`

* **wetpl router**

  当前命令尚不支持，正在开发中

* **正在添加更多的支持**