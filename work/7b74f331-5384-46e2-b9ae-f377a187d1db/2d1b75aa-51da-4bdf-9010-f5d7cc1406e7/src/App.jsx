import { CalendarDays } from 'lucide-react';
import { useEffect, useState } from 'react';
import FilterTabs from './components/FilterTabs.jsx';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';

const STORAGE_KEY = 'react-mini-todo.tasks.v1';

function loadTasks() {
  try {
    const storedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(storedTasks) ? storedTasks : [];
  } catch {
    return [];
  }
}

function createTask(title) {
  return {
    id: crypto.randomUUID(),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const completedCount = tasks.filter((task) => task.completed).length;
  const remainingCount = tasks.length - completedCount;
  const visibleTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  function addTask(title) {
    setTasks((currentTasks) => [createTask(title), ...currentTasks]);
  }

  function toggleTask(targetId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === targetId ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function deleteTask(targetId) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== targetId));
  }

  return (
    <main className="app-shell">
      <section className="planner" aria-labelledby="page-title">
        <header className="planner-header">
          <div className="date-mark" aria-hidden="true">
            <CalendarDays size={21} />
          </div>
          <div>
            <p className="eyebrow">MY DAILY LIST</p>
            <h1 id="page-title">今日清单</h1>
            <p className="subtitle">把重要的事，安静地一件件完成。</p>
          </div>
        </header>

        <TaskForm onAddTask={addTask} />

        <div className="list-toolbar">
          <FilterTabs currentFilter={filter} onFilterChange={setFilter} />
          <p className="task-count" aria-live="polite">
            <strong>{remainingCount}</strong> 件待完成
          </p>
        </div>

        <TaskList
          tasks={visibleTasks}
          filter={filter}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />

        <footer className="planner-footer">
          <span>共 {tasks.length} 项</span>
          <span className="footer-rule" aria-hidden="true" />
          <span>已完成 {completedCount} 项</span>
        </footer>
      </section>
    </main>
  );
}
