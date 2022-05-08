import { createSlice } from '@reduxjs/toolkit'

const createId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: createId(),
    votes: 0
  }
}

const sortByVotes = (anecdotes) => {
  const sorted = anecdotes.sort((previous, current) => {
    if (previous.votes === current.votes) { return 0 }
    return (previous.votes > current.votes) ? -1 : 1
  })

  return sorted
}

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      state.push(content)
      sortByVotes(state)
    },
    vote(state, action) {
      const id = action.payload
      const vote = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...vote,
        votes: vote.votes + 1
      }

      const newAnecdotes = state.map(anecdote => 
        anecdote.id !== id ? anecdote : changedAnecdote
      )

      return sortByVotes(newAnecdotes)
    },
    setAllAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, vote, setAllAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer