---
title: 指引
---

> 如果你是项目新成员，或者准备为你的项目引入 代码规范流程，请阅读本指引了解代码规范，并在项目中接入。

### Step 1. 为什么需要代码规范

  在前端项目中，建立代码规范和代码质量是十分重要的，尤其是在团队多人协作的项目中，遵循优秀的统一的代码规范，编写、把控高质量的代码，可以为项目带来多方面的好处。

  而如果缺少这些，试想一下，由于没有明确的代码规范，当项目有需求变更或者需要重构时，成员们写的代码质量参差不齐，代码难以阅读以及修改，在原对应的成员或许能够了解代码的用途以及影响范围，但对于新接手该代码的成员来说，会带来比重新开发更为麻烦的问题，未知的代码用途，未知的影响范围，未知的bug等等。

  在我们目前的项目中，几乎所有的项目都是多人协作开发，建立起统一的代码规范，监控代码质量，其作用和价值不言而喻。

### Step 2. 如何做代码规范

在为你的项目或团队应用代码规范前，需要先了解下我们的代码规范的具体细则是如何的。

我们提供了不同技术选型下的标准的 代码风格指南：

* **Javascript 代码风格指南**
  - [standard 风格指南](/style-guide/js-guide-standard.html)。 适用于常规技术选型的项目。
  - [Vue 项目风格指南](/style-guide/js-guide-vue.html)。  适用于技术选型为Vue的项目。
  - [React 项目风格指南](/style-guide/js-guide-react.html)。 适用于技术选型为React的项目。
  - [其他库/框架风格指南](/style-guide/js-guide-lib.html)。适用于其他框架作为技术选型的项目。

* **CSS代码风格指南**
  - [standard 风格指南](/style-guide/css-guide-standard.html)。 适用于 CSS/LESS 的样式风格检查。
  - [SASS 风格指南](/style-guide/css-guide-scss.html)。 适用于 SASS 的样式风格检查。


### Step 3. 开发环境支持

  如果仅仅依靠人力的方式，以及团队成员个人对规范的理解做代码规范，那么每个人所能遵循到的规范程度会有所不同，导致虽有规范但并没有彻底执行。
  所以我们需要引入相关的工具，自动化的监控，并给出提示以及警告，在开发过程当中，时刻提醒团队成员编写符合规范的代码。

  * **编辑器支持**

    工欲善其事，必先利其器。一个好的编辑器能够更好的帮助我们进行代码开发，在我们开发过程中，可以通过添加编辑器插件支持，从而帮助我们的开发时即时检查并修复不符合规范的代码内容。

    - [EditorConfig](/style-guide/editor-plugin-config.html) 编辑器通用配置插件
    - [Spell Checker](/style-guide/editor-plugin-spell-checker.html) 拼写检查插件
    - [Eslint](/style-guide/editor-plugin-eslint.html) eslint插件
    - [Stylelint](/style-guide/editor-plugin-stylelint.html) stylelint 插件

 * **预设配置插件**

    * **ESlint预设插件**
      - [@bestwehotel/eslint-config-standard](/style-guide/eslint-config-standard.html) javascript 标准风格 eslint预设插件
      - [@bestwehotel/eslint-config-vue](/style-guide/eslint-config-vue.html) Vue 风格 eslint预设插件
      - [@bestwehotel/eslint-config-react](/style-guide/eslint-config-standard.html) React 风格 eslint预设插件

    * **Stylelint预设插件**
      - [@bestwehotel/stylelint-config-standard](/style-guide/stylelint-config-standard.html) Less/CSS 标准样式风格stylelint预设插件
      - [@bestwehotel/stylelint-config-standard](/style-guide/stylelint-config-scss.html) SASS 标准样式风格stylelint预设插件


  * **项目工程化支持**

    - [webpack添加eslint](/style-guide/build-eslint-webpack.html)
    - [webpack添加stylelint](/style-guide/build-stylelint-webpack.html)

  * **已有项目、已有代码如何应用代码规范**

    `ESLint` 提供了相关的命令，可以帮助我们尽可能在修复代码文件不符合规范的内容，详细细节参考：[项目修复](/style-guide/build-code-fix.html)<br />
    但也因为工具的限制，没办法完全修复所有问题，所以剩余的不符合规范的内容，需要团队成员自行检查并修复。

  * **在代码提交前校验**

    在你的代码提交前，需要通过代码规范的检查才可以提交并推送到远程仓库，这个是每个项目必须做的工作，具体方式参考：[Git Hooks pre-commit](/style-guide/git-hooks-pre-commit.html)

  * **提交信息校验**

    为了规范化git提交信息， 需要在项目中补充 提交信息校验的 流程。具体接入方式参考：[Git Hooks commit-msg](/style-guide/git-hooks-verify-commit-msg.html)

### Step 4. 代码抽查

  __CodeReview__ 环节会校验代码更多深层面的细节，此环节将会由人工评估完成。从多个维度对项目已提交的代码进行审核、评估、并给出意见和建议，得出评估结果。
  请参考： [代码抽查](/style-guide/code-review-2.html)

### Step 5. 完成

  代码规范是随着团队的变化、项目的变化、技术选型的变化、在不断的实践中总结的最佳的代码编写风格规范，需要团队每个成员实践、总结、并提出更好的方案，逐步完善，以变得更加的适合团队，也更加有利于个人的技术发展。
