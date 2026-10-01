# 01 React 概览

## 学习目标

- 知道 React 解决什么问题。
- 理解声明式 UI、组件化和单向数据流。
- 能说明 React 与浏览器 DOM 的关系。
- 能判断一个页面适合拆分成哪些组件。

## 1. React 是什么

React 是用于构建用户界面的 JavaScript 库。开发者把界面描述为组件，并让界面随数据变化自动更新。

React 主要关注“视图层”：

- 页面应该显示什么。
- 数据变化后界面如何更新。
- 界面如何拆分和复用。

路由、服务端通信、状态管理、构建工具等能力通常由 React 生态中的其他工具补充。

## 2. 为什么使用 React

传统 DOM 编程经常需要开发者手动查找元素、修改文本、添加节点和同步多个界面状态。当页面交互增多时，代码容易出现“数据已经变化，但某处界面忘记更新”的问题。

命令式写法关注操作步骤：

```js
const button = document.querySelector('#like-button');
const countText = document.querySelector('#like-count');
let count = 0;

button.addEventListener('click', () => {
  count += 1;
  countText.textContent = count;
});
```

React 的声明式写法关注当前状态对应的界面：

```jsx
function LikeButton() {
  const [count, setCount] = React.useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      点赞 {count}
    </button>
  );
}
```

开发者维护状态和界面规则，React 负责把变化反映到页面上。

## 3. 三个核心思想

### 声明式 UI

界面可以看作数据的映射：

```text
UI = f(state)
```

同一份状态应得到可预测的界面。开发者不必逐条描述 DOM 更新过程。

### 组件化

组件是可组合、可复用的界面单元。一个商品页可以拆分为：

```text
ProductPage
├── Header
├── ProductGallery
├── ProductInfo
│   ├── Price
│   └── BuyButton
└── ReviewList
    └── ReviewItem
```

组件边界通常来自以下线索：

- 一块界面会重复出现。
- 一块界面有独立职责。
- 一块界面拥有自己的交互状态。
- 文件过长，阅读和测试变得困难。

### 单向数据流

父组件通过 Props 把数据传给子组件。子组件不能直接修改父组件的数据，而是通过回调通知父组件发生了什么。

这种流向让数据来源更容易追踪：

```text
父组件状态 -> 子组件显示 -> 用户操作 -> 回调 -> 父组件更新状态
```

## 4. React 如何更新页面

组件首次显示时会执行渲染。State 或 Props 改变后，组件会再次渲染。React 比较前后两次界面描述，并把必要变化提交到真实 DOM。

“重新渲染”不等于整个网页被完整重载，也不意味着所有 DOM 节点都会被重新创建。

## 5. React 适合哪些场景

适合：

- 交互状态较多的 Web 应用。
- 需要复用大量界面组件的项目。
- 数据频繁变化的管理后台、社区、编辑器或电商页面。
- 需要多人协作和长期维护的前端项目。

不一定需要：

- 内容固定、交互极少的单页介绍。
- 只需几行原生 JavaScript 即可完成的简单效果。

技术选择应服从问题规模，而不是为了使用框架而使用框架。

## 常见误区

- React 不是完整的浏览器，也不是后端框架。
- React 组件不是 HTML 模板文件，而是能够接收数据并返回界面描述的 JavaScript 函数。
- 使用 React 不能替代 HTML、CSS 和 JavaScript 基础。
- 组件并非越小越好，应围绕职责和复用价值拆分。

## 课堂练习

选择一个常见页面，例如视频网站首页或购物车页面：

1. 画出页面的组件树。
2. 标出哪些数据由父组件传入。
3. 标出哪些交互需要 State。
4. 讨论哪些组件值得复用，哪些只在当前页面使用。

