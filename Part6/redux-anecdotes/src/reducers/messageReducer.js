import { createSlice } from '@reduxjs/toolkit'

const initialState = [{ message: '', isError: false}]

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        message(state, action) {
            clearMessage()
            const message = action.payload

            return [{
                message,
                isError: false
            }]
        },
        errorMessage(state, action) {
            clearMessage()
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
export default messageSlice.reducer