---
title: 微前端
---

## 介绍

### 概念

**微前端**是web应用开发的一种思想，在一个`大型的web应用`中，不同的业务功能为不同的`子应用`，每个子应用可以有`独立团队`进行`独立开发`、独立测试、`独立部署`、由`主应用`聚合为一个完整的web应用。

### 架构图

当一个用户，通过一个链接，访问时，会先加载我们的主应用，主应用完成加载，触发微前端路由，微前端路由会监管链接，查找路由，检查该路由下是否有子应用，然后，通知给应用加载器，加载子应用资源，然后返回给到主应用进行实例化渲染，最后展示在用户面前。

![](/docs/micro_1.jpeg)

在微前端中，由于业务线都被拆分为一个个子应用，所以在关系图中，每个子应用，都可以由独立的团队进行开发维护，然后再将子应用聚合到主应用，而主应用也由独立团队进行开发维护。

![](/docs/micro_2.jpeg)

* **主应用**

  主应用是一个普通的web应用。主应用上会集成微前端的子应用容器，以及微前端的核心实现，通过微前端的策略加载，渲染子应用。

* **子应用**

  子应用是一个普通的web应用。是每个独立的业务线或者独立的业务功能的web应用， 注册为微前端的一个子应用，子应用会通过微前端的策略进行注册。

* **微前端路由**

  一个路由是可以划为多级的，在目前实现的微前端解决方案中，通过使用一级路由，主应用的微前端路由，监管一级路由。在关系上，一个子应用对应一个一级路由，且具有唯一性，一对一的关系，子应用间不可共用同一个一级路由。然后次级路由，则由各个应用内部各自管理即可。在路由的初始化，或者监听到路由变化时，检查变化的路由在子应用映射表中是否存在对应的子应用，存在，则触发应用加载器。

* **应用加载器**

  应用加载器是内部是一个 资源加载器，加载对应的子应用的资源，通知子应用容器渲染子应用。

* **子应用容器**

  子应用渲染容器，子应用资源加载完毕后，获取子应用的相关配置，执行实例化，并在容器中进行渲染。

* **应用资源映射配置表**

  用于保存所有已注册的子应用的所有资源列表。 微前端路由、应用加载器通过配置表查找与加载子应用。
  ``` js
  [
      {
          library: 'subApp1',
          resource: {
              js: [ 'http://a.b.com/xx.js' ],
              css: ['http://a.b.com/xx.css']
          }
      }
  ]
  ```

## 优势

### 微前端解决的问题

- 业务线独立开发、独立测试、独立部署
- 主应用和子应用数据通信
- 资源加载优化
- 交互体验优化
- 降低复杂度
- 多团队协作

### 微前端的优势

- 适用于大型web前端项目
- 按需加载子应用
- 应用颗粒度可控
- 单页应用体验
- 业务解耦
- 开发、测试、发布具有独立性

## 使用

微前端已将开发框架集成一套解决方案：

1. 安装 [wehotel-cli](/packages/wehotelCli.html)
2. 添加主应用模板和子应用模板
   ``` bash
   # 添加主应用模板
   wehotel add WeHotelFE/wehotel-template-micro-fe-master
   # 添加子应用模板
   wehotel add WeHotelFE/wehotel-template-micro-fe-sub-app
   ```
3. 通过不同的模板创建主应用与子应用， 以下流程将会生成多个完整的前端项目

   **创建主应用**
   ``` bash
   # 创建主应用
   wehotel create <project-name>
   ```
   选择 `微前端主项目项目模板(master)` 模板，即可完成。

   **创建子应用**
   ``` bash
   # 创建主应用
   wehotel create <project-name>
   ```
   选择 `微前端子应用项目模板(Sub App)` 模板，输入子应用名称 即可完成。

4. 进入不同的项目，初始化并启动开发环境，即可在主应用或子应用中进行开发
   ``` bash
   npm install
   npm run dev
   ```

### 内置模块：`@bestwehotel/micro-front-end`

基于vue实现的微前端库。<br>
发布于 私有npm。 （[私有npm使用](/npm/)）

[@bestwehotel/micro-front-end](http://cnpm.bestwehotel.net:7002/package/@bestwehotel/micro-front-end)
``` bash
npm install -S @bestwehotel/micro-front-end
```
主应用： `index.js`
``` js
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import microFrontEnd from '@bestwehotel/micro-front-end';
import microConfig from './micro-front-end/config';

Vue.use(VueRouter);
Vue.use(microFrontEnd);

const router = new VueRouter();
microFrontEnd(router, microConfig);

App.router = router;
// eslint-disable-next-line no-new
new Vue({
    el: '#microApp',
    router,
    render: h => h(App)
});
```
子应用：`index.js`
``` js
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import microFrontEnd, {
    registerMicroApp,
    isMicroApp
} from '@bestwehotel/micro-front-end';

Vue.use(VueRouter);
Vue.use(microFrontEnd);

const router = new VueRouter();

App.router = router;
if (!isMicroApp()) {
    // eslint-disable-next-line no-new
    new Vue({
        el: '#app',
        router,
        render: h => h(App)
    });
}

registerMicroApp('microName', {
    Vue,
    appOption: {
        router,
        render: h => h(App)
    }
});
```

#### API

* **`microFrontEnd(router, microConfig)`**： 注册Vue插件与主应用初始化

  参数：
  - `router`: 路由示例，用于创建微前端路由
  - `microConfig`：子应用资源映射配置表

* **`registerMicroApp(microName, option)`** ：注册子应用

  参数：
  - `microName`：子应用名称
  - `option`： {Vue, appOption}，`Vue`当前子应用的Vue类,`appOption`用于实例化vue的参数配置

* **`isMicroApp()`**：判断是否是在微前端环境中

  `@return` {boolean}

#### vue实例化,注入方法

* **this.$isMicroApp** ：判断当前是否是微前端环境
* **this.$microRouter**

  微前端路由，只在主应用有效，主应用中切换子应用，应使用`this.$microRouter` 下的方法。<br>
  以下方法与 vueRouter 提供的方法完全一致:
  - `this.$microRouter.push()`
  - `this.$microRouter.replace()`
  - `this.$microRouter.go()`
  - `this.$microRouter.back()`
  - `this.$microRouter.forward()`

* **this.$getMicroConfig(\[microName\])** ：获取微前端应用配置<br>
  参数<br>
  microName: 子应用名称，不传则获取所有配置。

### 内置模块：`@bestwehotel/name-chunk-ids-webpack-plugin`

发布于私有npm。（[私有npm使用](/npm/)）

[@bestwehotel/name-chunk-ids-webpack-plugin](http://cnpm.bestwehotel.net:7002/package/@bestwehotel/name-chunk-ids-webpack-plugin)

用于微前端应用中，打包时，重命名所有 chunkId，目的是为了避免多个应用的chunk命名冲突，同时为 微前端卸载子应用提供支持。

chunkId = publicPath + chunkName + chunkHash + count

`webpack.config.js`:
``` js
const nameChunkIdsPlugin = require('@bestwehotel/name-chunk-ids-webpack-plugin');
module.exports = {
    plugins: [
        new nameChunkIdsPlugin()
    ]
}
```

## 部署

待补充
