import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const createAnecdotes = (newAnecdote) => {
  const anecdoteToCreate = {
    ...newAnecdote,
    votes: 0,
  };
  return axios.post(baseUrl, anecdoteToCreate).then((res) => res.data);
};

export const updateVote = (updatedVote) =>
  axios
    .put(`${baseUrl}/${updatedVote.id}`, updatedVote)
    .then((res) => res.data);
