---
title: 开发工具
---

## 介绍 <Badge text="Beta" />

为了方便不同的业务团队定制、开发`Widget`，我们提供了`@bestwehotel/wisdom-widget-cli` 开发工具。开发者可以通过下载安装该工具进行`Widget`开发。

## 安装 <Badge text="Beta" />

工具发布在 私有npm， 请有阅读 [私有npm](/npm/)

``` sh
npm i -g @bestwehotel/wisdom-widget-cli
```

## 使用

工具安装完成后，生成全局命令行工具`wisdom-widget`，可以通过该命令行进行`Widget` 开发的流程。

* **开发者登录** <Badge text="未开发功能" type="warning" />

  ``` sh
  wisdom-widget login <developer-token>
  ```
  其中， developer-token为开发者token，可在智慧门店助手管理平台登录后，在用户设置中获取该token。

* **创建Widget项目**
  ``` sh
  wisdom-widget create <widget-name>
  ```
  该命令行会创建一个Widget项目，并通过交互式命令行，指引你完善 widget所属团队，生成widgetID等。

  项目创建成功后，将会生成以下目录：
  ``` sh
  .widget-name
  ├── src # 组件源码
  │   └── block.vue # 约定的默认组件
  ├── widget.config.js # widget配置文件
  ├── data.model.json # 数据模型配置
  ├── readme.md # 说明文档
  └── package.json
  ```
  关于每个文件的作用，将会在后面的内容提供详细说明。

* **启动Widget开发环境**

  创建好项目后，进入该目录，执行以下命令即可启动：
  ``` sh
  npm run serve
  # or
  wisdom-widget serve
  ```
* **构建Widget生产包**

  ``` sh
  npm run build
  # or
  wisdom-widget build
  ```
  构建前，需要选择Widget版本。
  构建后资源将生成到 `dist/` 目录中，等待发布。

* **发布Widget** <Badge text="Alpha" type="warning" />

  ``` sh
  npm run publish
  # or
  wisdom-widget publish
  ```
  在助手一期中， 发布命令暂时只打包widget，生成压缩包到`.cache/[id]_[version].zip` 中，暂不支持直接上传到widget仓库。目前需要手动从 **`胥腾龙`** 处，分配获取一个 `widget ID`, 完成开发后，将压缩包发送给 **`胥腾龙`** 进行数据库表配置。

  二期将会完善该功能。


## 项目目录说明

``` sh
.widget-name
├── src # 组件源码
│   └── block.vue # 约定的默认组件
├── widget.config.js # widget配置文件
├── data.model.json # 数据模型配置
├── readme.md # 说明文档
└── package.json
```

在一个`widget`项目中：

- **src** 目录

  `src`目录下存放的是`Widget`包含的组件的源码，一个`Widget`允许包含多个组件，不同的组件适用于不同的场景。

- **widget.config.js**

  widget项目配置文件， 用于配置 widget暴露的组件、自定义webpack配置、mock等。

- **data.model.json**

  widget 数据模型描述文件, 该描述文件，在二期将用于 智慧门店助手管理平台，手动发布消息时，选择widget后，通过数据模型描述文件，自动生成数据填充表单。

- **readme.md**

  widget 使用说明文档，该文件将会被编译为html内容，并在智慧门店助手管理平台，widget列表中显示。

- **package.json**

  widget 包说明文件， 配置 团队信息、widget信息等。

## 配置

### `widget.config.js`
```js
module.exports = {
    // 声明 widget 包含的，需要暴露给助手使用的组件。
  	widgetComponent: {
        // 约定使用 block组件渲染消息列表item、通知列表item。
  		block: 'src/block.vue',
        // 约定使用bubble组件渲染气泡。
        bubble: 'src/bubble.vue',
        // 约定使用 notice组件渲染系统通知缩略信息
  		notice: 'src/notice.vue'
        // 约定暴露接口用于打开工作区以及工作区使用的组件
        // more component...

    },
    //注入环境变量到 process.env
    // widget中可通过 process.env.xx 进行访问， 值必须通过 JSON.stringify() 包装
    defineEnv: {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    },
    // 开发环境 web配置
    serveConfig: {
        listLength: 1,
        taskListLength: 1,
        noticeListLength: 1,
        historyListLength: 1
    }

  	// 扩展 webpack 配置，通过 webpack-merge 合并到webpack中
  	configureWebpack: config => {
  		// custom webpack
  	},
  	// 采用 webpack-chain 风格扩展 webpack配置
  	chainWebpack: config => {
  		// custom webpack for webpack-chain
    },
    // mock 接口请求， 调用测试接口产生测试数据
    // mockRequest 和 mockData 同时配置时，优先使用mockRequest
    mockRequest: {
        url: '', // 测试接口地址
        method: 'post',
        // headers 头数据
        headers: {},
        // 请求体数据
        body: {

        },
        // 对数据进行输出包装，返回符合 mockData 格式的数据
        transform: res => {
            return res;
        }
    },
    // 模拟数据， 可以在消息开发调试阶段使用，构建生产包时不会被打包进去。
    // 使用mockData需要注释mockRequest
    mockData: {
        createTime: Data.now(),
        title: '消息标题',
        // 消息自定义消息数据内容，与 data.model.json模型声明的数据结构一致
        data: {
            name: '名称'
        }
    }
}
```

* **widgetComponent**

  `Type: Object`

  配置widget暴露的对外的Component。其中组件名称需要符合 [widget规范#组件约定](/wisdom-hotel-helper/widget-standard.html#组件约定) 。

* **defineEnv**

  `Type: Object`

   `define-webpack-plugin` 参数配置。

* **serveConfig**

  `Type: Object`

  配置 启动开发环境后，web调试工具的表现。

  ``` js
  {
      serveConfig: {
          listLength: 1, // 配置 通用列表项数量
          taskListLength: 1, // 配置任务列表项数量
          noticeListLength: 1, // 配置通知列表项数量
          historyListLength: 1 // 配置历史消息列表项数量
      }
  }
  ```

* **mockRequest**

  `Type: Object`

  消息模拟，在开发调试阶段，可以通过配置该项，请求 开发/测试 接口， 该接口为 消息模板配置时，配置的业务通知接口。通过模拟请求体，获得测试数据。测试数据再进一步转化为消息内容，从而进行开发调试。
  ``` js
  mockRequest: {
      url: '', // 测试接口地址
      method: 'post',
      // headers 头数据
      headers: {},
      // 请求体数据
      body: {

      },
      // 对数据进行输出包装，返回符合 mockData 格式的数据
      transform: res => {
          return res;
      }
  },
  ```

* **mockData**

  `Type: Object|Array`

  消息模拟，在开发调试阶段，可以通过配置该项，模拟测试数据，进行开发调试。 该字段配置区别于`mockRequest`， 但有`mockRequest`时， 优先使用`mockRequest`，需要使用`mockData`时，请注意注释`mockRequest`。

  ``` js
  mockData: {
      createTime: Data.now(),
      title: '消息标题',
      // 消息自定义消息数据内容，与 data.model.json模型声明的数据结构一致
      data: {
          name: '名称'
      }
  }
  ```

* **configureWebpack**

  `Type: Function|Object`

  高级功能，开发者可以通过该项，修改 `webpack` 配置。 该配置项功能可参考 `vue-cli` 同名配置。

* **chainWebpack**

  `Type: Function`

  高级功能，开发者可以通过该项，修改 `webpack` 配置。 该配置项功能可参考 `vue-cli` 同名配置。

在使用 `configureWebpack`和`chainWebpack`时，你应该阅读过 智慧门店助手`wisdom-widget-cli` 项目的源码，或至少阅读过其中关于webpack的源码，理解内部的处理逻辑，清晰的知道为什么修改配置，以及目的。

> <Badge text="danger" type="error" />
> **在webpack配置中，请勿修改 `mode`,`output`,`entry`,`target`属性。**<br/>
  **请勿修改`publicPath`, 该配置项在widget内部多个地方使用，除非你明确知道为什么修改，并修改后不会导致widget加载失败。**

### `package.json`

``` json
{
    "name": "widget name",
    "version": "widget version",
    "id": "widget id",
    "team": {
        "tid": "team id",
        "name": "team name"
    },
    "author": "author",
    "lastUpdater": "lastUpdater",
}
```

* **name :** widget 名称，一般在创建项目时生成，默认与目录名称一致。
* **version :** widget 版本，无需手动修改，在构建发布时，会通过交互式命令配置version。
* **id :** widget id。在一期需求中，widget id 需要找 **`胥腾龙`** 获取。到后续的二期需求中，将会集成到 `create`命令中自动生成。
* **team :** 团队配置，一期暂无，二期时集成到`create`命令中生成。
* **author :** widget 创建者
* **lastUpdater :** widget 最后更新者


## 环境支持
* **babel 编译**

  支持 es6 语法，并支持在widget项目中通过修改 `babel.config.js` 添加更多babel支持。

* **css预编译——SASS， POSTCSS**

  支持使用`SASS`编写CSS。

* **CSS modules**

  由于在智慧门店助手中，存在同一个widget，使用不同的版本渲染消息。为了防止CSS className冲突，widget的所有CSS都将通过`css modules` 进行编译，重写 className，以确保className的唯一性。并内联到js中。

  重写后 className 格式为：

  ```sh
  [widget:hash:5]_[name]_[local]_[hash:base64:5]
  ```

  你可以通过以下方式使用 css，

  `block.vue`：

  ``` html
  <template>
      <div :class="$style.wrapper">
          <button :class="[$style.btn, $style.btnDefault]">
              按钮
          </button>
      </div>
  </template>
  <style lang="scss" module>
      .wrapper {
          width: 100%;
      }

      .btn {
          width: 200px;

          &.btn-default {
              color: #ccc;
          }
      }
  </style>
  ```

* **静态资源支持**

  包括图片资源，字体资源等，均可编译到`Widget`中。

* **默认别名**

  "@":  指向 widget 的`src`目录

  "src": 指向widget的`src`目录

  "static": 指向widget的`static`目录

## Change Log

### v0.2.1

- 新增 开发环境，预览模式下 message 数据内容查看
- 新增跳转到 帮助文档入口

### v0.2.0

- 优化 widget webpack Config class
- 添加 serveConfig 支持
- 添加 defineEnv 支持
- 优化 web 开发环境 速度
- 添加 历史消息列表
- bugFix: 调整 element-ui 加载入口顺序， 该问题导致widget内部覆盖不到element-ui样式

### v0.1.5

- 添加 markdown-it 编译 readme.md 为 html内容

### v0.1.4
略

### v0.1.3
略

### v0.1.2

- 添加动态获取可用端口，支持启动多个widget开发环境

### v0.1.1
略

### v0.1.0

- 发布基础版本开发工具
