const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

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

export const vote = (id) => {
  console.log('vote action', id)
  return {
    type: 'VOTE',
    data: id
  }
}

export const createAnecdote = (anecdote) => {
  console.log('new anecdote', anecdote)

  return {
    type: 'NEW',
    data: asObject(anecdote)
  }
}

export const replaceAll = (anecdotes) => {
  console.log('new anecdotes', anecdotes)
  const replacement = anecdotes.map(asObject)

  return {
    type: 'REPLACEALL',
    data: replacement
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const id = action.data
      const vote = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...vote,
        votes: vote.votes + 1
      }

      const newAnecdotes = state.map(anecdote => 
        anecdote.id !== id ? anecdote : changedAnecdote
      )

      return sortByVotes(newAnecdotes)


    case 'NEW':
      return state.concat(action.data)

    case 'REPLACEALL':
      return action.data

    default: return state
  }
}

export default reducer