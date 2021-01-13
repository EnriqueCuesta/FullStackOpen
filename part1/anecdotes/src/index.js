import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf,0))


  const randomSelect = () => setSelected(Math.trunc(Math.random()*props.anecdotes.length))
  const voteThis = () => {
    const copy = { ...votes }
    copy[selected] += 1
    setVotes(copy)
  }
  const mostVotes = () => {
    var max = 0
    for (var i = 1; i < props.anecdotes.length; i++) {
      if(votes[i] > votes[max])
        max = i
    }
    return max
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]} <br/>
      has {votes[selected]} votes <br/>
      <Button handler={voteThis} text='vote' />
      <Button handler={randomSelect} text='next anecdote' />
      <h2>Anecdote with most votes</h2>
      {props.anecdotes[mostVotes()]}
    </div>
  )
}

const Button = ({handler, text}) => (<button onClick={handler}>{text}</button>)

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
