import React, { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick = {handleClick}>
      {text}
    </button>
  )
}

const Header = ({ text }) => <h1>{text}</h1>

const DisplayRating = ({ text, count }) => {
  return <p>{text} {count}</p>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodRating = () => setGood(good + 1)
  const neutralRating = () => setNeutral(neutral + 1)
  const badRating = () => setBad(bad + 1)

  return (
    <div>
      <Header text = 'give feedback' />
      <Button handleClick={goodRating} text = 'good' />
      <Button handleClick={neutralRating} text = 'neutral' />
      <Button handleClick={badRating} text = 'bad' />

      <Header text = 'statistics' />
      <DisplayRating text = 'good' count = {good} />
      <DisplayRating text = 'neutral' count = {neutral} />
      <DisplayRating text = 'bad' count = {bad} />
    </div>
  )
}

export default App;
