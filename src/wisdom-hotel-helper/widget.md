---
title: Widget 开发规范
---

<!-- # 智慧门店助手 Widget 开发规范 -->

## 介绍

在智慧门店助手中，消息是由`消息数据` + `Widget` 组成，并渲染在前台。<br>
其中， `消息数据`提供的是消息的数据内容， `Widget`则主要提供了渲染消息所需要使用的组件、并提供消息数据的数据模型。

`Widget` 是可扩展的、可自定义的，具有相对的灵活性。不同的业务部门，可以根据不同的业务需求，以及使用场景，定制`Widget`。

## 开发者权限

在智慧门店助手接入规范中，开发者需要具备 该团队下的开发者权限，才能发布`Widget`。查看 [团队权限管理]()，获取相关内容。

## 开发工具 <Badge text="alpha" type="warning" />

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

* **发布Widget**

  ``` sh
  npm run publish
  # or
  wisdom-widget publish
  ```

## 开发说明

Widget项目开发目录说明：

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

  `src`目录下存在的是`Widget`包含的组件的源码，一个`Widget`允许包含多个组件，不同的组件适用于不同的场景。

- **widget.config.js** widget配置文件

  ```js
  module.exports = {
    // 声明 widget 包含的，需要暴露给助手使用的组件。
  	widgetComponent: {
          // 约定使用 block组件渲染消息列表item、通知列表item。
  		block: 'src/block.vue',
          // 约定使用bubble组件渲染气泡。
          bubble: 'src/bubble.vue'
          // 约定使用 notice组件渲染系统通知缩略信息
  		notice: 'src/notice.vue'
          // 约定暴露接口用于打开工作区以及工作区使用的组件

  	},
  	// 扩展 webpack 配置，通过 webpack-merge 合并到webpack中
  	configureWebpack: config => {
  		// custom webpack
  	},
  	// 采用 webpack-chain 风格扩展 webpack配置
  	chainWebpack: config => {
  		// custom webpack for webpack-chain
  	},
    // 模拟数据， 可以在消息开发调试阶段使用，构建生产包时不会被打包进去。
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

* **data.model.json** 数据模型配置

  配置 widget 数据格式模型。详细内容见[数据模型配置](#数据模型配置)

* **readme.md 说明文件**

  widget组件使用说明文档，该文件将通过 `markdown-it` 编译，最终发布在 智慧门店助手管理平台的 widget管理中，做为 widget的使用说明文档。

* **package.json 包声明文件**

  ``` json
  {
      "name": "widgetTest", // widget 名称
      "version": "1.0.0", // widget 版本， semver规范
      "id": "0", // widget 唯一标识
      "team": {	// widget 所属团队配置
          "tid": "",	// 团队唯一标识
          "name": ""  // 团队名称
      }
  }
  ```

## 开发环境支持

`Widget`开发环境使用 webpack进行构建，并提供了如下支持：

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

* **支持扩展 webpack 配置**

  支持在 `widget.config.js`中扩展webpack，为widget提供更强大的能力。

  [webpack-chain](https://github.com/Yatoo2018/webpack-chain/tree/zh-cmn-Hans)

  ```js
  module.exports = {
      configureWebpack: config => {
          config.module.alias = {
              ...config.module.alias,
              'util': './src/util/'
          }
      },
      chainWebpack: config => {
         	// https://github.com/Yatoo2018/webpack-chain/tree/zh-cmn-Hans
      }
  }
  ```

* **默认别名**

  "@":  指向 widget 的`src`目录

  "src": 指向widget的`src`目录

  "static": 指向widget的`static`目录

* **publicPath**

  **请勿修改webpack配置的`output.publicPath`的值。** 否则将会导致 widget组件、资源无法加载。

## 组件约定

在widget开发中，采用约定的形式，对消息的不同业务场景展示，使用不同的组件。其中，目前约定了 三种组件：

* **block组件**

  `block` 组件将用于渲染 消息列表item、通知列表item。一个widget至少需要包含 `block`组件。

  `block` 组件的组件 height 可以自定义高度，主要用于展示消息的简要信息，以及提供详细详情的入口。

* **bubble组件**

  `bubble`组件将用于 气泡通知窗口渲染。bubble组件具有固定的height，以保证助手的交互符合规范。 气泡通知主要用于，当用户收起消息列表，或隐藏助手时， 通过 气泡窗口的方式，提醒用户有新的消息推送。气泡组件只提供重要的消息内容展示。

  当widget不包含 `bubble`组件时，将会使用`block`组件渲染气泡窗口。

* **notice组件**

  当消息类型为通知类型，将会分为三个区域进行展示，包括 通知列表，通知详情，以及接受到消息时， 在系统通知栏展示通知的简要描述。

  其中，简要描述主要为单行文本的消息描述，该描述 使用`notice`组件进行提供。

## 数据模型配置

`data.model.json`是 数据模型配置文件，是用于描述 widget定义的组件，所需要的数据结构，在使用widget时，需要遵循该模型，传入参数。

同时，消息管理后台，在手动创建消息时，会使用该模型，渲染消息内容填写表单。

一个 `data.model.json` 最基本的格式如下：

```json
{
    "data": {}, // 数据描述
    "maps": {} // 数据源字典集
}
```

在 data 中，以 key 作为数据字段名称，以value描述数据类型，默认值等。

格式：

```json
{
    "data": {
        "[key][::desc]": "{{type[[map]]|defaultValue}}"
    }
}
```

* **`[key][::desc]`** 描述字段字段，其中，key描述的是字段的键，`::desc`描述的是字段的名称。
* **`{{type[[map]]|defaultValue}\}`** 描述数据的值，当使用“`{{}}`” 包裹时，描述的是值的格式，如果未使用，则作为普通文本，直接作为值。其中 `type` 为描述数据类型，map 描述当为某种特定类型，需要使用数据源时，从 `maps`获取数据源，。 `defaultValue` 描述的是默认值。

在 maps 中，定义的是静态数据源，为data中 type 定义的一些类型，提供数据源。 如类型为下拉选择、单选、多选等。

一个完整的例子：

```json
{
    "data": {
        "name::姓名": "{{text|张三}}",
        "gender::性别": "{{choice[gender]|0}}",
        "age::年龄": "{{number|1}}"
    },
    "maps": {
        "gender": [
            {
                "name": "女",
                "value": "0"
            }，
            {
            	"name": "男",
            	"value": "1"
            }
        ]
    }
}
```

支持的类型：

| 类型      | 使用                            | 描述                     |
| --------- | ------------------------------- | ------------------------ |
| 固定值    | string                          | 普通文本，固定值         |
| text      | `{{text|defaultValue}\}`        | 文本内容，文本输入框     |
| multiText | `{{multiText|defaultValue}\}`  | 多行文本，多行文本输入框 |
| number    | `{{number|defaultValue}\}`        | 数字，数字输入框         |
| date      | `{{date|defaultValue}\}`          | 日期选择，日期选择器     |
| choice    | `{{choice[map]|defaultValue}\}`   | 下拉选择，下拉选择框     |
| radio     | `{{radio[map]|defaultValue}\}`    | 单选，单选框             |
| checkbox  | `{{checkbox[map]|defaultValue}\}` | 多选，多选框             |


## Widget 开发 API

在widget 开发流程中，内置了一些常用的 属性， API，以及 工具库，帮助 widget 使用 智慧门店助手提供的能力，更好的完成 widget开发。

### 组件内置 props

组件内置的 props，在widget的，配置在 `widget.config.js` 的 widgetComponent 组件，均可使用。


* **Props: message**

  `message` props属性提供了 当前消息内容数据的基础数据部分, 提供的数据如下：

  | 属性       | 类型      | 描述                               |
  | ---------- | --------- | ---------------------------------- |
  | id         | string    | 消息ID                             |
  | title      | string    | 消息标题                           |
  | createTime | timestamp | 消息创建时间                       |
  | startTime  | timestamp | 消息开始生效时间                   |
  | endTime    | timestamp | 消息失效时间（表示消息为限时消息） |
  | cancelable | boolean   | 消息是否可忽略                     |
  | type       | string    | 消息类型（任务\[MSG_TASK\]、建议、通知\[MSG_NOTIFY\]等）     |
  | status     | string    | 消息状态                           |
  | userId     | string    | 消息目标用户                       |
  | innId      | string    | 消息目标门店                       |
  | templateId | string    | 消息模板编号                       |
  | tenantId   | string    | 租户编号                           |

* **Props: widget**

  `widget`props 属性提供了当前widget的相关信息

  | 属性          | 类型           | 描述                  |
  | ------------- | -------------- | --------------------- |
  | id            | string         | widget Id             |
  | version       | string         | widget version        |
  | componentList | array\<string> | Widget 提供的组件列表 |

* **Props: data**

  `data`props 属性提供了消息内容的自定义数据，提供的数据结构由`data.model.json` 提供，业务推送消息的数据接口需要符合`data.model.json`声明的数据模型。

示例：

```html
<template>
    <div class="widget-wrapper">
        <h3>{{ message.title }}</h3>
        <p>{{ data.customData }}</p>
    </div>
</template>
<script>
    export default {
        mounted() {
            const { id, version, componentList } = this.widget;
            console.log(id, version, componentList);
        }
    }
</script>
```

### 内置widget工具 widget-util <Badge text="alpha" type="warning" />

widget 内置了一系列 可用方法，以适配不同的widget开发。

`widget-util` 已内置在工具中，无需 npm 安装，直接使用。

__目前工具 版本不稳定，API随时发生重大变更，请谨慎使用__

* **isElectron()** <Badge text="Beta" />

  判断当前环境是否是 electron 应用
  ``` js
  import { isElectron } from 'widget-util';
  console.log(isElectron());
  ```

* **axios**

  工具内置 axios库，可直接使用
  ``` js
  import { axios } from 'widget-util';

  axios.post('xxx/xx');
  ```
* **ElementUI**

  内置 `element-ui` 库。可直接使用。 同时 组件已全局注册。
  ``` js
  import { ElementUI } from 'widget-util';
  ```

* **openWorkDialog(messageId, componentName)** <Badge text="alpha" type="warning" />

  打开工作区模态框
  ``` js
  import { openWorkDialog } from 'widget-util';
  openWorkDialog('0001', 'detail');
  ```
* **openWorkWindow({ messageId, componentName, url })** <Badge text="alpha" type="warning" />

  打开工作区独立窗口。

  componentName 和 url 两个参数只能传其中一个， 优先使用 componentName。

  传入componentName时， 加载 widget内置组件。 传入 url 时， 打开第三方网页。

* **其他**

  暂无其他方法，持续补充中。
