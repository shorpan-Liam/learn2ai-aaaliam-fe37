import { Check, Trash2 } from 'lucide-react';

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item${task.completed ? ' is-completed' : ''}`}>
      <button
        className="check-button"
        type="button"
        aria-label={task.completed ? `标记“${task.title}”为未完成` : `完成“${task.title}”`}
        aria-pressed={task.completed}
        onClick={() => onToggle(task.id)}
      >
        {task.completed ? <Check size={18} strokeWidth={3} aria-hidden="true" /> : null}
      </button>
      <span className="task-title">{task.title}</span>
      <button
        className="delete-button"
        type="button"
        aria-label={`删除“${task.title}”`}
        title="删除任务"
        onClick={() => onDelete(task.id)}
      >
        <Trash2 size={18} aria-hidden="true" />
      </button>
    </li>
  );
}
