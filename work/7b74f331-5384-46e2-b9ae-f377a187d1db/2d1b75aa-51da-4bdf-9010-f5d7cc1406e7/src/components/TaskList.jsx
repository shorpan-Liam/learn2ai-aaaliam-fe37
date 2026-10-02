import { CircleCheckBig, ListTodo } from 'lucide-react';
import TaskItem from './TaskItem.jsx';

const EMPTY_COPY = {
  all: ['清单还是空的', '从一件五分钟能完成的小事开始。'],
  active: ['没有待处理任务', '今天的清单已经全部划掉了。'],
  completed: ['还没有完成记录', '完成一项任务后，它会出现在这里。'],
};

export default function TaskList({ tasks, filter, onToggle, onDelete }) {
  if (tasks.length === 0) {
    const [title, description] = EMPTY_COPY[filter];
    const EmptyIcon = filter === 'active' ? CircleCheckBig : ListTodo;

    return (
      <div className="empty-state" role="status">
        <EmptyIcon size={34} strokeWidth={1.6} aria-hidden="true" />
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
