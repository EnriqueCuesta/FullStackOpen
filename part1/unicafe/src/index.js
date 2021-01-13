import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodHandler = () => setGood(good + 1)
  const neutralHandler = () => setNeutral(neutral + 1)
  const badHandler = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={goodHandler} text='good' />
      <Button handleClick={neutralHandler} text='neutral' />
      <Button handleClick={badHandler} text='bad' />
      <Stats good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Stats = ({ good, neutral, bad }) => {
  if (good === 0 & neutral === 0 & bad === 0) {
    return (
      <>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </>
    )
  } else
  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={good+neutral+bad} />
          <Statistic text="average" value={(good-bad)/(good+neutral+bad)} />
          <Statistic text="positive" value={(good/(good+neutral+bad))*100+" %"} />
        </tbody>
      </table>
    </>
  )
}

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td><td>{value}</td>
  </tr>
)

ReactDOM.render(<App />, 
  document.getElementById('root')
)