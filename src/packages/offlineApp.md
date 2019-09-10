---
title: offlineApp 离线包打包工具
---

### 安装

* **全局安装**
  ``` sh
  npm install -g @bestwehotel/offline-app
  ```
* **在项目中安装**
  ``` sh
  npm install -D @bestwehotel/offline-app
  ```

### 使用

在你的项目根目录，创建`offlineApp.config.js`，该文件为 离线包打包配置文件。
`offlineApp.config.js`
``` js
module.exports = {
    inputDir: 'dist', // 已构建完成的代码包目录
    outputDir: '', // 离线包生成目录，不填默认为 [inputDir]-offline-app
    pathsFileName: 'paths.json', // 离线包资源声明文件
    bizid: '', // 离线包ID
    ver: '', // 离线包版本号
    pathname: '', // 离线包根目录名称
    exclude: '', // 离线包排除的目录， 必须为正则表达式
    compress: true, // 是否生成压缩包
    prefixPath: { // 需要处理成离线资源的文件格式，以及对应的远程路径前缀，默认只处理 html|js|css
        '.css': '',
        '.html': '',
        '.js': ''
    }
};
```

如果你是全局安装，在当前项目目录的命令行工具输入:
``` sh
offlineapp
```
将会开始构建离线包资源。

如果你是安装在项目中，可以在项目的`package.json`文件中新增以下代码：
``` json
{
    "scripts": {
        "offlineapp": "offlineapp"
    }
}
```
然后运行
``` sh
npm run offlineapp
```
即可开始构建离线包资源。
