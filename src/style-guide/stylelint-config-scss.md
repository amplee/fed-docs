---
title: Sass代码风格配置
---

### 适用范围

本 CSS 标准风格配置 适用于 SCSS 编写的前端样式内容。

包括：

- SCSS -> postcss -> CSS 的项目
- SCSS -> CSS 的项目

### stylelint 预设插件

为了便于在项目中更方便的添加标准风格指南， 开发集成了`@bestwehotel/stylelint-config-scss` 的eslint插件。

该插件发布在 [私有npm仓库](/docs/npm/index.html) 中，可从私有npm仓库直接安装到项目中。

在项目根目录中新建`.stylelintrc.js`：
``` js
module.exports = {
    extends: '@bestwehotel/stylelint-config-scss'
};
```

并安装以下依赖：
- stylelint-config-standard
- stylelint-config-recommended-scss
- stylelint-scss

``` sh
npm - D stylelint-config-standard stylelint-config-recommended-scss stylelint-scss
```

### 完整配置参考

``` js
module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-recommended-scss'
    ],
    plugins: [
        'stylelint-scss'
    ],
    rules: {
        indentation: [4, { baseIndentLevel: 0 }],
        'at-rule-empty-line-before': ['always', {
            ignore: ['inside-block', 'blockless-after-same-name-blockless']
        }],
        'comment-whitespace-inside': 'always',
        'scss/double-slash-comment-whitespace-inside': 'always',
        'no-descending-specificity': null,
        'color-hex-case': null,
        'font-family-no-missing-generic-family-keyword': null
    }
};

```
