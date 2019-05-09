---
title: 抽查要点
---

## 可读性、可维护性

* **代码注释**

  好的代码注释可以帮助理解代码，如功能、需求、逻辑实现、描述、注意事项等。

  函数、方法等，应该以下面格式添加注释：
  ``` js
  /**
  * @todo 函数待完善，包括： xxx,xxx
  * @desc 两数求和方法
  * @param {number} a 数一
  * @param {number} b 数二
  * @return {number} 返回两数之和
  *
  */
  function add(a, b) {
      return a + b;
  }
  ```

  文件顶部文档注释：
  ``` js
  /**
   * @description: 模块说明
   * @author: name
   * @update name(xxx-xx-xx)
   *
   */
  ```
  对于复杂功能或复杂的需求，应该在对应的代码块中，详细阐述实现逻辑。

  对于 `hack` 方案等，应该阐述为什么要这么做，以及后续是否需要评估优化方案。

  对于待完善的函数或者方法或者代码块，应及时做好 `todo` 标记。
  ``` js
  // TODO: xxxx
  ```

* **过度组件化**

  避免不必要的过度的组件化。

  如 vue组件:
  ``` html
  ✗ avoid
  <!-- component: text -->
  <template>
        <span></span>
  </template>
  <>
  <!-- component: article -->
  <template>
      <p>
          <text></text>
          <text></text>
          <text></text>
      </p>
  </template>

  ✓ ok
  <!-- component: article -->
  <template>
      <p>
          <span></span>
          <span></span>
          <span></span>
      </p>
  </template>
  ```

* **方法过参化**

  避免函数/方法有过多的参数：
  ``` js
  // ✗ avoid
  function func(a, b, c, d, e, f, g){
      // ...
  }
  // ✓ ok
  function func(params) {
     let {a, b, c, d, e, f, g} = params;
     // ...
  }
  ```
  可以通过函数颗粒化，或者使用对象参数，减少参数数量。

* **过多的层级嵌套**

  应尽量避免过多的层级嵌套，层级嵌套过多时，应考虑逻辑拆分：
  ``` js
  // ✗ avoid
  function func(arr) {
      if (arr.length > 0) {
          for (let i = 0, l = arr.length; i < l; l++) {
              if (i == l) {
                  for (let j = 0, ll = arr[i].length; j < ll; j++) {
                      // ....
                  }
              } else {
                  // ...
              }
          }
          return arr;
      } else {
          return arr;
      }
  }

  // ✓ ok
  function func(arr) {
      if (arr.length === 0) {
          return arr;
      }
      for (let i = 0, l = arr.length; i < l; l++) {
          if (i == l) {
              funcL(arr[i]);
          } else {
              // ...
          }
      }
      return arr;
  }
  function funcL(arr) {
      for (let i = 0, l = arr.length; i < l; i++) {
          // ....
      }
      return arr;
  }
  ```
* **单一职责**

  有且仅有一个原因会引起类的变更。这条规则适用于 类、函数等。

* **逻辑解耦**


## 安全性

* **输入验证**

* **防XSS攻击**

## 性能效率

* **资源开销**

  基于`chrome Preformance` 监控、计算应用资源开销，包括 页面加载、首次渲染时间开销，内存占用等。

* **页面流畅度**

## 可靠性

* **容错处理**

  函数传参，或接口返回的数据，应做好类型校验以及值校验，避免应传参问题或接口返回的数据问题导致代码报错，阻塞执行。
  ``` js
  // ✗ avoid
  function add(a, b) {
      return a  + b;
  }
  add('1');

  // ✓ ok
  function add(a, b) {
      a = parseInt(a) || 0;
      b = parseInt(b) || 0;
      return a + b;
  }
  add('1');

  ```

* **超时处理**



* **逻辑边界管理**

  编写代码逻辑时，不仅要考虑到已知的逻辑处理，对未知的逻辑条件，也应提供兼容的方案，确保所有逻辑分支都是清晰可见的。

* **资源边界管理**

## 其他

包括但不限于以上列出的要点，任何在抽查过程中发现的问题，都可以是抽查的要点。
