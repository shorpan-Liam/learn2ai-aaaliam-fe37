const FILTERS = [
  { value: 'all', label: '全部' },
  { value: 'active', label: '未完成' },
  { value: 'completed', label: '已完成' },
];

export default function FilterTabs({ currentFilter, onFilterChange }) {
  return (
    <div className="filter-tabs" aria-label="筛选任务">
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          className={currentFilter === filter.value ? 'is-active' : ''}
          type="button"
          aria-pressed={currentFilter === filter.value}
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
