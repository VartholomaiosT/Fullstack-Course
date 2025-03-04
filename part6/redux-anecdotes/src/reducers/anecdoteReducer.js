import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => ({
  content: anecdote,
  id: getId(),
  votes: 0,
});

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload;
      const anecdoteToChange = state.find((n) => n.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    },
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(_state, action) {
      return action.payload;
    },
  },
});

export const { voteAnecdote, createAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

// Async thunk for voting – uses backend update
export const voteAnecdoteAsync = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.vote(anecdote);
    dispatch(voteAnecdote(updatedAnecdote.id));
  };
};

// Async thunk for creating a new anecdote – uses the returned object from the backend
export const createAnecdoteAsync = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export default anecdoteSlice.reducer;
