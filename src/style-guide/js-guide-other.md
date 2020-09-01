---
title: 其他说明
---

### 关于分号

* 执行语句结尾都需要使用分号。

  eslint: [`semi`](http://eslint.org/docs/rules/semi)

  ```js
  window.alert('hi')   // ✗ avoid
  window.alert('hi');  // ✓ ok
  ```

* 不要使用 `(`, `[`, or `` ` `` 等作为一行的开始。在没有分号的情况下代码压缩后会导致报错，而坚持这一规范则可避免出错。

  eslint: [`no-unexpected-multiline`](http://eslint.org/docs/rules/no-unexpected-multiline)

  ```js
  // ✓ ok
  ;(function () {
      window.alert('ok');
  }());

  // ✗ avoid
  (function () {
      window.alert('ok');
  }());
  ```

  ```js
  // ✓ ok
  ;[1, 2, 3].forEach(bar);

  // ✗ avoid
  [1, 2, 3].forEach(bar);
  ```

  ```js
  // ✓ ok
  ;`hello`.indexOf('o');

  // ✗ avoid
  `hello`.indexOf('o');
  ```

  备注：上面的写法只能说聪明过头了。

  相比更加可读易懂的代码，那些看似投巧的写法是不可取的。

  譬如：

  ```js
  ;[1, 2, 3].forEach(bar);
  ```

  建议的写法是：

  ```js
  var nums = [1, 2, 3];
  nums.forEach(bar);
  ```
