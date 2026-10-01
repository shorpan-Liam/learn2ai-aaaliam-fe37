# 02 JSX 与组件

## 学习目标

- 能编写 JSX 表达式。
- 能创建、导入和组合函数组件。
- 能使用条件渲染与列表渲染。
- 理解 `key` 的作用。

## 1. JSX 是什么

JSX 是 JavaScript 的语法扩展，让界面结构可以写成类似 HTML 的形式。构建工具会把 JSX 转换为普通 JavaScript。

```jsx
const courseName = 'React 入门';
const heading = <h1>{courseName}</h1>;
```

花括号 `{}` 用于在 JSX 中嵌入 JavaScript 表达式。

## 2. JSX 基本规则

组件返回的多个元素需要共同的根节点。若不希望产生额外 DOM 节点，可以使用 Fragment：

```jsx
function Profile() {
  return (
    <>
      <h2>王小明</h2>
      <p>前端学习者</p>
    </>
  );
}
```

属性通常使用驼峰命名，标签必须正确闭合：

```jsx
<label htmlFor=name>姓名</label>
<input id=name className=text-input />
<button onClick={handleSave}>保存</button>
```

常见差异包括 `className`、`htmlFor`、`tabIndex`。

## 3. 创建函数组件

React 组件名必须以大写字母开头：

```jsx
function WelcomeMessage() {
  return <p>欢迎学习 React。</p>;
}

export default function App() {
  return (
    <main>
      <h1>课程中心</h1>
      <WelcomeMessage />
    </main>
  );
}
```

小写标签会被当作浏览器原生元素，大写标签会被当作自定义组件。

## 4. 条件渲染

可以使用普通 JavaScript 条件语句：

```jsx
function LoginStatus({ isLoggedIn }) {
  if (!isLoggedIn) {
    return <button>登录</button>;
  }

  return <p>欢迎回来</p>;
}
```

简单条件也可以使用三元表达式或逻辑与：

```jsx
<p>{score >= 60 ? '通过' : '继续努力'}</p>
{hasMessage && <span>你有新消息</span>}
```

数值 `0` 放在 `&&` 左侧时可能被渲染出来，应明确转换为布尔值。

## 5. 列表渲染

使用数组的 `map` 方法把数据转换为组件：

```jsx
const lessons = [
  { id: 'jsx', title: 'JSX 基础' },
  { id: 'state', title: '状态管理' },
];

function LessonList() {
  return (
    <ul>
      {lessons.map((lesson) => (
        <li key={lesson.id}>{lesson.title}</li>
      ))}
    </ul>
  );
}
```

`key` 帮助 React 识别列表项的身份。它应在当前列表中唯一、在多次渲染间稳定，并优先使用数据自身的 ID。列表可能插入、删除或排序时，不应使用数组下标作为 `key`。

## 6. 按职责拆分组件

```jsx
function LessonCard({ lesson }) {
  return (
    <article>
      <h2>{lesson.title}</h2>
      <p>{lesson.description}</p>
    </article>
  );
}

function LessonGrid({ lessons }) {
  return (
    <section>
      {lessons.map((lesson) => (
        <LessonCard key={lesson.id} lesson={lesson} />
      ))}
    </section>
  );
}
```

`LessonGrid` 负责列表结构，`LessonCard` 负责单项展示。职责边界比单纯按代码行数拆分更重要。

## 常见误区

- 在 JSX 中直接写 `if` 或 `for` 语句。它们不是表达式，应在 JSX 外处理。
- 调用组件函数 `LessonCard()`，而不是使用 `<LessonCard />`。
- 在渲染期间修改数组或对象。
- 使用随机数作为 `key`，导致组件身份持续变化。

## 课堂练习

创建一个课程列表组件：

1. 数据至少包含 `id`、`title`、`level` 和 `completed`。
2. 使用独立的 `CourseCard` 组件展示每门课程。
3. 已完成课程显示“已完成”，否则显示“学习中”。
4. 空数组时显示空状态。

