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

* **openWorkDialog({msgId, componentName,type, title})** <Badge text="alpha" type="warning" />

  打开工作区模态框

  msgId 当前消息的消息Id

  type 当前消息的消息类型，助手根据类型查询相应消息队列。
  临时消息type为'MSG_TEMP',因为临时消息数据并不存入助手本地数据库，需传递msgData给助手

  ``` js
  import { openWorkDialog } from 'widget-util';
  openWorkDialog({
      msgId: '111',
      componentName: 'detail',
      type: 'MSG_TASK'，
      title: '工作区标题'
      data: MsgData(Object)
  });
  ```
* **openWorkWindow({ msgId, componentName, url, type })** <Badge text="alpha" type="warning" />

  打开工作区独立窗口。

  componentName 和 url 两个参数只能传其中一个， 优先使用 componentName。

  传入componentName时， 加载 widget内置组件。 传入 url 时， 打开第三方网页。

  type 当前消息的消息类型，助手根据类型查询相应消息队列

  ``` js
  import { openWorkWindow } from 'widget-util';
  openWorkWindow({
      msgId: '111',
      componentName: 'detail',
      type: 'MSG_TASK'
  });
  openWorkWindow({
      msgId: '111',
      url: 'https://hyt.bestwehotel.com',
      type: 'MSG_TASK'
  });
  ```

* **getUser()** <Badge text="alpha" type="warning" />

  获取用户信息

  返回数据同统一平台登录返回字段

  ``` js
  import { getUser } from 'widget-util';
  const user = getUser();
  ```

* **getCurrentInn()** <Badge text="alpha" type="warning" />

  返回用户当前关联酒店

  返回数据同统一平台登录返回的酒店列表酒店字段

  ``` js
  import { getCurrentInn } from 'widget-util';
  const inn = getCurrentInn();
  ```

* **closeWorkDialog()** <Badge text="alpha" type="warning" />

  关闭工作区

  工作区业务完成后关闭工作区

  ``` js
  import { closeWorkDialog } from 'widget-util';
  closeWorkDialog();
  ```

* **setMsgToHistory({ msgId, type })** <Badge text="alpha" type="warning" />

  历史消息

  业务完成或忽略消息

  type 当前消息的消息类型，助手根据类型查询相应消息队列

  ``` js
  import { setMsgToHistory } from 'widget-util';
  setMsgToHistory({ msgId, type });
  ```

* **closeBubble({msgId})** <Badge text="alpha" type="warning" />

    关闭气泡

    气泡任务忽略或处理，关闭气泡。接受一个对象。因为bubble现在是队列，关闭时需传入msgId，表明关闭的气泡

    ``` js
    import { closeBubble } from 'widget-util';
    closeBubble({msgId});
    ```

* **closeSearchPage()** <Badge text="alpha" type="warning" />

    关闭搜索页

    业务完成后关闭搜索页

    ``` js
    import { closeSearchPage } from 'widget-util';
    closeSearchPage();
    ```

* **writeClipboardText(text)** <Badge text="alpha" type="warning" />

    写入文本至系统剪贴板,该方法仅接受字符串，最大长度同系统剪贴板最大长度限制

    适用于一些文本拷贝场景

    ``` js
    import { writeClipboardText } from 'widget-util';
    writeClipboardText(text);
    ```

* **jumpTo({ type })** <Badge text="Alpha" type="warning" />

    跳转去任务列表/通知列表

    场景示例： 气泡消息点击查看详情，跳转去对应列表

    type tasks/notice

    ``` js
    import { closeBubble } from 'widget-util';
    jumpTo({ type: 'tasks' });
    ```

* **version** <Badge text="Beta" />

  `type: Object`

  获取智慧门店助手版本信息，并提供相对应的方法检测版本。

  - **`version.get()`: currentVersion** 获取当前智慧门店助手版本。
  - **`version.gt(version)`: currentVersion > version** 判断当前智慧门店助手版本是否大于传入的版本号。
  - **`version.lt(version)`: currentVersion < version** 判断当前智慧门店助手版本是否小于传入的版本号。
  - **`version.eq(version)`: currentVersion == version** 判断当前智慧门店助手版本是否等于传入的版本号。
  - **`version.gte(version)`: currentVersion >= version** 判断当前智慧门店助手版本是否大于等于传入的版本号。
  - **`version.lte(version)`: currentVersion <= version** 判断当前智慧门店助手版本是否小于等于传入的版本号。
  - **`version.neq(version)`: currentVersion != version** 判断当前智慧门段助手版本号不等于传入的版本号。

  示例：
  ``` js
  import { version } from 'widget-util'

  // 获取当前智慧门店助手版本
  const currentVersion = version.get() // 1.0.0

  console.log(version.gt('1.2.0')) // false
  console.log(version.lt('1.2.0')) // true
  console.log(version.eq('1.0.0')) // true
  console.log(version.gte('0.9.9')) // true
  console.log(version.lte('1.2.0')) // true
  console.log(version.neq('1.0.0')) // false
  ```
* **$toast(text)** <Badge text="alpha" type="warning" />

    页面toast提示,duration单位为ms

    全局vue插件，提供统一的toast方法

    ``` js
    this.$toast(text,duration);
    ```

* **全局指令 v-high-light** <Badge text="alpha" type="warning" />

    全局vue指令，提供统一的高亮方法。

    高亮元素中与关键词相同的内容

    ``` js
    <div v-high-light>text</div>
    ```

* **全局loading $whhLoading(option)** <Badge text="alpha" type="warning" />

    全局loading方法

    option object {duration}

    ``` js
        // 不传递关闭时间，将返回loading实例，适用于异步请求的场景
        const loading = this.$whhLoading()
        await ajax
        loading.close()

        // 传递option,目前option仅有duration，单位为ms
        this.$whhLoading({duration:3000})
    ```

* **其他**

  暂无其他方法，持续补充中。
