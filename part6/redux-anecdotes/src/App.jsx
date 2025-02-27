import { createStore } from "redux";
import reducer from "./reducers/anecdoteReducer";
import NewAnecdote from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
const store = createStore(reducer);

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <NewAnecdote />
    </div>
  );
};

export default App;
