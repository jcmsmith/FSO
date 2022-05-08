import { useDispatch } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/messageReducer'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const handleNewAnecdote = (event) => {
        event.preventDefault()
    
        const content = event.target.anecdoteInput.value
    
        dispatch(createAnecdote(content))

        const messageDisplayed = `New anecdote added: ${content}`

        dispatch(setNotification(messageDisplayed, 5))

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