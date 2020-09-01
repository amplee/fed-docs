---
title: 提交信息校验
---

### 说明

在项目中添加 提交信息校验， 有助于帮助项目规范化 git commit 信息的提交内容规范。建议每个项目都应该添加此功能

提交信息校验同样也是依赖于`husky` 库实现， 如果你的项目已经完成了 [提交前校验](/docs/style-guide/git-hooks-pre-commit.html) ，那么无需重新安装此库。

在你执行 `git commit -m [msg]` 命令时， 会对 `msg` 进行格式校验。

### 安装
```
npm i -D chalk husky
```

### 使用

* **在你的项目根目录下，创建 `/scripts/verifyCommitMsg.js`, 内容如下：**
    ``` js
    const chalk = require('chalk');
    const msgPath = process.env.GIT_PARAMS || process.env.HUSKY_GIT_PARAMS;
    const msg = require('fs').readFileSync(msgPath, 'utf-8').trim();

    const commitRE = /^(merge|Merge)|(v?\d+\.\d+\.\d+(-(alpha|beta|rc.\d+))?)|((revert: )?(feat|fix|docs|style|refactor|perf|test|workflow|ci|chore|types|update)(\(.+\))?!?: .{1,50})/;

    if (!commitRE.test(msg)) {
        console.log();
        console.error(
            `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red('commit 格式校验不通过 。')}\n\n` +
            chalk.red('  Proper commit message format is required for automated changelog generation. Examples:\n\n') +
            `    ${chalk.green('feat(compiler): add \'comments\' option')}\n` +
            `    ${chalk.green('fix(v-model): handle events on blur (close #28)')}\n\n` +
            // chalk.red('  See .github/COMMIT_CONVENTION.md for more details.\n') +
            chalk.red(`  You can also use ${chalk.cyan('npm run commit')} to interactively generate a commit message.\n`)
        );
        process.exit(1);
    }

    ```
* **修改package.json**
``` json
{
    "husky": {
        "hooks": {
            "commit-msg": "node scripts/verifyCommitMsg.js"
        }
    }
}
```

* **关键词说明**

  |关键词|描述|
  |--|--|
  |feat|新功能（feature）|
  |fix|修补bug|
  |docs|文档（documentation）|
  |style|格式（不影响代码运行的变动）|
  |refactor|重构（即不是新增功能，也不是修改bug的代码变动）|
  |test|增加测试|
  |chore|构建过程或辅助工具的变动|
