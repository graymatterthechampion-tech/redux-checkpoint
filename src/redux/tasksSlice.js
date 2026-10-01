import { createSelector, createSlice, nanoid } from '@reduxjs/toolkit';

export const FILTERS = {
  ALL: 'all',
  DONE: 'done',
  NOT_DONE: 'notDone',
};

const initialState = {
  items: [
    { id: '1', description: 'Set up the project', isDone: true },
    { id: '2', description: 'Learn Redux Toolkit', isDone: false },
    { id: '3', description: 'Build the ToDo app', isDone: false },
  ],
  filter: FILTERS.ALL,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare(description) {
        return {
          payload: { id: nanoid(), description: description.trim(), isDone: false },
        };
      },
    },

    toggleTask(state, action) {
      const task = state.items.find((item) => item.id === action.payload);
      if (task) {
        task.isDone = !task.isDone;
      }
    },

    editTask(state, action) {
      const { id, description } = action.payload;
      const newDescription = description.trim();
      const task = state.items.find((item) => item.id === id);
      if (task && newDescription !== '') {
        task.description = newDescription;
      }
    },

    deleteTask(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    setFilter(state, action) {
      if (Object.values(FILTERS).includes(action.payload)) {
        state.filter = action.payload;
      }
    },
  },
});

export const { addTask, toggleTask, editTask, deleteTask, setFilter } = tasksSlice.actions;
export default tasksSlice.reducer;

/* ---- Selectors: functions that read data out of the store ---- */
export const selectTasks = (state) => state.tasks.items;
export const selectFilter = (state) => state.tasks.filter;

export const selectVisibleTasks = createSelector(
  [selectTasks, selectFilter],
  (tasks, filter) => {
    if (filter === FILTERS.DONE) {
      return tasks.filter((task) => task.isDone);
    }
    if (filter === FILTERS.NOT_DONE) {
      return tasks.filter((task) => !task.isDone);
    }
    return tasks;
  },
);

export const selectCounts = createSelector([selectTasks], (tasks) => {
  const done = tasks.filter((task) => task.isDone).length;
  return { all: tasks.length, done, notDone: tasks.length - done };
});