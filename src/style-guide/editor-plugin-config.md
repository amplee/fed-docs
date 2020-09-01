---
title: EditorConfig
---

在多人开发的项目中，存在不同的团队成员喜欢、或者习惯于某一个编辑器，比如`VS Code`，`Atom`，`WebStorm`，`SubLime Text`等，不同的编辑器的默认配置可能各不相同。由此带来的问题，不同的编辑器，默认下无法支持统一的基础代码规范。

`editorConfig` 可以帮助我们实现不同的编辑器定义相同的代码规范。

> 官网： [editorConfig](https://editorconfig.org)

### 创建 `.editorconfig`

  在你的项目根目录下创建`.editorconfig`。<br />
  _所有前端项目应统一使用本配置。（React项目除外）_
  ``` js
  root = true

  [*]
  charset = utf-8
  indent_style = space
  indent_size = 4
  end_of_line = lf
  insert_final_newline = true
  trim_trailing_whitespace = true
  ```

  _对于React项目，由于其本身的一些特性，建议使用以下配置_

  ``` js
  root = true

  [*]
  charset = utf-8
  indent_style = space
  indent_size = 2
  end_of_line = lf
  insert_final_newline = true
  trim_trailing_whitespace = true
  ```

### 编辑器支持

`WebStorm`: 默认支持。<br />
`VS Code`: [EditorConfig for VS Code](https://github.com/editorconfig/editorconfig-vscode) <br />
`Atom`: [editorconfig](https://atom.io/packages/editorconfig) <br />
其他编辑器根据编辑器支持情况使用。
