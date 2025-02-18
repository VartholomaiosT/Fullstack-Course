import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    [...state].sort((a, b) => b.votes - a.votes)
  );
  const dispatch = useDispatch();

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
