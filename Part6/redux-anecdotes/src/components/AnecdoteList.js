import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

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

    return (
        <ul>
            {anecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => 
                        dispatch(vote(anecdote.id))
                    }
                />
            )}
        </ul>
    )
}

export default AnecdoteList