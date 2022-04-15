import React, { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const chooseRandom = () => {
    let num = Math.floor(Math.random() * 10)

    num = (num > anecdotes.length - 1) ? anecdotes.length - 1 : num

    setSelected(num)
  }

  const vote = () => {
    const copy = [...votes]

    copy[selected] += 1
    setVotes(copy)
  }

  const mostVotes = () => {
    let most = 0
    let i = 0

    votes.forEach((element, index) => {
      if (element > most)
      {
        most = element
        i = index
      }
    })

    return {most, i}
  }

  console.log("selected: ", selected)
  console.log("Votes[selected]: ", votes[selected])
  console.log("Votes: ", votes)
  console.log("Most votes: ")

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={vote} text = "vote" />
      <Button handleClick={chooseRandom} text='next anecdote' />
      <br></br><br></br>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[mostVotes().i]}</p>
      <p>has {mostVotes().most} votes</p>
    </div>
  )
}

export default App;
