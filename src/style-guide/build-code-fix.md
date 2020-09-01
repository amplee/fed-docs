---
title: 项目fix
---

在旧项目中应用 代码规范检查后，可能带来的问题是 项目中的大部分代码文件大面积不符合规范，需要花费长时间进行修复。

针对此类情况，eslint 有提供 工具类，以帮助修复项目中的不符合规范的问题。然而工具只能尽可能的修复常规的能够修复的问题，对于相对复杂的情况无能为力，需要进一步的人工修改。

如果需要修复的工作量比较大，不建议直接在某个迭代需求里面一刀切式的接入规范， 应该新建一条 类似名为`/feature/guide-fix` 的分支，在上面进行修复，待完成，自测没问题后，应找产品与测试协商，安排一次回归测试以确保生产安全。

### eslint

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

### stylelint

stylelint 暂时为提供 cli 工具以帮助项目修复不符合规范的代码，需要手动进行修复。
