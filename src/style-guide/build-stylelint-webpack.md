---
title: webpack中配置stylelint
---

[stylelint-webpack-plugin](https://www.npmjs.com/package/stylelint-webpack-plugin) 插件可方便快捷的在基于`webpack`搭建的项目中集成 stylelint

### 安装
``` sh
npm i -D stylelint stylelint-webpack-plugin
```

### 使用

在webpack 配置文件中，添加：
``` js
const path = require('path');
const StylelintPlugin = require('stylelint-webpack-plugin');
module.exports = {
    plugins: [
        new StylelintPlugin({
            context: path.resolve(process.cwd(), 'src'),
            files: [
                'src/**/*.{css,less,scss,sass,vue,html}' // 根据项目类型补充校验的文件后缀
            ],
            ignore: /node_modules/
        })
    ]
}
```
