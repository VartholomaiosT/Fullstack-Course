import { useState } from "react";

const Text = (props) => <h1>{props.text}</h1>;
const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad;
  const average = (props.good - props.bad) / total;
  const positive = (props.good / total) * 100;

  if (total === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    );
  }
  return (
    <>
      <StatisticLine text="Good" value={props.good} />
      <StatisticLine text="Neutral" value={props.neutral} />
      <StatisticLine text="Bad" value={props.bad} />
      <StatisticLine text="All" value={total} />
      <StatisticLine text="Average" value={average} />
      <StatisticLine text="Positive" value={`${positive}%`} />
    </>
  );
};

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}: </td> <td>{props.value}</td>
  </tr>
);
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Text text="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Text text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
