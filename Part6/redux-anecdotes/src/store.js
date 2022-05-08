import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer from './reducers/anecdoteReducer'
import messageReducer from './reducers/messageReducer'
import filterReducer from './reducers/filterReducer'
import timerReducer from './reducers/timerReducer'

const store = configureStore({
    reducer: {
      anecdotes: anecdoteReducer,
      message: messageReducer,
      filter: filterReducer,
      timer: timerReducer
    }
})

store.subscribe(() => {
    console.log('state', store.getState())
})

export default store