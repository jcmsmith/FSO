import { useDispatch, useSelector } from 'react-redux'

import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/messageReducer'

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
    const filter = useSelector(state => state.filter)

    const voteHandler = (anecdote) => {
        const messageDisplayed = `Voted for anecdote: ${anecdote.content}`

        dispatch(voteForAnecdote(anecdote))
        dispatch(setNotification(messageDisplayed, 5))
    }

    return (
        <ul>
            {anecdotes.map(anecdote => {
                if (filter && !anecdote.content.toLowerCase().includes(filter.toLowerCase())) { return }

                return (                
                    <Anecdote
                        key={anecdote.id}
                        anecdote={anecdote}
                        handleClick={() => voteHandler(anecdote)}
                    />
                )
            })}
        </ul>
    )
}

export default AnecdoteList