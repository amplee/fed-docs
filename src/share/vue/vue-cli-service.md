## 前言

本文主要是讲解 vue开发标准工具 `@vue/cli` ，其中的`cli-service` package。分析`vue-cli-service` 命令行，在启动时，内部的运行机制。以及 vue-cli-service提供的插件机制、注册自定义命令行，以及`vue.config.js` 配置文件的实现机制，并从零搭建一个简单版本的 `vue-cli-service` ，帮助大家理解，更好的使用`vue-cli-service`。

> 备注：关于 `@vue/cli` 中 `cli` package 的实现机制，感兴趣的可以留言评论，我会在以后的时间中，在新的文章中进行分享。

## 一、概述
`@vue/cli` 是我们在开发基于 vue库的前端应用时，经常会使用到的一个 vue标准开发工具，它提供了非常丰富强大的命令行工具，通过交互式命令行的形式，动态的快速的生成一个 基于vue的前端项目。


在我们在 `@vue/cli`创建的前端项目中，查看`package.json` 文件时，我们可以看到以下内容（部分忽略）：
``` json
{
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
  "devDependencies": {
    "@vue/cli-service": "~4.2.0",
  }
}
```
我们可以从[官方文档](https://cli.vuejs.org/zh/guide/cli-service.html) 中查看到如下描述：

> 在一个 Vue CLI 项目中，`@vue/cli-service` 安装了一个名为 `vue-cli-service` 的命令。你可以在 npm scripts 中以 `vue-cli-service`、或者从终端中以 `./node_modules/.bin/vue-cli-service` 访问这个命令。

即，`@vue/cli-service`在项目中，安装了`vue-cli-service` 的命令行，这个命令行又提供了`serve`,`build`,`lint`等参数，实现不同的功能。

* **vue-cli-service serve**

  启动一个开发服务器 (基于 [webpack-dev-server](https://github.com/webpack/webpack-dev-server))

* **vue-cli-service build**

  在 `dist/` 目录产生一个可用于生产环境的包，带有 JS/CSS/HTML 的压缩，和为更好的缓存而做的自动的 vendor chunk splitting。

* **其他命令行可自行查看[官方文档](https://cli.vuejs.org/zh/guide/cli-service.html)**

那么，`vue-cli-service` 内部到底做了什么事？它是如何启动开发服务器？如何构建生产包？它还提供了哪些功能？`@vue/cli-service` 是如何安装`vue-cli-service`命令到项目中的？ 接下来，我们将从源码剖析，深入了解`@vue/cli-service`。


> 1. 文章中出现的代码，并不完全截取自源码，部分代码为了方便说明解释，做了一些修改，请勿直接复制代码直接运行。
> 2. 在开始剖析`@vue/cli-service`前，你需要对以下内容有所了解。文章对以下模块，默认你已了解，不再做详细阐述。
>    - [webpack](https://www.webpackjs.com/)
>    - [webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server)
>    - [webpack-chain](https://www.npmjs.com/package/webpack-chain)
>    - [Commander](https://www.npmjs.com/package/commander)
>    - [minimist](https://www.npmjs.com/package/minimist)
>    - [npm-bin](https://www.npmjs.cn/files/package.json/#bin)

## 二、源码目录说明

通过查看[@vue/cli-service源码](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-service) 我们可以看到如下项目结构（部分忽略）：

``` sh
.
├── bin
│   └── vue-cli-service.js # 注入 vue-cli-service 命令
├── lib
│   ├── PluginAPI.js # 插件
│   ├── Service.js # cli-service 入口
│   ├── commands # 注入指令
│   ├── config  # webpack配置
│   ├── options.js # vue.config.js 配置描述
│   ├── util
│   └── webpack # webpack 相关 loader/plugin
└── package.json
```

在这个项目中，我们将重点关注的代码文件如下：

- `bin/vue-cli-service.js` ：注入 vue-cli-service 命令
- `lib/Service.js` : 入口文件
- `lib/PluginAPI` : 插件体系核心模块

为了便于理解内容，文章将会拆分为以下内容：

- 注入 `vue-cli-service` 命令行
-  初始化Service 
- 启动Service
- 插件机制
- vue.config.js

从零开始，说明 `vue-cli-service` 的内部实现，以及它到底做了什么。

## 三、源码剖析

### 注入 `vue-cli-service` 命令行

通过 [npm-bin](https://www.npmjs.cn/files/package.json/#bin) ，我们可以知道，`npm`提供了注入自定义命令指令的能力，只需要在包的`package.json`文件中，配置`bin` 字段即可。

在`@vue/cli-service` 包中，我们可以看到 `package.json`：

```json
{
  "bin": {
    "vue-cli-service": "bin/vue-cli-service.js"
  }
}
```

从这里我们可以很清晰的知道，执行`vue-cli-service` 命令行时，将会调用的`lib/vue-cli-service.js`。

继续查看 `lib/vue-cli-service.js`源码(部分忽略)：

``` js
const Service = require('../lib/Service')
const service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd())

const rawArgv = process.argv.slice(2)
const args = require('minimist')(rawArgv, {
  boolean: [
    // build
    'modern',
    'report',
    'report-json',
    'inline-vue',
    'watch',
    // serve
    'open',
    'copy',
    'https',
    // inspect
    'verbose'
  ]
})
const command = args._[0]

service.run(command, args, rawArgv).catch(err => {
  process.exit(1)
})
```

在这个文件中， 加载了一个 `Service`的类，并进行实例化，通过`minimist` 获取命令行参数，然后 执行`service.run()`。

到这里，`@vue/cli-service` 就完成了注入`vue-cli-serivce` 命令，而`vue-cli-service.js` 中，`service.run()` 究竟运行了什么，我们需要进一步到`lib/Service.js` 中了解。

### 初始化Service

我们把目光聚焦到 [`lib/Service.js`](https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-service/lib/Service.js) 。`lib/Service.js` 既是`@vue/cli-service` 的入口文件，也是核心模块。

该文件暴露了一个 `Service` 类，在`constructor` 中如下：

```js
module.exports = class Service {
  constructor (context, { plugins, pkg, inlineOptions, useBuiltIn } = {}) {
    process.VUE_CLI_SERVICE = this
    this.initialized = false
    this.context = context
    this.inlineOptions = inlineOptions
    this.webpackChainFns = []
    this.webpackRawConfigFns = []
    this.devServerConfigFns = []
    this.commands = {}
    // Folder containing the target package.json for plugins
    this.pkgContext = context
    // package.json containing the plugins
    this.pkg = this.resolvePkg(pkg)
    // If there are inline plugins, they will be used instead of those
    // found in package.json.
    // When useBuiltIn === false, built-in plugins are disabled. This is mostly
    // for testing.
    this.plugins = this.resolvePlugins(plugins, useBuiltIn)
    // pluginsToSkip will be populated during run()
    this.pluginsToSkip = new Set()
    // resolve the default mode to use for each command
    // this is provided by plugins as module.exports.defaultModes
    // so we can get the information without actually applying the plugin.
    this.modes = this.plugins.reduce((modes, { apply: { defaultModes }}) => {
      return Object.assign(modes, defaultModes)
    }, {})
  }
}
```

* **实例化参数**

  首先我们关注到实例化`Service`时 传入的`context` 参数，在`bin/vue-cli-service.js`中，可以看到

  ``` js
  const service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd())
  ```

  `vue-cli-service` 在启动时，传入的`context`参数，值为 `process.env.VUE_CLI_CONTEXT || process.cwd()`。

  其中`process.env.VUE_CLI_CONTEXT`我们暂时忽略，这个参数主要是提供给`node`调用时的配置。 `process.cwd()` 返回的是一个系统路径，实际上，在我们执行 `vue-cli-service` 时， `process.cwd()`返回的就是当前执行命令的所在的目录。

  ```sh
  /code/vue-demo $ node
  > process.cwd()
  '/code/vue-demo'
  ```

  在`Service.js`中，`this.context = context` ，定义了当前命令行的执行上下文，这里指向的，就是运行命令行的所在项目目录。`context` 参数使用到 `Service` 各个场景。

* **初始化**

  在`constructor`中，我们继续分析关键实例属性的作用：

  `webpackChainFns` 和 `webpackRawConfigFns` ，我们可以从名词上很轻易的理解到，这两个属性是跟 `webpack` 相关的， 这两个属性，是跟 `webpack Config` 相关的，我将会在[ Service中的webpack](# Service中的webpac)中 再做分析。

  `devServerConfigFns` 跟 开发环境服务器配置相关。

  `commands` 用于管理 指令，包括内置的 `serve`、`build` 等指令，都是挂载在这个实例属性中。

  `plugins` 用于挂载 项目加载的各个 `@vue/cli` 插件， 会自动从 项目的`package.json`中，寻找`vue-cli-plugin-*` 格式的 依赖包，并自动加载。

  `modes` 与命令行参数`--mode` 相关。（关于mode，感兴趣可以查看源码，本文章不涉及相关内容）

### 启动Service

