---
title: Git Hook
---

在基于项目中添加`ESLint`，帮助我们在开发阶段进行代码风格校验后，我们还需要在代码提交到仓库时，也进行提交前校验，以保证在远程仓库的代码是符合代码规范的。

目前前端的项目都是基于`Git`仓库做的管理，所以可以借助`Git Hook`在代码提交前做代码风格检查。


> __GIT__ <br/>
> [Git hook](https://www.git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90)<br />
> Git 钩子： Git可以在特定的重要动作发生时触发自定义脚本。

## pre-commit
`pre-commit` 钩子在键入提交信息前运行。它用于检查即将提交的快照。如果该钩子以 __非零值__ 退出，Git 将放弃此次提交。

## 使用

钩子都被存储在 Git 目录下的 `hooks` 子目录中。即在项目目录的 `.git/hooks` 中。当你用 `git init` 初始化一个新版本库时，Git 默认会在这个目录中防止一些示例脚本。

如果在你的项目中找不到 这个目录，你可以手动创建它。

由于创建编写 `pre-commit` 对开发团队来说有一定的学习成本和试错成本，所以采用 `husky` + `lint-staged` 的方案来使用 `pre-commit`。

> [husky](https://www.npmjs.com/package/husky): Git hooks made easy
>
> [lint-staged](https://www.npmjs.com/package/lint-staged): Run linters against staged git files

__1. install__

``` bash
npm i -D husky lint-staged
```
__2. 在你的`package.json`中：__
``` json
{
    "husky": {
        "hooks": {
            "pre-commit": "lint-staged"
        }
    }
}
```
__3.在项目根目录下创建`.lintstagedrc`__

文件匹配规则模式与 `glob pattern` 是一致的。

常规项目
``` json
{
    "src/**/*.js": "eslint --ext .js"
}
```
Vue项目
``` json
{
    "src/**/*.{js,vue}": "eslint --ext .js .vue"
}
```
React项目
``` json
{
    "src/**/*.{js,jsx}": "eslint --ext .js .jsx"
}
```

__或者在你的`package.json`__
``` json
{
    "lint-staged": {
        "src/**/*.js": "eslint --ext .js"
    }
}
```
__4. 打印错误信息__

当你提交代码时，会运行 `git hooks`，发现有报错时，会有如下格式的输出，输出到控制台：
```
> git add -A -- .
> git commit --quiet --allow-empty-message --file - --all
husky > pre-commit (node v10.15.1)
Stashing changes... [started]
Stashing changes... [skipped]
→ No partially staged files found...
Running linters... [started]
Running tasks for src/**/*.{js,vue} [started]
eslint --ext .js .vue [started]
eslint --ext .js .vue [failed]
→
Running tasks for src/**/*.{js,vue} [failed]
→
Running linters... [failed]



✖ eslint --ext .js .vue found some errors. Please fix them and try committing again.

/Users/zhanpeng.lian/Desktop/GIT/wehotel-app/src/common/appHack.js
155:18  error  Missing semicolon       semi
156:18  error  Missing semicolon       semi
157:13  error  'a' is already defined  no-redeclare
157:18  error  Missing semicolon       semi
158:18  error  Missing semicolon       semi

✖ 5 problems (5 errors, 0 warnings)
```
你需要根据错误信息，修复完所有检查错误，才能成功提交代码。
