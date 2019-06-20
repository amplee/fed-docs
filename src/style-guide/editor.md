---
# sidebar: auto
title: 编辑器支持
---


## editorConfig

在多人开发的项目中，存在不同的团队成员喜欢、或者习惯于某一个编辑器，比如`VS Code`，`Atom`，`WebStorm`，`SubLime Text`等，不同的编辑器的默认配置可能各不相同。由此带来的问题，不同的编辑器，默认下无法支持统一的基础代码规范。

`editorConfig` 可以帮助我们实现不同的编辑器定义相同的代码规范。

> 官网： [editorConfig](https://editorconfig.org)

__1. 创建 `.editorconfig`__

  在你的项目根目录下创建`.editorconfig`。<br />
  _所有前端项目应统一使用本配置。_
  ``` bash
  root = true

  [*]
  charset = utf-8
  indent_style = space
  indent_size = 4
  end_of_line = lf
  insert_final_newline = true
  trim_trailing_whitespace = true
  ```

__2. 编辑器支持__

`WebStorm`: 默认支持。<br />
`VS Code`: [EditorConfig for VS Code](https://github.com/editorconfig/editorconfig-vscode) <br />
`Atom`: [editorconfig](https://atom.io/packages/editorconfig) <br />
其他编辑器根据编辑器支持情况使用。


## Spell Checker

`Spell Checker` 拼写检查插件，帮助规避开发过程中，单词拼写导致的低级错误问题。

`VS Code`: [Code Spell Checker](https://github.com/Jason-Rev/vscode-spell-checker) <br />
`Atom`: [Spell Checker](https://atom.io/packages/spell-check) <br />
其他编辑器根据编辑器支持情况使用。

## ESLint

不同的编辑器会提供对应的 `ESLint` 插件。 在你的工作区中，即在你的项目中，如果有`ESLint`配置文件，插件会读取相关配置`ESLint`，如果你的工作区没有相关插件，则使用全局安装的默认配置。实时监控项目代码是否符合代码规范。

__编辑器支持__

`VS Code`: [vscode-eslint](https://github.com/Microsoft/vscode-eslint)<br />
`Atom`: [linter-eslint](https://atom.io/packages/linter-eslint)

__配置__

统一的标准配置查看 [ESLint](/style-guide/ESLint#eslintrc)

