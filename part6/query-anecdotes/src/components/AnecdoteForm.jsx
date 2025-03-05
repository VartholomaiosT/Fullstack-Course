import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdotes } from "../request";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdotes,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]) || [];
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
    },
  });

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    if (content.length < 5) {
      return;
    }
    newAnecdoteMutation.mutate({ content });
  };

  return (
    <form onSubmit={addAnecdote}>
      <div>
        <input name="note" />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default AnecdoteForm;
