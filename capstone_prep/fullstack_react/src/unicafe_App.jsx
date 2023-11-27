import { useState } from 'react'

let Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

let Counter = ({ name, count, suffix }) => {
  return <tr><td> {name} </td><td> {count} {suffix || ''} </td></tr>
}

let Statistics = ({ good, neutral, bad }) => {
  if (good || neutral || bad) {
    return (
      <>
        <Counter name="good" count={good} />
        <Counter name="neutral" count={neutral} />
        <Counter name="bad" count={bad} />
        <Counter name="all" count={good + neutral + bad} />
        <Counter name="average" count={100 * (good - bad) / (good + neutral + bad)} suffix="%" />
        <Counter name="positive" count={100 * (good / (good + neutral + bad))} suffix="%" />
      </>
    )
  } else {
    return <tr><td>No feedback given</td></tr>
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <div>
        <h1>give feedback</h1>
        <Button text="good" handleClick={() => setGood(good + 1)} />
        <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
        <Button text="bad" handleClick={() => setBad(bad + 1)} />
      </div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistics good={good} neutral={neutral} bad={bad}/>
        </tbody>
      </table>
    </>
  );
};

export default App;