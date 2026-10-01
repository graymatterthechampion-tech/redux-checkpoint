import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, editTask, toggleTask } from '../redux/tasksSlice';

export default function Task({ task }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.description);
  const [error, setError] = useState('');

  const startEditing = () => {
    setDraft(task.description);
    setError('');
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setError('');
  };

  const saveEdit = () => {
    const description = draft.trim();
    if (description === '') {
      setError('The task cannot be empty.');
      return;
    }
    dispatch(editTask({ id: task.id, description }));
    setIsEditing(false);
    setError('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      saveEdit();
    } else if (event.key === 'Escape') {
      cancelEditing();
    }
  };

  return (
    <li className={task.isDone ? 'task task-done' : 'task'}>
      <input
        type="checkbox"
        checked={task.isDone}
        onChange={() => dispatch(toggleTask(task.id))}
        aria-label={`Done: ${task.description}`}
      />

      {isEditing ? (
        <div className="task-edit">
          <input
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Edit task"
            autoFocus
          />
          <button type="button" onClick={saveEdit}>Save</button>
          <button type="button" className="secondary" onClick={cancelEditing}>Cancel</button>
          {error && <p className="form-error" role="alert">{error}</p>}
        </div>
      ) : (
        <>
          <span className="task-description">{task.description}</span>
          <button
            type="button"
            className="secondary"
            onClick={startEditing}
            aria-label={`Edit: ${task.description}`}
          >
            Edit
          </button>
          <button
            type="button"
            className="danger"
            onClick={() => dispatch(deleteTask(task.id))}
            aria-label={`Delete: ${task.description}`}
          >
            Delete
          </button>
        </>
      )}
    </li>
  );
}