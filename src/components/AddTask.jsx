import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/tasksSlice';

export default function AddTask() {
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = description.trim();

    if (trimmed === '') {
      setError('Please type a task first.');
      return;
    }

    dispatch(addTask(trimmed));
    setDescription('');
    setError('');
  };

  return (
    <form className="add-task" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What do you need to do?"
        aria-label="New task"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button type="submit">Add</button>
      {error && <p className="form-error" role="alert">{error}</p>}
    </form>
  );
}