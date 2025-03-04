import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const createNew = (content) => {
  return axios
    .post(baseUrl, { content, votes: 0 })
    .then((response) => response.data);
};

const vote = (anecdote) => {
  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
  return axios
    .put(`${baseUrl}/${anecdote.id}`, updatedAnecdote)
    .then((response) => response.data);
};

export default { getAll, createNew, vote };
