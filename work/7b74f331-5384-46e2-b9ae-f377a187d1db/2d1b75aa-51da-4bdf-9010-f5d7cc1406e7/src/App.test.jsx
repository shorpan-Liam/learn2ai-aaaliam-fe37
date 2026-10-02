import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import App from './App.jsx';

describe('待办清单', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('拒绝空白任务，并支持新增、完成、筛选和删除', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: '添加' }));
    expect(screen.getByRole('alert')).toHaveTextContent('请先写下一件要做的事。');

    await user.type(screen.getByLabelText('新任务'), '阅读 React 讲义');
    await user.click(screen.getByRole('button', { name: '添加' }));
    expect(screen.getByText('阅读 React 讲义')).toBeInTheDocument();
    expect(screen.getByText('1', { selector: '.task-count strong' })).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('react-mini-todo.tasks.v1'))).toEqual([
      expect.objectContaining({ title: '阅读 React 讲义', completed: false }),
    ]);

    await user.click(screen.getByRole('button', { name: '完成“阅读 React 讲义”' }));
    expect(screen.getByText('0', { selector: '.task-count strong' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '未完成' }));
    expect(screen.getByText('没有待处理任务')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '已完成' }));
    expect(screen.getByText('阅读 React 讲义')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '删除“阅读 React 讲义”' }));
    expect(screen.getByText('还没有完成记录')).toBeInTheDocument();
  });

  it('从 localStorage 恢复已有任务', () => {
    localStorage.setItem(
      'react-mini-todo.tasks.v1',
      JSON.stringify([{ id: 'saved', title: '持久保存的任务', completed: false }]),
    );

    render(<App />);
    expect(screen.getByText('持久保存的任务')).toBeInTheDocument();
  });
});
