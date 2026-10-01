# 04 Hooks 与副作用

## 学习目标

- 理解 Hooks 的用途和调用规则。
- 能使用 `useEffect` 同步外部系统。
- 能为 Effect 编写依赖项和清理函数。
- 能处理基础的数据请求状态。

## 1. 什么是 Hook

Hook 是以 `use` 开头的函数，让函数组件能够使用状态、上下文、引用和副作用等 React 能力。

常用 Hook：

- `useState`：保存组件状态。
- `useEffect`：与 React 外部系统同步。
- `useRef`：保存不触发渲染的值，或引用 DOM 元素。
- `useContext`：读取跨层级共享的数据。
- `useReducer`：组织较复杂的状态更新逻辑。

## 2. Hooks 调用规则

- 只在 React 函数组件或自定义 Hook 顶层调用。
- 不要放入条件、循环、嵌套函数或事件处理函数。
- 自定义 Hook 名称以 `use` 开头。

React 依赖稳定的调用顺序，把每次渲染中的 Hook 与对应状态关联起来。

## 3. 什么是副作用

渲染的职责是根据输入计算 JSX。与组件外部环境同步的操作属于副作用，例如：

- 建立或断开网络连接。
- 订阅或取消订阅浏览器事件。
- 控制非 React 编写的组件。
- 根据状态同步文档标题。

普通的派生数据计算通常不是副作用，不需要 `useEffect`。

## 4. useEffect 基础

```jsx
import { useEffect, useState } from 'react';

function DocumentTitleCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `点击 ${count} 次`;
  }, [count]);

  return (
    <button onClick={() => setCount((value) => value + 1)}>
      {count}
    </button>
  );
}
```

依赖数组表达 Effect 使用的响应式值。当 `count` 变化时，Effect 再次运行。

## 5. 清理副作用

订阅、定时器或连接应在不再需要时清理：

```jsx
useEffect(() => {
  function handleResize() {
    console.log(window.innerWidth);
  }

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

清理函数会在组件移除前执行，也会在依赖变化、下一次 Effect 执行前清理上一次同步。

## 6. 数据请求示例

```jsx
import { useEffect, useState } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadUser() {
      setStatus('loading');
      setError(null);

      try {
        const response = await fetch(`/api/users/${userId}`, {
          signal: controller.signal,
        });

        if (!response.ok) throw new Error('用户信息加载失败');

        setUser(await response.json());
        setStatus('success');
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError);
          setStatus('error');
        }
      }
    }

    loadUser();
    return () => controller.abort();
  }, [userId]);

  if (status === 'loading') return <p>加载中...</p>;
  if (status === 'error') return <p>{error.message}</p>;
  return <h2>{user.name}</h2>;
}
```

真实项目还要考虑缓存、重试、竞态、服务端渲染和错误边界。复杂请求通常适合交给框架的数据层或专门的请求库处理。

## 7. useRef 简介

```jsx
import { useRef } from 'react';

function SearchForm() {
  const inputRef = useRef(null);

  return (
    <>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current?.focus()}>
        聚焦输入框
      </button>
    </>
  );
}
```

修改 `ref.current` 不会触发重新渲染，需要显示在界面上的数据通常应该放在 State 中。

## 8. 自定义 Hook

自定义 Hook 用于复用状态逻辑，而不是直接复用界面：

```jsx
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  return isOnline;
}
```

## 常见误区

- 使用 Effect 计算本可在渲染时直接得到的数据。
- 为控制执行次数而故意漏写依赖项。
- 订阅事件或创建定时器后没有清理。
- 把用户点击触发的业务操作放进 Effect。
- 用 `useRef` 保存需要驱动界面的数据。

## 课堂练习

实现一个在线状态提示组件：

1. 在线时显示“网络已连接”，离线时显示“网络已断开”。
2. 使用自定义 Hook 封装浏览器事件订阅。
3. 正确移除事件监听器。
4. 解释为什么这个场景需要 Effect。

