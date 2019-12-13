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

### 事件通信

微前端事件通信模块，主要处理 主应用与子应用、子应用与子应用间的数据通信。

**两种获取 获取微前端事件通信的方法：**

* **this.$microEvent**

  在主应用与子应用下均可使用。

* **microEvent()**

  ```js
  import { microEvent } from '@bestwehotel/micro-front-end';

  microEvent().on('demo', function(data){});
  ```

所有事件均支持注册多个监听。

**API**

- `this.$microEvent.on(handleName, handler, flag)`

  事件注册方法，该方法可以在任意应用中添加，可以被 emit、waitEmit 的不同机制触发。

  - `handleName`:  事件名称
  - `handler`:  事件回调，参数为 emit方法传入的`data`
  - `flag`:   注册监听标记符，当子应用从微前端完全卸载时，需要通过标记符卸载子应用的注册事件，标记符必须是 **子应用名称** 。在通过 `namespace(microName)` :  创建子应用命名空间的事件模块时，`flag`默认为传入的 `microName`。

- `this.$microEvent.onBefore(handleName, handler, flag)`

  注册事件触发前置钩子，该钩子会在 `on`注册事件被触发前触发，并且最好在 `on` 方法定义之前定义。

  - `handleName`:  事件名称，与需要前置处理的事件保持名称一致，内置前置钩子

    `default`，对所有事件有效

  - `handler`:  事件回调

- `this.$microEvent.onAfter(handleName, handler, flag)`

  注册事件触发后置钩子，该钩子会在`on`注册事件被触发后触发，并且最好在 `on`方法定义之前定义。

  - `handleName:`  事件名称，与需要前置处理的事件保持名称一致，内置前置钩子

    `default`，对所有事件有效

  - `handler`:  事件回调

  

- `this.$microEvent.once(handleName, handler)`

  注册一次事件，该事件只执行一次，完成后被删除。

  

- `this.$microEvent.emit(handleName, data, option)`

  事件派发，向所有监听派发事件。

  - `handleName`:  事件名称
  - `data`: 派发的数据
  - `option` :  `{object}`  配置
    - `wait` ：延迟事件派发，直到有事件监听注册进来后派发事件，已注册的监听会直接出发。默认值为 `false`，不延迟派发，`once`只延迟派发一次，对下一个注册的监听直接触发，后续注册的监听不触发，`all` 最后续的注册监听都会直接触发。

  

- `this.$microEvent.waitEmit(handleName, data, wait)`

  延迟派发事件的别名方法。

- `this.$microEvent.namespace(microName)`

  通过命名空间创建事件模块，拥有事件模块的所有方法，当前命名空间的事件模块不可触发其他命名空间的事件，但可以通过`this.$microEvent.emit()` 触发。

**延迟派发指的是，允许 注册事件监听在派发之后。派发之后注册是事件也可以被最后一次派发的触发执行。**

**场景示例**

1. 子应用向主应用发起事件通信，由于主应用必然早于子应用完成加载执行，

   ``` js
   // 主应用
   this.$microEvent.on('logout', data => {
       logout();
   });
   // 子应用
   this.$microEvent.emit('logout');
   ```

2. 主应用向子应用派发事件，在这个场景下，子应用可能还未加载进行实例化，可以通过延迟方式进行事件派发。

   ``` js
   // 主应用 向所有子应用发送 token
   this.$microEvent.waitEmit('token'， {token}, 'all');
   // 子应用
   this.$microEvent.on('token', data => {
       console.log(data.token);
   }, 'microName');
   ```

3. 子应用 向 子应用 派发事件

   ``` js
   // 子应用 A
   this.$microEvent.waitEmit('send-B', data);
   // 子应用 B
   this.$microEvent.on('send-B', data => {
       console.log(data);
   }, 'B');
   ```

4. 通过命名空间创建事件模块

   ``` js
   // 子应用 A 的私有事件模块
   const eventA = this.$microEvent.namespace('A');
   
   // 此时的事件名称为 A/demo
   eventA.on('demo', data => {});
   // 触发的事件名称为 A/demo
   eventA.emit('demo');
   
   // 你也可以在子应用B中获取子应用A的私有事件模块
   // 这样可以在两个子应用之间建立独享的事件通讯
   // 子应用B
   const eventA = this.$microEvent.namespace('A');
   eventA.on('A.name', data => {
       console.log(data);
   });
   // 子应用A
   const eventA = this.$microEvent.namespace('A');
   eventA.waitEmit('A.name', {name: 'A'});
   
   ```

**高级用法**

待补充

### 内置模块：`@bestwehotel/name-chunk-ids-webpack-plugin`

发布于私有npm。（[私有npm使用](/npm/)）

@bestwehotel/name-chunk-ids-webpack-plugin](http://cnpm.bestwehotel.net:7002/package/@bestwehotel/name-chunk-ids-webpack-plugin)

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
