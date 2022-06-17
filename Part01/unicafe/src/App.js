import React, { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick = {handleClick}>
      {text}
    </button>
  )
}

const StatisticsDisplay = ({ stats }) => {
  if (stats.total === 0) {return "No feedback given"}

  const averageRating = () => {
    const score = (stats.good + stats.bad * -1) / stats.total

    if (!isFinite(score))
    {
      return 0
    }
    
    return score
  }

  const positivePercentage = () => {
    if (stats.bad === 0 && stats.neutral === 0)
    {
      return '100%'
    }

    const avg = stats.good / stats.total

    return avg + ' %'
  }

  return (
    <table>
      <tbody>
        <StatisticLine text = 'good' stat = {stats.good} />
        <StatisticLine text = 'neutral' stat = {stats.neutral} />
        <StatisticLine text = 'bad' stat = {stats.bad} />
        <StatisticLine text = 'all' stat = {stats.total} />
        <StatisticLine text = 'average' stat = {averageRating()} />
        <StatisticLine text = 'positive' stat = {positivePercentage()} />
      </tbody>
    </table>
  )
}

const Header = ({ text }) => <h1>{text}</h1>

const StatisticLine = ({ text, stat }) => {
  return <tr><td>{text} {stat}</td></tr>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const rateGood = () => setGood(good + 1)
  const rateNeutral = () => setNeutral(neutral + 1)
  const rateBad = () => setBad(bad + 1)


  const stats = {
    good: good,
    neutral: neutral,
    bad: bad,
    total: good + bad + neutral
  }


  return (
    <>
      <Header text = 'give feedback' />
      <Button handleClick={rateGood} text = 'good' />
      <Button handleClick={rateNeutral} text = 'neutral' />
      <Button handleClick={rateBad} text = 'bad' />

      <Header text = 'statistics' />
      <StatisticsDisplay stats = {stats} />
    </>
  )
}

export default App;
