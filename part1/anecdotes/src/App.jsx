import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [allVotes, setAllVotes] = useState(Array(8).fill(0));

  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const handleVote = () => {
    const newAllVotes = [...allVotes];
    newAllVotes[selected] += 1;
    setAllVotes(newAllVotes);
    console.log(allVotes);
  };

  const Header = ({ text }) => <h1>{text}</h1>;

  const Button = ({ onClick, text }) => (
    <button onClick={onClick}>{text}</button>
  );

  const Anecdotes = () => {
    return (
      <>
        <p>{anecdotes[selected]}</p>
        <p>has {allVotes[selected]} votes</p>
      </>
    );
  };

  const Winner = () => {
    const maxVotes = Math.max(...allVotes);
    const mostVotedIndex = allVotes.indexOf(maxVotes); 

    if (maxVotes === 0) {
      return <p>No winner yet</p>;
    }
    return (
      <>
        <p>{anecdotes[mostVotedIndex]}</p>
        <p>has {maxVotes} votes</p>
      </>
    );
  };
  return (
    <div>
      <Header text="Anecdote of the Day" />
      <Anecdotes />
      <Button onClick={handleVote} text="vote" />
      <Button onClick={handleClick} text="Next anecdote" />
      <Header text="Anecdote with most votes" />
      <Winner />
    </div>
  );
};

export default App;
