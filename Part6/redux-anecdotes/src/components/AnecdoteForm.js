import { useDispatch } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { message, errorMessage, clearMessage } from '../reducers/messageReducer'
import { createNew } from '../services/anecdotes'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const handleNewAnecdote = async (event) => {
        event.preventDefault()
    
        const content = event.target.anecdoteInput.value

        const newAnecdote = await createNew(content)

        console.log('newAnecdote', newAnecdote)
    
        dispatch(createAnecdote(newAnecdote))

        const messageDisplayed = `New anecdote added: ${content}`

        dispatch(message(messageDisplayed))
        setTimeout(() => dispatch(clearMessage()), 5000)

        event.target.anecdoteInput.value = ''
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