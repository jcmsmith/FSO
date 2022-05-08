import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer from './reducers/anecdoteReducer'
import messageReducer from './reducers/messageReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
    reducer: {
      anecdotes: anecdoteReducer,
      message: messageReducer,
      filter: filterReducer
    }
})

store.subscribe(() => {
    console.log('state', store.getState())
})

export default store