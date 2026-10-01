# 03 Props、State 与事件

## 学习目标

- 区分 Props 与 State。
- 能使用 `useState` 保存组件状态。
- 能正确更新数组和对象状态。
- 能通过事件和回调完成父子组件协作。

## 1. Props：组件的输入

Props 由父组件传入，子组件只读取、不修改。

```jsx
function UserCard({ name, role = '学员' }) {
  return (
    <article>
      <h2>{name}</h2>
      <p>{role}</p>
    </article>
  );
}

function App() {
  return <UserCard name=林晓 role=助教 />;
}
```

Props 可以是字符串、数字、布尔值、数组、对象、函数或 JSX。

## 2. State：组件的记忆

State 用于保存会随交互变化、并影响界面显示的数据。

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      点击次数：{count}
    </button>
  );
}
```

调用更新函数会请求一次新的渲染。当前事件处理函数中的 `count` 仍是本次渲染的状态快照。依赖上一次状态更新时，使用函数式写法：

```jsx
setCount((currentCount) => currentCount + 1);
```

## 3. 哪些数据应该是 State

适合作为 State：输入框内容、选中的标签页、请求状态、折叠面板是否展开。

可以由现有 Props 或 State 直接计算出的值通常不需要再次存储：

```jsx
const completedCount = tasks.filter((task) => task.completed).length;
```

如果同时保存 `tasks` 和 `completedCount`，两份数据可能失去同步。

## 4. 不要直接修改状态

错误示例：

```jsx
task.completed = true;
setTasks(tasks);
```

正确示例：

```jsx
setTasks((currentTasks) =>
  currentTasks.map((task) =>
    task.id === targetId
      ? { ...task, completed: true }
      : task
  )
);
```

更新数组时常用 `map`、`filter` 和展开语法创建新值。

## 5. 事件处理

应传入函数，而不是执行函数：

```jsx
function SaveButton() {
  function handleSave() {
    console.log('已保存');
  }

  return <button onClick={handleSave}>保存</button>;
}
```

需要参数时可以使用箭头函数：

```jsx
<button onClick={() => removeTask(task.id)}>删除</button>
```

## 6. 状态提升

多个组件需要共享同一份状态时，把状态放到它们最近的共同父组件中。

```jsx
function SearchBox({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder=搜索课程
    />
  );
}

function App() {
  const [keyword, setKeyword] = useState('');

  return (
    <>
      <SearchBox value={keyword} onChange={setKeyword} />
      <p>当前关键词：{keyword}</p>
    </>
  );
}
```

`SearchBox` 是受控组件：显示值由父组件控制，变化通过回调通知父组件。

## 7. 综合示例

```jsx
import { useState } from 'react';

export default function TaskList() {
  const [tasks, setTasks] = useState([
    { id: 1, title: '阅读 JSX 讲义', completed: false },
    { id: 2, title: '完成组件练习', completed: true },
  ]);

  function toggleTask(targetId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === targetId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <label>
            <input
              type=checkbox
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            {task.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
```

## 常见误区

- 直接修改 Props 或 State。
- 把所有变量都放进 State。
- 写成 `onClick={handleSave()}`，导致渲染时立即执行。
- 在多个子组件中分别保存同一份业务数据。
- 使用旧状态计算新状态时忽略函数式更新。

## 课堂练习

扩展任务列表示例：

1. 增加文本输入框和“添加”按钮。
2. 禁止添加空白任务。
3. 支持删除任务。
4. 显示“已完成数量 / 总数量”。
5. 说明哪些值需要 State，哪些可以计算得到。

