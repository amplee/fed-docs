---
title: Vue代码风格配置
---

### 适用范围

Vue代码风格配置，适用于以下方式创建的Vue项目：
- 通过webpack、babel自建的Vue项目
- 通过 vue-cli 搭建的Vue项目

### eslint预设插件

结合 `@bestwehotel/eslint-config-standard` 以及 `eslint-plugin-vue`， 定制化了一套适用于在Vue项目中的相对友好的风格配置。

为了便于在vue项目中使用， 开发了 `@bestwehotel/eslint-config-vue` 的eslint插件。

该插件发布在 [私有npm仓库](/docs/npm/index.html) 中，可从私有npm仓库直接安装到项目中。

在项目根目录中新建`.eslintrc.js`：
``` js
module.exports = {
    extends: '@bestwehotel/eslint-config-vue'
};
```

并安装以下依赖：
- babel-eslint
- eslint-config-standard
- eslint-plugin-import
- eslint-plugin-node
- eslint-plugin-promise
- eslint-plugin-standard
- @bestwehotel/eslint-config-standard
- @vue/eslint-config-standard
- eslint-plugin-vue

``` sh
npm i -D eslint babel-eslint eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard @bestwehotel/eslint-config-standard @vue/eslint-config-standard eslint-plugin-vue
```

### 完整配置参考
``` js
module.exports = {
    extends: [
        'plugin:vue/essential',
        '@vue/standard',
        '@bestwehotel/eslint-config-standard'
    ],
    rules: {
        'vue/script-indent': ['error', 4],
        'vue/html-indent': ['error', 4],
        'vue/no-v-html': 0,
        'vue/name-property-casing': ['error', 'PascalCase'], // 默认 PascalCase
        'vue/html-self-closing': ['error', {
            'html': {
                'void': 'never',
                'normal': 'any',
                'component': 'always'
            }
        }]
    }
};
```
