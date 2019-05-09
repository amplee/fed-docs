---
# sidebar: auto
title: ESLint 使用
---

`ESLint` 是一个开源的 `JavaScript` 代码检查工具。

详细资料可前往官网了解：
> [ESLint](https://cn.eslint.org/)

## 在webpack中使用

[eslint-loader](https://www.npmjs.com/package/eslint-loader) 模块可方便快速的让我们在基于 `webpack`的项目中使用 `ESLint`；

__install__
``` bash
npm install -D eslint eslint-loader
```
__Usage__<br />
在你的`webpack`配置文件中：
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
                }
            }
        ]
    }
    // ...
}
```

## 在gulp中使用

在`gulp`中，使用 [gulp-eslint](https://www.npmjs.com/package/gulp-eslint)：

__install__
``` bash
npm i -D gulp-eslint
```
__Usage__<br />
`gulpfile.js`:
```js
var gulp = require('gulp');
var eslint = require('gulp-eslint');

gulp.task('eslint', function () {
    return gulp.src(['/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
```

## 格式化输出信息
> [eslint-friendly-formatter](https://www.npmjs.com/package/eslint-friendly-formatter)

`eslint-friendly-formatter` 是一个`eslint`检查格式化输出插件，将检查结果格式化输出到 终端以及浏览器的页面和控制台中，方便在开发阶段中即使查看到错误信息，并修复。
__install__
``` bash
npm install -D eslint-friendly-formatter
```
__Usage__

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
`Gulp`
``` js
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var friendlyFormatter = require("eslint-friendly-formatter");

gulp.task('eslint', function () {
    return gulp.src(['/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format(friendlyFormatter))
});

```

## 常规项目配置

`ESLint`提供了多重多样的配置文件的方式，可以使用`JavaScript`、`JSON`、`YAML` 等文件，为整个目录（处理整个主目录）和它的子目录指定配置文件。
可以配置一个独立的`.eslintrc.*`文件，或者直接在`package.json`文件中的`eslintConfig`字段指定配置，ESLint会查找并自动读取它们。
也可以在命令行运行时指定一个任意的配置文件。

基于代码规范的考量，每个项目的`ESLint Config` 文件应统一放在项目根目录下，创建`.eslintrc.js` 文件。

__install__

``` bash
npm install -D babel-eslint eslint-config-standard eslint-plugin-html eslint-plugin-standard
```

__.eslintrc.js__
``` js
// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    // 如果有使用 babel，需要安转 babel-eslint
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    plugins: [
        'html',
    ],
    // add your custom rules here
    rules: {
        'indent': ['error', 4],
        'space-before-function-paren': ["error", {
            "anonymous": "always",
            "named": "never",
            "asyncArrow": "ignore"
        }],
        'eqeqeq': ["error", "always", {"null": "ignore"}],
        'semi': ['error', 'always'],
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'padded-blocks': 0,
        'comma-dangle': ["error", "only-multiline"],
        'no-unused-vars': 0,
    }
}
```

## Vue项目配置

## 项目修复

* **eslint --fix**

  > [eslint --fix](https://cn.eslint.org/docs/user-guide/command-line-interface#--fix)

  该选项指示 ESLint 试图修复尽可能多的问题。修复只针对实际文件本身，而且剩下的未修复的问题才会输出。不是所有的问题都能使用这个选项进行修复，该选项在以下情形中不起作用：

  1. 当代码传递给 ESLint 时，这个选项抛出一个错误。
  2. 这个选项对使用处理器的代码不起作用。
  3. 该选项对使用处理器的代码没有影响，除非处理器选择允许自动修复。

  ``` bash
  # 针对单个文件修复
  eslint --fix file.js
  ```

* **eslint --fix-dry-run**

  > [eslint --fix-dry-run](https://cn.eslint.org/docs/user-guide/command-line-interface#--fix-dry-run)

  该选项与 `--fix` 有相同的效果，唯一一点不同是，修复不会保存到文件系统中。这也是从 `stdin`（当使用 `--stdin` 标记时）修复代码成为可能。

  因为默认的格式化器不会输出修复的代码，你必须使用另外一个（比如 json）进行修复。下面是这个模式的一个例子：
  ``` bash
  getSomeText | eslint --stdin --fix-dry-run --format=json
  ```
  该标记对集成（比如，编辑器插件）很有用，它需要从命令行进行自动修复，而不需要保存到文件系统。
