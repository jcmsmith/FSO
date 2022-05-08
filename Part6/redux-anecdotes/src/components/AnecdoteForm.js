import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { message, errorMessage, clearMessage } from '../reducers/messageReducer'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const handleNewAnecdote = (event) => {
        event.preventDefault()
    
        console.log('event', event.target.anecdoteInput)
        const anecdote = event.target.anecdoteInput.value
        event.target.anecdoteInput.value = ''
    
        dispatch(createAnecdote(anecdote))

        const messageDisplayed = `New anecdote added: ${anecdote}`

        dispatch(message(messageDisplayed))
        setTimeout(() => dispatch(clearMessage()), 5000)
      }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleNewAnecdote}>
                <div><input name='anecdoteInput'/></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm