import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { message, errorMessage, clearMessage } from '../reducers/messageReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return(
        <li>
            {anecdote.content}
            <div>
                votes: {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </li>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)

    const voteHandler = (anecdote) => {
        const messageDisplayed = `Voted for anecdote: ${anecdote.content}`

        dispatch(vote(anecdote.id))
        dispatch(message(messageDisplayed))
        setTimeout(() => dispatch(clearMessage()), 5000)
    }

    return (
        <ul>
            {anecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => voteHandler(anecdote)}
                />
            )}
        </ul>
    )
}

export default AnecdoteList