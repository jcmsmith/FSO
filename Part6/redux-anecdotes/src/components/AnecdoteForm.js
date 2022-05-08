// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/messageReducer'

const AnecdoteForm = (props) => {
    // const dispatch = useDispatch()

    const handleNewAnecdote = (event) => {
        event.preventDefault()
    
        const content = event.target.anecdoteInput.value
    
        props.createAnecdote(content)

        const messageDisplayed = `New anecdote added: ${content}`

        props.setNotification(messageDisplayed, 5)

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

const mapDispatchToProps = { createAnecdote, setNotification }

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm