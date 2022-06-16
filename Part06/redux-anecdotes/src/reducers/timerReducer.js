import { createSlice } from '@reduxjs/toolkit'

import store from '../store'
import { clearMessage } from './messageReducer'

const initialState = { id: null}

const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        setTimer(state, action) {
            return { id: action.payload }
        },
        clearTimer(state, action) {
            return initialState
        }
    }
})

export const { setTimer, clearTimer } = timerSlice.actions

export const createTimer = (time) => {
    return async dispatch => {
        const currentTimer = store.getState().timer.id
        if (currentTimer) {
            clearTimeout(currentTimer)
            dispatch(clearTimer())
        }

        const newTimer = setTimeout(() => {
            dispatch(clearTimer())
            dispatch(clearMessage())
        }, time *= 1000)


        dispatch(setTimer(newTimer))
    }
}

export default timerSlice.reducer