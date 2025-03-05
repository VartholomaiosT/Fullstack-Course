import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdotes } from "../request";
import { useNotificationDispatch } from "../contexts/NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdotes,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]) || [];
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
      dispatch({
        type: "SET",
        payload: `Added anecdote '${newAnecdote.content}'`,
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR" });
      }, 5000);
    },
    onError: (error) => {
      // Handle the error from the server
      const errorMessage =
        error.response?.data?.error || "Error creating anecdote";
      dispatch({
        type: "SET",
        payload: errorMessage,
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR" });
      }, 5000);
    },
  });

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    newAnecdoteMutation.mutate({ content });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name="note" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
