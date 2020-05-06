---
title: vue-cli 插件指南
home: false
---

> [官方文档](https://cli.vuejs.org/zh/)
## 前言

`vue-cli` 是我们日常开发基于vue项目时， 经常会选用的开发工具。我们可以从 [官方文档](https://cli.vuejs.org/zh/) 中了解到，`vue-cli` 提供了非常灵活的丰富的强大功能。通过`vue-cli` 创建的项目，开箱即用，基本无需`eject`。

虽然 `vue-cli`开箱即用，但是在我们的项目开发中，出于项目本身的需求，或者技术选型，或者业务场景，或者项目优化，我们需要对项目进行记进一步的优化构建，调整配置，以符合我们的诉求。

通常情况下，我们通过配置项目中`vue.config.js` [官方文档](https://cli.vuejs.org/zh/config/#vue-config-js) 即可满足我们大部分的诉求，vue-cli内置的`webpack`模块，从启动、运行时、构建时、效率、性能等方面，做了很多的优化，同时也暴露了很多的配置项，使使用者能够灵活的根据自身项目需求进行调整。

抛开`vue.config.js` 提供的配置项（`vue.config.js` 仅作用于目标项目），我们还能使用`vue-cli` 做更多的事情。在 官方文档中，`vue-cli` 还提供了插件开发能力。这意味着，我们可以使用插件，扩展 `vue-cli`。

由此，我们开始思考以下问题：
- `vue-cli` 提供的插件能力是什么 ？
- 插件能够做什么？
- `vue-cli`的插件能力是如何实现的？
- 如何开发一个插件？

## `vue-cli` 插件



`vue-cli` 事实上是基于插件的架构的， 整个 `vue-cli` 实际上分为两个主要的模块：

- `@vue/cli`

  提供 用于创建项目、添加插件等命令，需要进行全局安装。

- `@vue/cli-service`

  提供 `vue-cli-service` 命令，用于开发环境，项目构建等，局部安装在项目中。

这两个主要模块，都是支持插件机制的。

为了方便，`@vue/cli`将被简要描述为`cli`，`@vue/cli-service` 将被简要描述为`service`。

我们所常见的vue插件，一般都包括 CLI插件和 Service插件。

- Service插件是提供给 `service`使用的，`service`实现了 内建命令、配置模块等功能，Service插件则是围绕着基于 `service` 的功能，在`service`初始化时加载的模块。
- CLI插件含义相对更广，CLI插件是一个可以为`cli` 项目添加额外特性的NPM包。它包含了Service插件，以及其他的内容。

## 插件能够做什么

CLI插件是一个可以为`cli` 项目添加额外特性的NPM包。那么也就是说，cli提供的是一个灵活的vue标准开发工具，我们可以根据项目的需要，安装、或者实现各种插件。

**插件提供的能力**

* **内建命令**

  以 `vue-cli-service` 为例，当我们抛开 `vue-cli-service` 内置的 `serve`, `build` 等命令，service 其实主要是实现了 内建命令、插件加载机制、配置模块等功能。 再通过 插件加载机制，实现注册命令、新增/修改配置等。

  即使 `vue-cli-service` 没有内置的`serve`, `build` 等命令，我们也可以通过service的插件，实现自定义的 `serve`, `build` 等命令。

  例如 `uni-app` 基于vue的小程序跨平台解决方案。它也是基于`@vue/cli` 实现的。并注册了`uni-serve`、`uni-build` 等命令。 又例如`vue-cli-plugin-electron-builder` ，也注册了`electron:serve`、`electron:build` 等命令。

  ``` sh
  # cli-service 内置命令
  vue-cli-service serve
  vue-cli-service build

  # uni-app
  vue-cli-service uni-serve
  vue-cli-service uni-build

  # vue-cli-plugin-electron-builder
  vue-cli-service electron:serve
  vue-cli-service electron:build
  ```

* **扩展配置**

  这里提到的扩展配置，包括扩展cli配置，还包括扩展 webapck配置等。

  service中，还包括实现了一套`webpack`配置管理方案。可以非常灵活的扩展、修改webapck配置。

  以官方提供的`vue-cli-plugin-eslint` 插件为例，该插件不仅注册了`lint`命令，同时，也在 webpack换种，添加了 `eslint-loader`, 在`vue.config.js` 中，添加了`lintOnSave` 的配置参数等。

* **添加/修改项目结构、文件**

  插件允许根据需求，添加/修改项目的结构，包括修改目录结构，添加新的文件，以及修改已有的模板文件内容。

  以`vue-cli-plugin-eslint` 插件为例，实现`eslint`，还需要添加 `.eslintrc` 配置文件，同时，要往 项目的`package.json` 中添加 `eslint` 依赖以及相关依赖。

* **提供交互式命令行配置项目生成规则**

  cli基于`inquirer` 实现了 交互式命令，通过交互式命令，获取相关的用户配置信息，用于插件内部 通过配置创建项目。

  以 `vue-cli-plugin-eslint` 插件为例。可以通过交互式命令选择使用 `Eslint Standard` 或者 `Eslint Airbnb`或者`Prettier` 等。

插件供的能力包括但不仅限以上介绍的， 内部还有更多的细节，可能让我们从各种方面去灵活的扩展 `vue-cli`。

这也意味着，你可以开发类似于 `uni-app` 的非常大的插件，也可以开发`vue-cli-plugin-eslint` 只关注于 eslint的小插件。这取决与你自身对插件的诉求。

## `vue-cli`的插件能力是如何实现的

在上文中，提到了 vue-cli 有两个主要模块：

- `@vue/cli`
- `@vue/cli-service`

在说 `vue-cli` 的插件能力实现前，我们先来看看，一个 vue-cli-plugin的 基础结构是怎么样的：

```sh
.
├── README.md
├── generator.js  # generator (可选)
├── prompts.js    # prompt 文件 (可选)
├── index.js      # service 插件
└── package.json
```

为什么是这样的结构呢？每个文件在这里的作用是什么？

首先，我们先讨论`@vue/cli` 中的插件架构。

### 创建vue项目

我们暂时抛开 `vue-cli`, 先聊聊创建一个vue项目，需要具备什么。

假设我们准备创建一个基于vue的单页应用。会经历以下的过程：

* **Step 1:**  创建一个 项目目录：` mkdir single-spa-vue`
* **Step 2: ** 进入目录，执行 `npm init` 初始化项目
* **Step3: **  创建一个源码目录`src`， 并在目录下创建`index.html`、`main.js`、`App.vue` 等文件
* **Step4:**  通过npm安装相关依赖，`npm i -D vue webpack vue-router ...`
* **Step5:**  创建`webapck.config.js` 编写webpack配置，并继续安装webpack相关依赖
* **Step6:**  修改`package.json` ，在`scripts` 中添加 相关命令
* **Step7:**  考虑到需要支持 es6， 继续安装`babel` 和修改webpack配置，支持 代码检查，继续安装 `eslint` 和修改webpack配置
* **Step8:**  尝试运行 `npm scripts` 命令， 根据运行情况调整webapck配置
* **Step9:**  ....

可以看到， 当我们自己从零开始搭建一个 vue项目时，需要的步骤很多，每个步骤都需要复杂度大小不一。从中我们可以看到不少痛点。

### 创建项目的痛点

* 初始化项目时，`src`目录下的 `index.html`、`main.js`、`App.vue` 中的内容，一般都是固定的，但是每次新建项目时，都要重新创建并编写代码；
* `vue`的相关依赖不少，容易在安装依赖时，少装，或者安装错版本， 如`vue` 和 `vue-template-compiler` 必须保持版本一致；
* webpack配置存在一定程度的门槛，包括如何添加不同的 `loader`，`plugins` ，对大部分新手，或者初级前端，可能会造成一些难题，还有包括资源管理，特别是需要去做构建优化等，包括编写 自定义`loader`/`plugins`， 可能对中级前端也会有一定的难度。 而且调试构建过程相当费时；
* 集成 `babel`、`eslint`、或者是`PWA`、引入自动化测试等，多种多样的配置文件，还需要设计不同的方案；
* 创建项目的时间跨度较大；
* 项目复用性不高，新开一个项目，可能又需要重新走一遍流程。
* ....

创建项目时的诸多痛点，而在前端日常的开发需求、或者业务迭代越来越快下， 留给团队去解决痛点的时间并不是充裕。 另一方面，为了考虑到新手接触 `vue`时，能够快速的获得一个开箱即用 vue 启动项目，学习、编写vue代码，看到产出，获得成就。

为此， `vue-cli` 就是为了解决包括但不限于以上的痛点，而开发出来的 vue标准开发工具。

面向 不同阶段的前端工程师，在使用vue开发项目时，都很获得不同程度的友好支持。

###  插件方案——`@vue/cli`

那么 `vue-cli` 是如何解决这些痛点的呢？

_以下内容已简化了实现逻辑，只提取了关键的流程，`@vue/cli`内部的插件实现做了更多的事情，有兴趣可通过阅读源码的方式进行了解。_

既然 创建项目，初始化项目结构，是做为一个痛点，`vue-cli` 表示，我帮你创建了，于是就有了

```sh
vue create [options] <app-name>
```

通过`vue create` 命令可以直接生成一个可运行的 vue项目，但他并不包含 如 `babel`，`eslint` 等模块，那么怎么集成进去呢？ 有些项目需要`eslint`， 有些项目不需要`eslint`， 是否可能根据需要进行选择？

要做到内容根据需要动态生成，就需要引入 __模板引擎__ ，通过 __条件__ 生成内容。

我们从 `vue create` 命令，内部工作机制展开讨论，在执行该命令后，实际运行的是一个 `Creator` 实例， 由`Creator` 实例进行项目创建。

 ![vue create](http://assets.processon.com/chart_image/5e85514fe4b03c4ce4e0db92.png)

Creator 实例首先会调用一个 通过`inquirer` 实现的`prompts` 交互式命令收集用户条件配置，比如，收集是否 需要babel， 是否需要eslint等。然后将条件传入到 Generator实例中，获取项目模板，通过Ejs 模板引擎生成内容，以及 FileStream 生成文件到目标目录，从而完成 一个项目的创建。

基于以上的流程，`vue-cli` 直接内置了一套通用的项目模板，以及配置了常见的条件配置，即可以满足大多数的基于vue的项目的快速创建。

但是，在实际的场景中，或者在说在一些有特殊需求的场景中，内置的模板以及条件选项，并不止完全满足项目的需求，比如，我需要生成一个 `Electron`应用，或者需要再集成自动化测试，引入 `Jest`，`mocha`等。这时候，内置的模板和条件选项并不能完全满足这些需求。虽然同样的也可以把这些都集成到内置模板中，但是这样会导致内置模板非常臃肿， 而且也并不一定能满足所有人的诉求，所以最好的方式，应该是实现一套机制，将 添加/修改模板，以及 添加/修改 用户条件配置 暴露出来，不同的开发者可以根据自身的需求，灵活的使用`vue-cli`。

所以在这样的场景考虑下，`vue-cli`引入了插件机制。

而我们也很明确，插件需要能够控制到 `prompts` 和`Generator` 两个流程。接下来是需要围绕这两个流程，设计一个插件方案。

`@vue/cli` 的 交互式命令，是基于`inquirer` 实现的。`inquirer`提供了一套非常简单的API实现交互式命令：

```js
const inquirer = require('inquirer');
const answers = await inquirer.prompt([
    {
        type: 'number',
        name: 'ages',
        message: 'Input your ages',
        default: 0
    }
]);
```

回顾我们之前提到的 vue-cli-plugin 的基础架构：

``` sh
.
├── prompts.js    # prompt 文件 (可选)
├── index.js      # service 插件
└── package.json
```

可以看到， 有一个 `prompts.js` 文件。这个文件就是用来定义插件的 prompts。 `vue-cli` 的 `Creator`将会 自动加载该文件，并收集 `prompts` 添加到 交互式命令队列中。

```js
// prompts.js
module.exports = api => {
  // 一个特性对象应该是一个有效的 inquirer 选择对象
  api.injectFeature({
    name: 'Some great feature',
    value: 'my-feature'
  })
}
```



获取到 `prompts`后，接下来就到了 生成项目文件的阶段，我们关注到 `Generator`

``` sh
.
├── README.md
├── generator.js  # generator (可选)
├── template # 模板文件目录
├── index.js      # service 插件
└── package.json
```

`Creator` 除了自动加载 `prompts.js` 还会自动加载`generator.js`， 也就是用来控制生成逻辑的文件，在这个文件中，

Generator 实例将会收集`generator.js` 中添加在生成规则，并合并默认的生成规则，从而生成项目。

``` js
module.exports = (api, options, rootOptions) => {
  // 修改 `package.json` 里的字段
  api.extendPackage({
    scripts: {
      test: 'vue-cli-service test'
    }
  })
 
  // 复制并用 ejs 渲染 `./template` 内所有的文件
  api.render('./template')

  if (options.foo) {
    // 有条件地生成文件
  }
}
```

综上所述，`@vue/cli` 的插件机制的实现，如图所示：

![vue cli plugin](http://assets.processon.com/chart_image/5e85b6eae4b08c5b86fb6934.png)

### 插件方案——`@vue/cli-service`

但是，仅仅是完成了 创建项目时的插件机制，就能够满足各种场景了吗？ 并不尽然，创建项目其实只是我们开始项目的第一个步骤，我们还需要开发项目，继续维护项目，优化项目等等，而这些，需要我们能够控制到 项目的构建流程，包括开发环境、生产包构建、测试等等。

`vue-cli` 由另外的模块`@vue/cli-service` 用于管理项目的构建与开发流程。

在这个模块中，主要负责的内容其实是围绕 `webpack`展开，同时也提供了包的管理机制，以及用户自定义配置即`vue.config.js`。 

实际上`@vue/cli-service` 的核心实现，主要有两个类，

- `Service` 类: 主要负责管理 webpack配置， 获取用户自定义配置，自动检索加载插件，管理注册命令等；
- `PluginAPI` 类，对外暴露插件API，允许插件获取、使用Service的能力。

__首先__，Service 是管理webpack配置，由于需要使webpack配置能够满足基本的项目开发需要，同时能够更加灵活的在不同的项目中自定义，那么就不应该与普通项目中使用webpack的方式相同。 需要的是一套能够灵活的从不同的地方收集webpack配置的方案。在`Service` 中，实现该方案采用以下模式：

（为了便于理解，示例代码已经过简化）

``` js
const merge = require('webpack-merge');
class Service {
    constructor() {
        this.webpackRawConfigFns = [];
    }

    addRawWebpackFn(fn) {
        this.webpackRawConfigFns.push(fn);
    }
    
    resolveWebpackConfig(config) {
        this.webpackRawConfigFns.forEach(fn => {
            if (typeof fn === 'function') {
                const res = fn(config);
                if (res) config = merge(config, res);
            } else if (fn) {
                config = merge(config, fn);
            }
        });
        return config
    }
}

const service = new Service()

service.addRawWebpackFn(config => {
    // configure webpack
});
const webpackConfig = service.resolveWebpackConfig({});
```

通过以上代码，可以很轻易的理解 Service 内部是如何管理webapck配置的，通过暴露`addRawWebpackFn(fn) `方法，收集 webapck配置， 最终通过`resolveWebpackConfig(config)` 合并所有配置并输出。同样的，在插件方案中暴露该方法，即可实现 灵活的修改webpack配置。

__然后__, Service 还支持自定义命令。由于 Service 对webpack只做了 配置管理，但是并不关注 具体的 webpack如何执行的。 具体如何执行webpack，是由 命令进行控制的。通过不同的 命令，根据命令的需求，进而进行实现。

Service 实现自定义指令的方案如下：

（为了便于理解，示例代码已经过简化）

``` js
class Service {
    constructor() {
        this.commands = {}
    }
    
    registerCommands(name, opts, fn) {
        if (typeof opts === 'function') {
            fn = opts
            opts = null
        }
        this.commands[name] = { fn, opts: opts || {}}
    }
    
    run(name, args = {}, rawArgv = []) {
        let command = this.commands[name]
        if (name && command) {
            return command.fn(args, rawArgv)
        }
    }
}
```

所以自定义命令，Service内部实现其实是在`commands` 实例属性上挂载命令方法， 以 serve 命令为例：

```js
const webpack = require('weback')
const service = new Service();
service.registerCommands('serve', function (args) {
    const compile = webpack(service.resolveWebpackConfig({}));
    compile.watch({}, err => {});
});

service.run('serve');
```

我们再回到 一个 插件的目录结构中：

```sh
.
├── README.md
├── index.js      # service 插件
└── package.json
```

在Service 中， 通过 `resolvePlugins`方法，自动检索 项目`package.json`文件中包含的插件依赖，并加载，获取插件包中的`index.js` 后执行，获取插件中注册的`command`以及对webpack的配置的修改。

![](http://assets.processon.com/chart_image/5e86d786e4b0bf3ebcf55f93.png)

Service 实现的插件能力中，还包括加载项目中的`vue.config.js` ，其中通过`loadUserOptions` 方法进行加载：

（为了便于理解，示例代码已经过简化）

```js
class Service {
    loadUserOptions() {
        let fileConfig, pkgConfig, resolved, resolvedFrom
        const configPath = (
            process.env.VUE_CLI_SERVICE_CONFIG_PATH ||
            path.resolve(this.context, 'vue.config.js')
        )
        if (fs.existsSync(configPath)) {
            try {
                fileConfig = require(configPath)

                if (typeof fileConfig === 'function') {
                    fileConfig = fileConfig()
                }

                if (!fileConfig || typeof fileConfig !== 'object') {
                    error(
                    `Error loading ${chalk.bold('vue.config.js')}: should export an object or a function that returns object.`
                    )
                    fileConfig = null
                }
            } catch (e) {
                error(`Error loading ${chalk.bold('vue.config.js')}:`)
                throw e
            }
        }
        return fileConfig
    }
}
```

获取到的用户配置，将会做为 `projectOptions` 参数，传入给 Plugin 中使用。

以上就是 `@vue/cli`以及`@vue/cli-service` 中关于 plugin关键流程的实现。 详细的实现方式比文章中所介绍的要复杂更多，有兴趣了解完整流程的，可以通过阅读源码的方式获取更多内容。



## 开发一个 vue-cli 插件

在了解了 vue-cli 插件的 大体的实现之后，我们应该如何开发一个 vue-cli 插件呢？

在 vue-cli提供的能力中，有两种开发插件的模式：

- npm插件开发： npm插件即发布到npm，允许通过远程下载的方式，添加插件到项目中。
- 本地插件开发： 在项目中添加本地插件，只在项目中生效。

npm插件和本地插件本质上是相同的，不同点是 本地插件只是一个 service插件，而npm插件是一个 至少包含service插件的cli插件。

开发一个 npm插件时， 命名规范必须为 `vue-cli-plugin-[pluginName]` ，如果是带 scope，则命名为 `@scope/vue-cli-plugin-[pluginName]。 其中目录结构如下：

``` sh
.
├── README.md
├── generator.js  # generator (可选)
├── prompts.js    # prompt 文件 (可选)
├── index.js      # service 插件
└── package.json
```

开发一个 本地插件时， 需要在本地通过 vue-cli 创建的项目中，在`package.json` 添加以下内容：

```json
{
    "vueplugins": {
        "service": ["my-plugins.js"]
    }
}
```

其中， `service` 声明添加的 service插件列表， 数组中的元素为一个可访问的文件路径。

接下来，编写插件代码：

``` js
// index.js  service plugin
module.exports = function (api, projectOptions) {
    // do something
}
```

其中， api参数暴露了以下主要接口：

* **registerCommand(name[, opts], fn) **

  注册一个自定义 command， 通过`vue-cli-service [name]` 执行

  * `name`： command name， 如： serve
  * `opts`: argv 参数， 参考 `commandar` options
  * `fn`： command 执行function。 function(args){}  `args` 为 opts 设置的 argv

  ```js
  module.exports = function (api, projectOptions) {
      api.registerCommand('demo', {
          description: 'register command demo',
          usage: 'vue-cli-srvice demo [options]',
          options: {
              '--port': 'specify port (default: 8080)'
          }
      }, async function (args) {
          // do something...
      });
  };
  ```

* **chainWebpack(fn)**

  通过`webpack-chain` 的风格设置webpack配置

  ``` js
  module.exports = function (api, projectOptions) {
      api.chainWebpack(config => {
          config.target('electron-main');
      });
  };
  ```

* **configureWebpack(fn)**

  设置webpack配置，通过 `webpack-merge` 合并

  * `fn`: {object|function}

  ``` js
  module.exports = function (api, projectOptions) {
      api.configureWebpack(config => {
          config.target = 'electron-main';
      });
  };
  ```

* **configureDevServer(fn)**

  配置开发服务器。fn接受一个 [app参数](https://www.webpackjs.com/configuration/dev-server/#devserver-before)：

  ``` js
  module.exports = function (api, projectOptions) {
      api.configureDevServer(app => {
          app.get('/demo', function (req, res) {
              // do something
          })
      });
  };
  ```

在 开发一个 npm插件时， 有时候不止需要一个 service插件，还需要 prompts 获取交互式命令

``` js
// prompts.js 
module.exports = function (api) {
    // do something
}
```

其中， api参数暴露了以下接口：

* **injectFeature(feature)**

  新增一个特性对象，必须是一个 inquirer 选择对象

  ```js
  api.injectFeature({
      name: 'demo',
      value: 'test'
  });
  ```

* **injectPrompt(prompt)**

  新增一个 prompt对象，必须是一个 inquirer 对话对象

  ``` js
  api.injectPrompt({
      name: 'demo',
      type: 'confirm',
      message: 'prompt demo'
  });
  ```

* **injectOptionForPrompt(name, option)**

  查找name对应的prompt，并在改prompt的choices插入一条option

  ```js
  api.injectOptionForPrompt('demo', {
      name: 'choice1',
      value: 'choice1'
  });
  ```

* **onPromptComplete(cb)**

  当所有的对话都完成后，即将传递给 Generator 的options前执行回调

  ```js
  api.onPromptComplete((answers, options) => {
      if (answers.features.includes('my-feature')) {
          options.plugins['vue-cli-plugin-my-feature'] = {
              someFlag: answers.someFlag
          }
      }
  })
  ```

在开发一个 npm插件时，当还需要为项目生成新文件、或修改模板文件时，需要添加 `generator.js`文件：

```js
module.exports = function (api, options, rootOptions) {
    // 修改 `package.json` 里的字段
  api.extendPackage({
    scripts: {
      test: 'vue-cli-service test'
    }
  })

  // 复制并用 ejs 渲染 `./template` 内所有的文件
  api.render('./template')
}
```

完整API查看[GeneratorAPI](https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli/lib/GeneratorAPI.js)



## 引用

> [vue-cli](https://github.com/vuejs/vue-cli)
>
> [官方文档](https://cli.vuejs.org/zh/)



