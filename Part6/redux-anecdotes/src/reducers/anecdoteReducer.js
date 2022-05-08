import { createSlice } from '@reduxjs/toolkit'

import { getAll, createNew, update } from '../services/anecdotes'

const createId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: createId(),
    votes: 0
  }
}

const sortByVotes = (anecdotes) => {
  const map = anecdotes.map(anecdote => anecdote)
  const sorted = map.sort((previous, current) => {
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
    appendAnecdote(state, action) {
      const content = action.payload
      state.push(content)
    },
    vote(state, action) {
      const changedAnecdote = action.payload
      const id = action.payload.id
      console.log('changed', changedAnecdote)

      const anecdoteInState = state.find(anecdote => anecdote.id === id)
      console.log('find', anecdoteInState)
      if (!anecdoteInState) {
        console.log('error: anecdote to be voted on not found in state')
        return state
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

export const { appendAnecdote, vote, setAllAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await getAll()
    dispatch(setAllAnecdotes(sortByVotes(anecdotes)))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteForAnecdote = anecdote => {
  return async dispatch => {
    const addedVote = { ...anecdote, votes: anecdote.votes+1 }
    const updated = await update(anecdote.id, addedVote)
    console.log('updated', updated)
    dispatch(vote(updated))
  }
}

export default anecdoteSlice.reducer