---
title: API支持
---

## 组件内置 props

组件内置的 props，在widget的，配置在 `widget.config.js` 的 widgetComponent 组件，均可使用。


* **Props: message**

  `message` props属性提供了 当前消息内容数据的基础数据部分, 提供的数据如下：

  | 属性       | 类型      | 描述                               |
  | ---------- | --------- | ---------------------------------- |
  | id         | string    | 消息ID                             |
  | title      | string    | 消息标题                           |
  | createTime | timestamp | 消息创建时间                       |
  | startTime  | timestamp | 消息开始生效时间                   |
  | endTime    | timestamp | 消息失效时间（表示消息为限时消息） |
  | cancelable | boolean   | 消息是否可忽略                     |
  | type       | string    | 消息类型（任务\[MSG_TASK\]、建议、通知\[MSG_NOTIFY\]等）     |
  | temporary  | number    | 是否是临时消息。0：否，1：是           |
  | status     | string    | 消息状态                           |
  | userId     | string    | 消息目标用户                       |
  | innId      | string    | 消息目标门店                       |
  | templateId | string    | 消息模板编号                       |
  | tenantId   | string    | 租户编号                           |

* **Props: widget**

  `widget`props 属性提供了当前widget的相关信息

  | 属性          | 类型           | 描述                  |
  | ------------- | -------------- | --------------------- |
  | id            | string         | widget Id             |
  | version       | string         | widget version        |
  | componentList | array\<string> | Widget 提供的组件列表 |

* **Props: data**

  `data`props 属性提供了消息内容的自定义数据，提供的数据结构由`data.model.json` 提供，业务推送消息的数据接口需要符合`data.model.json`声明的数据模型。

* **Props: isHistory**

  `isHistory` props 属性，标记该条消息被推入到 历史消息列表中。

示例：

```html
<template>
    <div class="widget-wrapper">
        <h3>{{ message.title }}</h3>
        <p>{{ data.customData }}</p>
    </div>
</template>
<script>
    export default {
        mounted() {
            const { id, version, componentList } = this.widget;
            console.log(id, version, componentList);
        }
    }
</script>
```

## widget-util <Badge text="alpha" type="warning" />

widget 内置了一系列 可用方法，以适配不同的widget开发。

`widget-util` 已内置在工具中，无需 npm 安装，直接使用。

__目前工具 版本不稳定，API随时发生重大变更，请谨慎使用__

* **isElectron()** <Badge text="Beta" />

  判断当前环境是否是 electron 应用
  ``` js
  import { isElectron } from 'widget-util';
  console.log(isElectron());
  ```

* **axios**

  工具内置 axios库，可直接使用
  ``` js
  import { axios } from 'widget-util';

  axios.post('xxx/xx');
  ```
* **ElementUI**

  内置 `element-ui` 库。可直接使用。 同时 组件已全局注册。
  ``` js
  import { ElementUI } from 'widget-util';
  ```

* **openWorkDialog(messageId, componentName)** <Badge text="alpha" type="warning" />

  打开工作区模态框
  ``` js
  import { openWorkDialog } from 'widget-util';
  openWorkDialog('0001', 'detail');
  ```
* **openWorkWindow({ messageId, componentName, url })** <Badge text="alpha" type="warning" />

  打开工作区独立窗口。

  componentName 和 url 两个参数只能传其中一个， 优先使用 componentName。

  传入componentName时， 加载 widget内置组件。 传入 url 时， 打开第三方网页。

  ``` js
  import { openWorkWindow } from 'widget-util';
  openWorkWindow({
      messageId: '111',
      componentName: 'detail'
  });
  openWorkWindow({
      messageId: '111',
      url: 'https://hyt.bestwehotel.com'
  });
  ```

* **其他**

  暂无其他方法，持续补充中。
