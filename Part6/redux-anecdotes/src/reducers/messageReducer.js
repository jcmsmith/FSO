import { createSlice } from '@reduxjs/toolkit'

import { createTimer } from './timerReducer'

const initialState = [{ message: '', isError: false}]

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        message(state, action) {
            const newMessage = action.payload

            return [{
                message: newMessage,
                isError: false
            }]
        },
        errorMessage(state, action) {
            const message = action.payload

            return [{
                message,
                isError: true
            }]
        },
        clearMessage(state, action) {
            return initialState
        },
    }
})

export const { message, errorMessage, clearMessage } = messageSlice.actions

export const setNotification = (text, time) => {
    return dispatch => {
        dispatch(createTimer(time))
        dispatch(message(text))
    }
}

export default messageSlice.reducer