import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    if (state.filter === "ALL") {
      return state.anecdotes;
    }
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    );
  });

  const vote = (id) => {
    console.log("vote", id);
  };
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={(e) =>
                dispatch({ type: "VOTE", data: { id: anecdote.id } })
              }
            >
              vote
            </button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
    </div>
  );
};

export default AnecdoteList;
