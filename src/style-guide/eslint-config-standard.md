---
title: 标准风格配置
---

### 适用范围
标准风格配置适用于前端的常规项目开发当中，其中，常规项目是指：

- 包括但不限于通过 webpack、gulp搭建的前端项目
- 包括但不限于 webPC应用、webMobile应用、小程序应用等
- 包括但不限于 vue、react的前端项目

以上类型的项目， 都应该考虑至少添加 标准风格配置。

### eslint预设插件

为了便于在项目中更方便的添加标准风格指南， 开发集成了`@bestwehotel/eslint-config-standard` 的eslint插件。

该插件发布在 [私有npm仓库](/docs/npm/index.html) 中，可从私有npm仓库直接安装到项目中。

在项目根目录中新建`.eslintrc.js`：
``` js
module.exports = {
    extends: '@bestwehotel/eslint-config-standard'
};
```
并安装以下依赖：
- babel-eslint
- eslint-config-standard
- eslint-plugin-import
- eslint-plugin-node
- eslint-plugin-promise
- eslint-plugin-standard
- @bestwehotel/eslint-config-standard

``` sh
npm i -D eslint babel-eslint eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard @bestwehotel/eslint-config-standard
```


### 完整配置参考
``` js
module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
    },
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    extends: [
        'standard'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'indent': ['error', 4],
        'space-before-function-paren': ["error", {
            "anonymous": "always",
            "named": "never",
            "asyncArrow": "ignore"
        }],
        'eqeqeq': 'off',
        'semi': ['error', 'always'],
        'arrow-parens': 0,
        'generator-star-spacing': 0,
        'padded-blocks': 0, // 不允许块级开始或结束有空行
        'comma-dangle': 0, // 要求或禁止使用拖尾逗号
    }

}

```
