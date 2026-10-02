import { Plus } from 'lucide-react';
import { useState } from 'react';

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      setError('请先写下一件要做的事。');
      return;
    }

    onAddTask(normalizedTitle);
    setTitle('');
    setError('');
  }

  function handleChange(event) {
    setTitle(event.target.value);
    if (error) setError('');
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <div className="input-row">
        <label className="sr-only" htmlFor="new-task">新任务</label>
        <input
          id="new-task"
          value={title}
          onChange={handleChange}
          placeholder="写下下一件小事..."
          aria-describedby={error ? 'task-error' : undefined}
          aria-invalid={Boolean(error)}
          autoComplete="off"
        />
        <button className="add-button" type="submit">
          <Plus aria-hidden="true" size={20} strokeWidth={2.4} />
          <span>添加</span>
        </button>
      </div>
      <p className="form-message" id="task-error" role="alert">
        {error || ' '}
      </p>
    </form>
  );
}
