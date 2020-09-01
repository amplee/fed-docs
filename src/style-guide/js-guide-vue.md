---
title: Vue 项目风格指南
---

### 规范说明

Vue项目的代码规范，是基于 [标准风格指南](/docs/style-guide/eslint-standard.html) 的基础上，进一步继承官方的提供的Vue风格指南，所形成的新的规范。

官方规范提供了指导文档已经 eslint的插件，以便于继承到项目中：

[Vue 风格指南](https://cn.vuejs.org/v2/style-guide/)

[eslint-plugin-vue](https://eslint.vuejs.org/)

在官方的 eslint规范文档中， 分为了四个类型的规范选择：

* **`plugin:vue/base`**

  公共的通用的风格规范，在这个规范中， 主要注入了两个规则：
  - `vue/comment-directive`： 在`<template/>` 标签中， 允许通过注释的形式，开启或关闭eslint规则校验。
  - `vue/jsx-users-vars`: 防止在JSX中使用的变量被标记为未使用。

* **`plugin:vue/essential`**

  继承`plugin:vue/base`的相对宽松的风格规范，但是均为至关重要的规则。

* **`plugin:vue/strongly-recommended`**

  官方强烈推荐在项目中使用的风格规范， 相比 `essential` 补充了更多在开发中应该注意的规则。

* **`plugin:vue/recommended`**

  官方推荐的在项目中使用的风格规范， 在包括了 `essential`和`strongly-recommended`的规则后，补充了与项目安全、属性排序等更为严格的规则在其中。

除了以上的四种类型的规范选择外， 还提供了未包括在四种类型中的`Uncategorized` 的规则选择，可以根据团队的需要集成到项目中。

在我们的前端项目中， 一般选择集成`vue:plugin/essential` 和 `vue:plugin/strongly-recommended` 的规则。

### 细则

* **在`<template/>`开启关闭eslint检查**

  `vue/comment-directive` incudes in `vue/plugin:base`

  - eslint-disable
  - eslint-enable
  - eslint-disable-line
  - eslint-disable-next-line
  ``` html
  <template>
    <!-- eslint-disable-next-line  vue/max-attributes-per-line  -->
    <div a="1" b="2" c="3" d="4"></div>
  </template>
  ```
* **防止在JSX中使用的变量被标记为未使用**

  `vue/jsx-uses-vars` incudes in `vue/plugin:base`
  ``` js
  import HelloWorld from './HelloWorld';

  export default {
      render () {
          return (
              <HelloWorld msg="world"/>
          )
      },
  };
  ```

其他规则待补充完善
