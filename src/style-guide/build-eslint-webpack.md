---
title: webpack中配置eslint
---

[eslint-loader](https://www.npmjs.com/package/eslint-loader) 模块可方便快速的让我们在基于 `webpack`的项目中使用 `ESLint`；


### 在常规项目、自建Vue项目、自建react项目中

__安装__
``` bash
npm install -D eslint eslint-loader babel-eslint
```

在你的`webpack`配置文件添加中：
``` js
module.exports = {
    // ...
    module: {
        rules: [
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/, // 根据项目，不支持ts、jsx 的可以直接删除
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    // eslint options
                }
            }
        ]
    }
    // ...
}
```
### 在Vue-cli 搭建的项目中

`vue-cli` 提供了 `@vue/cli-plugin-eslint` 插件，方便在项目中集成eslint。只需要安装该插件即可， 或者在项目初始化时，选择安装eslint插件。

__安装__
在项目中运行以下命令。
``` bash
vue add eslint
```

### 格式化输出信息

> [eslint-friendly-formatter](https://www.npmjs.com/package/eslint-friendly-formatter)

`eslint-friendly-formatter` 是一个`eslint`检查格式化输出插件，将检查结果格式化输出到 终端以及浏览器的页面和控制台中，方便在开发阶段中即使查看到错误信息，并修复。
* **install**

    ``` bash
    npm install -D eslint-friendly-formatter
    ```
* **Usage**

    `webpack config`
    ``` js
    module.exports = {
        // ...
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'eslint-loader',
                    options: {
                        // eslint options
                        formatter: require('eslint-friendly-formatter')
                    }
                }
            ]
        }
        // ...
    }
    ```
