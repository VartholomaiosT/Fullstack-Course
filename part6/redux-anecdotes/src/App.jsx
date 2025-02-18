import { createStore } from "redux";
import reducer from "./reducers/anecdoteReducer";
import NewAnecdote from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";

const store = createStore(reducer);

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <NewAnecdote />
    </div>
  );
};

export default App;
