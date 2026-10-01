import { useDispatch, useSelector } from 'react-redux';
import Task from './Task';
import {
  FILTERS,
  selectCounts,
  selectFilter,
  selectVisibleTasks,
  setFilter,
} from '../redux/tasksSlice';

const FILTER_BUTTONS = [
  { value: FILTERS.ALL, label: 'All', countKey: 'all' },
  { value: FILTERS.DONE, label: 'Done', countKey: 'done' },
  { value: FILTERS.NOT_DONE, label: 'Not done', countKey: 'notDone' },
];

const EMPTY_MESSAGES = {
  [FILTERS.ALL]: 'No tasks yet. Add one above!',
  [FILTERS.DONE]: 'No finished tasks yet.',
  [FILTERS.NOT_DONE]: 'Nothing left to do. 🎉',
};

export default function ListTask() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectVisibleTasks);
  const filter = useSelector(selectFilter);
  const counts = useSelector(selectCounts);

  return (
    <section className="list-task">
      <div className="filters" role="group" aria-label="Filter tasks">
        {FILTER_BUTTONS.map(({ value, label, countKey }) => (
          <button
            key={value}
            type="button"
            className={filter === value ? 'filter-button active' : 'filter-button'}
            aria-pressed={filter === value}
            onClick={() => dispatch(setFilter(value))}
          >
            {label} ({counts[countKey]})
          </button>
        ))}
      </div>

      {tasks.length === 0 ? (
        <p className="empty-message">{EMPTY_MESSAGES[filter]}</p>
      ) : (
        <ul className="tasks">
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </ul>
      )}
    </section>
  );
}