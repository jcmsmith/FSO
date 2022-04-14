import React, { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick = {handleClick}>
      {text}
    </button>
  )
}

const Header = ({ text }) => <h1>{text}</h1>

const DisplayStatistic = ({ text, stat }) => {
  return <p>{text} {stat}</p>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodRating = () => setGood(good + 1)
  const neutralRating = () => setNeutral(neutral + 1)
  const badRating = () => setBad(bad + 1)
  let totalRatings = good + bad + neutral

  const averageRating = () => {
    const score = (good + bad * -1) / totalRatings

    if (!isFinite(score))
    {
      return 0
    }
    
    return score
  }

  const positivePercentage = () => {
    if (bad === 0 && neutral === 0)
    {
      return '100%'
    }

    const avg = good / totalRatings

    return avg + ' %'
  }
  


  return (
    <div>
      <Header text = 'give feedback' />
      <Button handleClick={goodRating} text = 'good' />
      <Button handleClick={neutralRating} text = 'neutral' />
      <Button handleClick={badRating} text = 'bad' />

      <Header text = 'statistics' />
      <DisplayStatistic text = 'good' stat = {good} />
      <DisplayStatistic text = 'neutral' stat = {neutral} />
      <DisplayStatistic text = 'bad' stat = {bad} />
      <DisplayStatistic text = 'all' stat = {good + neutral + bad} />
      <DisplayStatistic text = 'average' stat = {averageRating()} />
      <DisplayStatistic text = 'positive' stat = {positivePercentage()} />
    </div>
  )
}

export default App;
