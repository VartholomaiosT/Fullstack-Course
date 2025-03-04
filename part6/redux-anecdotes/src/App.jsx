import React from "react";
import NewAnecdote from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notifications from "./components/Notification";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import anecedoteService from "./services/anecdotes";
import { setAnecdotes } from "./reducers/anecdoteReducer";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, []);
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notifications />
      <Filter />
      <AnecdoteList />
      <NewAnecdote />
    </div>
  );
};

export default App;
