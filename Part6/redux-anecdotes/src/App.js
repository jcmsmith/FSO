import { useSelector, useDispatch } from 'react-redux'
import { vote, createNew } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const handleVote = (id) => {
    dispatch(vote(id))
  }

  const handleNewAnecdote = (event) => {
    event.preventDefault()

    console.log('event', event.target.anecdoteInput)
    const anecdote = event.target.anecdoteInput.value
    event.target.anecdoteInput.value = ''

    dispatch(createNew(anecdote))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={handleNewAnecdote}>
        <div><input name='anecdoteInput'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App