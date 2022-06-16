import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        clearFilter (state, action) {
            return initialState
        },
        setFilter (state, action) {
            return action.payload
        }
    }
})

export const { clearFilter, setFilter } = filterSlice.actions
export default filterSlice.reducer